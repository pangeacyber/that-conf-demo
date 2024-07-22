/* eslint-disable no-console */

import { PangeaConfig, AuditService, PangeaErrors} from 'pangea-node-sdk';
import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";

export default async function auditSearch({
  startTime,
  endTime }: any) {

 let s = new ZonedDateTime(startTime);

  console.log("Stringified Start " + JSON.stringify(data.start))
  console.log("End time: " + (data.end).toString())

  

  if(process.env.PANGEA_TOKEN) {
    const token = process.env.PANGEA_TOKEN as string;
    const config_id = process.env.PANGEA_AUDIT_CONFIG as string;

    const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN, configID: config_id });
    const audit = new AuditService(token, config);

    try {
      //const logResponse = await audit.search('',{end: endTime, start: startTime}, {});
      //console.log("Response: %s", logResponse.result);
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