
import{Marker, Popup } from 'react-leaflet'

export function markers(markerData){

    return(

    {Object.keys(markerData).length > 0 ?
        Object.entries(markerData).map((key) => (
            <Marker position={[key[1].lat, key[1].long]}>
                <Popup>
                    email: {key[0].toString()}
                </Popup>
            </Marker>
        ))
    : <></>
    }
    )

}