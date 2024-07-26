"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer } from 'react-leaflet';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import axios from 'axios';
import { toast } from "./ui/use-toast";
import { DatePicker } from "@nextui-org/date-picker";
import {now, getLocalTimeZone,ZonedDateTime } from "@internationalized/date";
import { Button } from "./ui/button";
import { Markers } from "./ui/markers";

/* https://docs.stadiamaps.com/map-styles/alidade-smooth-dark/ */


export default function Map() {
    let nw =  now(getLocalTimeZone());
    let then = nw.subtract({days: 5});

    const [value, setValue] = React.useState(then);
    
    const [markerData, setMarkerData] = React.useState(
        {}
    )

    const [ polling, setPolling] = React.useState(
     false  
    );

    useEffect(() => {
        const fetchData = async () => {
            let res = await getMarkerData(value)
            console.log(res);   
            setMarkerData(res);
        }

        fetchData().catch(console.error)
    }, [value]);

    
    useEffect(() => {
        console.log(markerData);
    }, [markerData])

    return(
        <div>
            <div>
                <div className="flex flex-row flex-wrap p-6">
                    <DatePicker
                        className=" basis-1/4 px-3"
                        value={value}
                        labelPlacement="outside"
                        onChange={setValue}

                    />
                    <div className=" flex items-center space-x-2 px-4">
                        <Switch id="polling"
                            checked={polling}
                            onCheckedChange={setPolling}
                        />
                        <Label htmlFor="polling">Polling</Label>
                    </div>
                    
                    <Button type="submit" className="px-4" onClick={
                            async e =>
                            {
                                console.log("HEY THIS IS THE VALUE ON SUBMIT" + JSON.stringify(value))
                                let res = await getMarkerData(value);
                                setMarkerData(res);
                            }
                        }>Confirm</Button>         
                </div>
        </div>

        <MapContainer
            style={ {height: "100vh"}}            
            center={[42.515, -96.79]}
            zoom={4}
            minZoom={3}
            maxZoom={19}
            scrollWheelZoom={true}
        >
            
            <TileLayer
                attribution=''
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <Markers data={markerData}></Markers>
        </MapContainer>  
        </div>
    )
}


async function getMarkerData(start:ZonedDateTime) {

    let res = await axios.post('/api/audit-search', {
        startTime: start
    }).catch(error => {
        console.log("ERROR" + JSON.stringify(error))
        toast({
            title: "Error: Unable to send Pangea Requests",
            description: "Please reach out on the Pangea.cloud slack if the error persists"
        })
    })

    return res.data;
}