import React from 'react'
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWV4aWNvbGluZG84NiIsImEiOiJjbDJtaTV6cjYwZGZkM2NwN2lpNXZ5aHBwIn0.UD-1dHRAYtQXyml42YoVyQ';

const initialPoint = {
    lng:-122.4725,
    lat: 37.8010,
    zoom: 13.5
}
export const MapaPage = () => {
    const divMap = useRef();
    const [ map, setMap] = useState();
    const [ coords, setCoords ] = useState(initialPoint);

    useEffect(() => {
        const mapbx = new mapboxgl.Map({
            container: divMap.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ initialPoint.lng, initialPoint.lat],
            zoom: initialPoint.zoom
            });

            setMap(mapbx)
    }, []);

    useEffect(() => {
        map?.on('move', () =>{
            const { lng, lat} = map.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })
    }, [map])
    
    
    return (
        <>
            <div className='info'>
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div
            ref={divMap}
                className='mapContainer'
            />
        </>
    )
}
