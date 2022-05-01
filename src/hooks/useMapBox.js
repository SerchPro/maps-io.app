import { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { useCallback } from "react";

mapboxgl.accessToken = 'pk.eyJ1IjoibWV4aWNvbGluZG84NiIsImEiOiJjbDJtaTV6cjYwZGZkM2NwN2lpNXZ5aHBwIn0.UD-1dHRAYtQXyml42YoVyQ';

export const useMapBox = (initialPoint) => {
    const divMap = useRef();
    const setRef = useCallback( (node) => {
        divMap.current = node;
    }, [])

    const map = useRef();
    const [ coords, setCoords ] = useState(initialPoint);

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

    return {
        coords,
        setRef
    }
}
