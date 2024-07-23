/* eslint-disable no-console */

import { PangeaConfig, AuditService, PangeaErrors} from 'pangea-node-sdk';
import { ZonedDateTime } from "@internationalized/date";
import { login_marker } from './utils';

const arr: login_marker[] = [];

export default async function auditSearch({
  startTime,
  endTime }: any) {

 let start = new ZonedDateTime(
  startTime.year, 
  startTime.month, 
  startTime.day,
  startTime.timeZone,
  startTime.offset,
  startTime.hour,
  startTime.minute,
  startTime.second);

  let end = new ZonedDateTime(
    endTime.year, 
    endTime.month, 
    endTime.day,
    endTime.timeZone,
    endTime.offset,
    endTime.hour,
    endTime.minute,
    endTime.second);

  console.log("start time: " + (start).toAbsoluteString())
  console.log("end time: " + (end).toAbsoluteString())

  if(process.env.PANGEA_SAL_TOKEN) {
    const token = process.env.PANGEA_SAL_TOKEN as string;
    const config_id = process.env.PANGEA_AUDIT_CONFIG as string;

    const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN, configID: config_id });
    const audit = new AuditService(token, config);

    try {
      const logResponse = await audit.search('',{end: (end).toAbsoluteString() , start: (start).toAbsoluteString()}, {});
      arr.splice(0, arr.length);

      if(logResponse.success) {
        
        logResponse.result.events.forEach(element => {
          let service_feat = element.envelope.event.action.toString()
          let time = element.envelope.event.timestamp.toString()
          let context_str = element.envelope.event.external_context.toString()
          let context = JSON.parse(element.envelope.event.external_context.toString())

          if (service_feat.includes("login")) {
            console.log("PERSON" + context.actor.username)
            let username = context.actor.username
          
            if(username.includes("@") && context_str.includes("city")){
              //console.log("found " + JSON.stringify(context.request.intelligence.ip_intel.geolocation))
              let lat = context.request.intelligence.ip_intel.geolocation.latitude;
              let long = context.request.intelligence.ip_intel.geolocation.longitude;
              console.log("Place Lat: " + lat + " and long: " + long)
              
              addMarker( username,lat, long, time);
            }
          }
        });

        if(arr.length > 0){
          return arr;
        }
          
      }
    } catch (err) {
      if (err instanceof PangeaErrors.APIError) {
        console.log(err.summary, err.pangeaResponse);
      } else {
        throw err;
      }
    }
  } else {
    return false;
  }
}


function addMarker(username: string, latitude: number, longitude: number, time: string){

  let temp: login_marker = 
  { username: username, 
    lat: latitude, 
    long: longitude, 
    time: time }

    arr.push(temp);
}
