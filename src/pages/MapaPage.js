import React from 'react'
import { useEffect } from 'react';
import { useMapBox } from '../hooks/useMapBox'


const initialPoint = {
    lng:-122.4725,
    lat: 37.8010,
    zoom: 13.5
}
export const MapaPage = () => {

    const { coords, setRef, newMarker$, moveMarker$ } = useMapBox(initialPoint);

    useEffect(() => {
        newMarker$.subscribe( marker =>{
            //console.log(marker)
        });
    }, [newMarker$]);

    useEffect(() => {
        moveMarker$.subscribe( marker =>{
            console.log(marker.id)
        });
    }, [moveMarker$]);
    
    return (
        <>
            <div className='info'>
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div
            ref={setRef}
                className='mapContainer'
            />
        </>
    )
}
