import { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { useCallback } from "react";
import { v4 } from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoibWV4aWNvbGluZG84NiIsImEiOiJjbDJtaTV6cjYwZGZkM2NwN2lpNXZ5aHBwIn0.UD-1dHRAYtQXyml42YoVyQ';

export const useMapBox = (initialPoint) => {
    const divMap = useRef();
    const setRef = useCallback( (node) => {
        divMap.current = node;
    }, []);

    const markers = useRef( {} );

    const map = useRef();
    const [ coords, setCoords ] = useState(initialPoint);


    const addMark = useCallback ( ( ev ) =>{
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4();

        marker
            .setLngLat( [ lng, lat])
            .addTo( map.current)
            .setDraggable( true );

        markers.current[ marker.id ] = marker;


        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();
            
        })

        console.log(markers.current)
    }, [] )

    useEffect(() => {
        const mapbx = new mapboxgl.Map({
            container: divMap.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ initialPoint.lng, initialPoint.lat],
            zoom: initialPoint.zoom
            });

            map.current = mapbx;
    }, [initialPoint]);

    useEffect(() => {
        map.current?.on('move', () =>{
            const { lng, lat} = map.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(2)
            })
        })
    }, []);


    useEffect (() =>{
        map.current?.on('click',  addMark);
    }, [addMark] )

    return {
        addMark,
        coords,
        markers,
        setRef
    }
}
