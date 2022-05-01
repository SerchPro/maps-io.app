import React from 'react'
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWV4aWNvbGluZG84NiIsImEiOiJjbDJtaTV6cjYwZGZkM2NwN2lpNXZ5aHBwIn0.UD-1dHRAYtQXyml42YoVyQ';

const initialPoint = {
    lng:5,
    lat:34,
    zoom: 2
}
export const MapaPage = () => {
    const divMap = useRef();
    const [ map, setMap] = useState();

    useEffect(() => {
        const mapbx = new mapboxgl.Map({
            container: divMap.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ initialPoint.lng, initialPoint.lat],
            zoom: initialPoint.zoom
            });

            setMap(mapbx)
    }, [])
    
    return (
        <>
            <div
            ref={divMap}
                className='mapContainer'
            />
        </>
    )
}
