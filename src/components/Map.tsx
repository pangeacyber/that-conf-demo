"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { toast } from "./ui/use-toast";
import {DateRangePicker} from "@nextui-org/react";
import {now, getLocalTimeZone,ZonedDateTime } from "@internationalized/date";
import { UserLocationType } from '../lib/utils';



export default function Map() {
    let nw =  now(getLocalTimeZone());
    let then = nw.subtract({days: 5});

  
    let [value, setValue] = React.useState({
      start: then,
      end: nw
    });
    
    const [markerData, setMarkerData] = React.useState(
        {}
    )

     useEffect( () => {
        let res = getMarkerData(value.start, value.end)
        setMarkerData(res);
    }, [value]);
    

    return(
        <div>
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
                    let res = getMarkerData(value.start, value.end);
                    setMarkerData(res);
                }
            }
            >
                Confirm
            </Button>
        </div>

        <MapContainer 
            center={[42.515, -96.79]} 
            zoom={11} 
            scrollWheelZoom={true}
            style={{ height: "400px", width: "600px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.entries(markerData).map((key,value) => {
                    return(
                        <Marker position={[42.515, -96.79]}>
                            <Popup>
                                {key.toString()} & {value}
                            </Popup>
                        </Marker>
                    );
                }) 
            }
        </MapContainer>
        </div>
    )
}


async function getMarkerData(start:ZonedDateTime, end: ZonedDateTime) {

    let res = await axios.post('/api/audit-search', {
        startTime: start,
        endTime: end
    }).catch(error => {
        console.log("ERROR" + JSON.stringify(error))
        toast({
            title: "Error: Unable to send Pangea Requests",
            description: "Please reach out on the Pangea.cloud slack if the error persists"
        })
    })

    return res;
}