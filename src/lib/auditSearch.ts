/* eslint-disable no-console */

import { PangeaConfig, AuditService, PangeaErrors} from 'pangea-node-sdk';
import { ZonedDateTime } from "@internationalized/date";
import { Console } from 'console';

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
      //console.log("Response: %s", JSON.stringify(logResponse.result));


      if(logResponse.success) {
        console.log("SUCCESS");
        logResponse.result.events.forEach(element => {

          //console.log(element.envelope.event.external_context)

          let service_feat = element.envelope.event.action.toString()
          let context_str = element.envelope.event.external_context.toString()
          let context = JSON.parse(element.envelope.event.external_context.toString())

          if (service_feat.includes("login")) {
            console.log("PERSON" + context.actor.username)
          
            if(context_str.includes("intelligence"))
              console.log("found")
              //console.log("Place "+ JSON.stringify(context.request.intelligence.))
          }
          
        });
          
        //let locations = getLocations(logResponse.result.events);

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


function getLocations(res: any){

  console.log("IN Get Locations")

  let result = res;

  console.log(result)

  for(let key in result){

    if(key.includes("external_context"))
      console.log( key + ": " + result[key])
  }
}