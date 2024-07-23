import React, { useState } from "react";
import {DateRangePicker} from "@nextui-org/react";
import {now, getLocalTimeZone, } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { toast } from "./ui/use-toast";


export default function TimeFilter() {
  let nw =  now(getLocalTimeZone());
  let then = nw.subtract({days: 5});

  let [value, setValue] = React.useState({
    start: then,
    end: nw
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <DateRangePicker
              label="Event duration"
              visibleMonths={1}
              pageBehavior="single"
              value={value}
              onChange={setValue}
            />
        </div>
      </div>
      <Button type="submit" className="ml-auto" onClick={
        async e =>
          {
            console.log("HEY THIS IS THE VALUE ON SUBMIT" + JSON.stringify(value))

              await axios.post('/api/audit-search', {
                startTime: value.start,
                endTime: value.end
              }).catch(error => {
                  console.log("ERROR" + JSON.stringify(error))
                  toast({
                    title: "Error: Unable to send Pangea Requests",
                    description: "Please reach out on the Pangea.cloud slack if the error persists"
                  })
              })
             
          }
       }
      >
        Confirm
      </Button>
    </div>
  
  );
}