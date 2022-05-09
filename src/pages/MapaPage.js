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

    const { coords, setRef, newMarker$, moveMarker$, addMark, updatePosition } = useMapBox(initialPoint);
    const { socket } = useContext(SocketContext);

    // Listen to existing bookmarks
    useEffect(() => {
        socket.on('active-markers', (markers) => {
            for(const key  of Object.keys(markers)) {
                addMark(markers[key], key)
            }
        });
    }, [socket, addMark])
    
    // new marker
    useEffect(() => {
        newMarker$.subscribe( marker =>{
            socket.emit('new-marker', marker)
        });
    }, [newMarker$, socket]);

    // marker movement
    useEffect(() => {
        moveMarker$.subscribe( marker =>{
            socket.emit('update-marker', marker)
        });
    }, [socket, moveMarker$]);

    // Move Marker Using Sockets
    useEffect( () =>{
        socket.on('update-marker', (marker) =>{
            updatePosition(marker)
        })
    }, [socket, updatePosition]);

    // Listen to new bookmarks
    useEffect(() => {
        socket.on('new-marker', (marker) =>{
        addMark(marker, marker.id)
    });

    }, [socket, addMark]);

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
