"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer } from 'react-leaflet';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef } from "react";
import axios, { AxiosResponse } from 'axios';
import { toast } from "./ui/use-toast";
import { DatePicker } from "@nextui-org/date-picker";
import {now, getLocalTimeZone,ZonedDateTime } from "@internationalized/date";
import { Button } from "./ui/button";
import { Markers } from "./ui/markers";
import { UserLocationType } from "@/lib/utils";

/* https://docs.stadiamaps.com/map-styles/alidade-smooth-dark/ */

export default function Map() {
    let nw =  now(getLocalTimeZone());
    let then = nw.subtract({days: 5});

    const [value, setValue] = React.useState(then);
    
    const [markerData, setMarkerData] = React.useState<UserLocationType | any>(
        {}
    )

    const [polling, setPolling] = React.useState(
     false  
    );
    const timeoutId = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            let res = await getMarkerData(value)
            console.log(res);
            res ? setMarkerData(res) : {};
        }

        fetchData().catch(console.error)
    }, [value]);

    useEffect(() => {
        if (polling) {
            const timer = setInterval(async () => {
                const res = await getMarkerData(value); 
                res ? setMarkerData(res) : {};
            }, 5000);
            timeoutId.current = timer;
        } else {
            timeoutId.current ? clearInterval(timeoutId.current) : {};
            timeoutId.current = null;
        }
    }, [polling])
    
    useEffect(() => {
        console.log(markerData);
    }, [markerData])

    return(
        <div>
            <div className="sm:p-1 md:px-10">
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
                                let res = await getMarkerData(value);
                                res ? setMarkerData(res) : {};
                            }
                        }>Confirm</Button>         
                </div>
            </div>
            <div className="sm:px-10 md:px-20">
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
        </div>
    )
}

async function getMarkerData(start:ZonedDateTime) {
    try {
        let res: AxiosResponse<any, any> = await axios.post('/api/audit-search', {
            startTime: start
        })
        return res.data;
    } catch(error) {
        console.log("ERROR" + JSON.stringify(error))
        toast({
            title: "Error: Unable to send Pangea Requests",
            description: "Please reach out on the Pangea.cloud slack if the error persists"
        })

        return null;
    }
}