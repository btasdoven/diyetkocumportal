import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Geocode from "react-geocode";
import styled from 'styled-components';
import React, { Fragment, useRef, useState, useCallback } from 'react';

Geocode.setApiKey("AIzaSyAmfpC11teqcVt95Go8sQp8O21mczo7Thw");
Geocode.setLanguage("tr");
Geocode.setRegion("tr");
Geocode.enableDebug();

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOdRysM2gyUv8wqF41DrNK9l6DzRRqmAE",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `384px`, position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
    const refMap = useRef(null);
    const [center, setCenter] = useState(undefined);

    if (center == undefined) {
        Geocode.fromAddress("Eiffel Tower").then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                setCenter({lat, lng})
            },
                error => {
                console.error(error);
            }
        );
    }

    const handleBoundsChanged = () => {
        const mapCenter = refMap.current.getCenter(); //get map center
        setCenter(mapCenter);
    };

  return (
    <Fragment>
        <GoogleMap
            ref={refMap}
            onBoundsChanged={useCallback(handleBoundsChanged)}
            disableDefaultUI={true}
            defaultZoom={6.75}
            defaultCenter={center || { lat: 38.987996, lng: 35.453948 }}
            defaultOptions={{
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}
        >
        </GoogleMap>
        <img 
            style={{
                width: '27px',
                height: '43px',
                position: 'absolute',
                left: 'calc(50% - 13.5px)',
                top: 'calc(50% - 43px)'    
            }} 
            src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png" 
        />
    </Fragment>
  )
})

export default MyMapComponent