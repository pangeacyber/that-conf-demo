
"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import {Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import L from 'leaflet'

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
    popupAnchor:  [10, -46] // point from which the popup should open relative to the iconAnchor
});



export function Markers({data}: any){

    const icons_array = [tree_Icon, unicorn_Icon, cheese_Icon];
    let int = Math.floor(Math.random() * icons_array.length);

    return(
        <>
            {Object.keys(data).length > 0 ?
                Object.entries(data).map((key) => (
                    <Marker position={[key[1].lat, key[1].long]} icon={icons_array[int]}>
                        <Popup>
                            email: {key[0].toString()}<br/>
                            {key[1].time}
                        </Popup>
                    </Marker>
                )
            )
            : <></>
            }
        </>
    )

}