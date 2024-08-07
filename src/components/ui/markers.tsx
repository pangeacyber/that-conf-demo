
"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { parseAbsoluteToLocal, toCalendarDate, toTime} from "@internationalized/date";

import {Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { UserLocationType } from "@/lib/utils";


const tree_Icon = L.icon({
    iconUrl: 'Tree.png',
    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [5, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [13, -44] // point from which the popup should open relative to the iconAnchor
});

const unicorn_Icon = L.icon({
    iconUrl: 'Unicorn.png',
    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [5, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-5, -48] // point from which the popup should open relative to the iconAnchor
});

const cheese_Icon = L.icon({
    iconUrl: 'Cheese.png',
    iconSize:     [38, 45], // size of the icon
    iconAnchor:   [5, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [10, -46], // point from which the popup should open relative to the iconAnchor
});

export function Markers({data}: any){

    const icons_array = [tree_Icon, unicorn_Icon, cheese_Icon];

    return(
        <>
            {Object.keys(data).length > 0 ?
                Object.entries(data).map(([key, value]: [string, any]) => (
                    <Marker 
                        position={[
                                value.lat + parseFloat((Math.random()/ 10000).toPrecision(2)), 
                                value.long + parseFloat((Math.random()/ 10000).toPrecision(2))
                            ]} 
                        icon= {icons_array[Math.floor(Math.random() * icons_array.length)]}
                        >
                        <Popup>
                            email: ***{value.username.slice(3)}<br/>
                            date: {
                              (toCalendarDate(parseAbsoluteToLocal(value.time)).toString())
                            } <br/>
                            time: {
                                 (toTime(parseAbsoluteToLocal(value.time)).toString()).slice(0,5)
                            } <br/>
                            is_vpn: {value.is_vpn.toString()} <br/>
                            is_proxy: {value.is_proxy.toString()}
                        </Popup>
                    </Marker>
                )
            )
            : <></>
            }
        </>
    )

}