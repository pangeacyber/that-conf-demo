/* eslint-disable no-console */

import { PangeaConfig, AuditService, PangeaErrors} from 'pangea-node-sdk';
import { ZonedDateTime } from "@internationalized/date";
import { UserLocationType } from './utils';
import crypto from 'crypto';

const checkIfEmail = (email: string) => {
  // Source - OWASP https://owasp.org/www-community/OWASP_Validation_Regex_Repository
  const emailRegex=/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim());
}


export default async function auditSearch({
  startTime}: any) {

 let start = new ZonedDateTime(
  startTime.year, 
  startTime.month, 
  startTime.day,
  startTime.timeZone,
  startTime.offset,
  startTime.hour,
  startTime.minute,
  startTime.second);

  console.log("start time: " + (start).toAbsoluteString())

  if(process.env.PANGEA_TOKEN) {
    const token = process.env.PANGEA_TOKEN as string;
    const config_id = process.env.PANGEA_AUDIT_CONFIG as string;

    const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN, configID: config_id });
    const audit = new AuditService(token, config);

    const usersWithLocation: UserLocationType = {};

    try {
      // search query to fetch all users who logged in and signedup
      const logResponse = await audit.search('', {start: (start).toAbsoluteString(), order: "asc", search_restriction: { action: ["login", "user self signup"] }, limit: 10000, max_results: 10000}, {});

      if(logResponse.success) {
        logResponse.result.events.forEach(element => {
          let time = element.envelope.event.timestamp.toString()
          let context = JSON.parse(element.envelope.event.external_context.toString())

          let username = context.actor.username
        
          // Get lat and long. Will return undefined for each variable if geolocation data is not attached
          let lat = context.request?.intelligence?.ip_intel?.geolocation?.latitude;
          let long = context.request?.intelligence?.ip_intel?.geolocation?.longitude;
          let is_vpn = context.request?.intelligence?.ip_intel?.is_vpn;
          let is_proxy = context.request?.intelligence?.ip_intel?.is_proxy;
          console.log("PERSON" + context.actor.username)
          console.log(context.request.request_id)
          console.log("Place Lat: " + lat + " and long: " + long)

          if(checkIfEmail(username) && lat && long){

            const hashId = createUniqueUserLocId(username, lat, long);
            
            usersWithLocation[hashId] = {
              username: username,
              lat: lat,
              long: long,
              time: time,
              is_vpn: is_vpn ? true : false,
              is_proxy: is_proxy ? true : false
            }
          }
        });

        return usersWithLocation;
      }

      throw Error("Error querying Pangea API");
    } catch (err) {
      if (err instanceof PangeaErrors.APIError) {
        console.log(err.summary, err.pangeaResponse);
        throw err;
      } else {
        throw err;
      }
    }
  } else {
    throw Error("No PANGEA_TOKEN found.");
  }
}


const createUniqueUserLocId = (username: string, lat: string, long: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(username + lat + long);
  return hash.digest('hex');
}