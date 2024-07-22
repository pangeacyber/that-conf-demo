"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from "react";

export default function Map() {

    return(
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
         
            <Marker position={[42.515, -96.79]}>
                <Popup>
                  email @ <br /> Time? Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
