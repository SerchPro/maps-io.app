import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapBox } from '../hooks/useMapBox'


const initialPoint = {
    lng:-122.4725,
    lat: 37.8010,
    zoom: 13.5
}
export const MapaPage = () => {

    const { coords, setRef, newMarker$, moveMarker$ } = useMapBox(initialPoint);
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        newMarker$.subscribe( marker =>{
            socket.emit('new-marker', marker)
        });
    }, [newMarker$, socket]);

    useEffect(() => {
        moveMarker$.subscribe( marker =>{
            console.log(marker.id)
        });
    }, [moveMarker$]);

    useEffect(() => {
      socket.on('new-marker', (marker) =>{
        console.log(marker)
      });

      }, [socket])
    
    
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
