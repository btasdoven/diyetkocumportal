import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Geocode from "react-geocode";
import styled from 'styled-components';
import React, { Fragment, useRef, useState, useCallback } from 'react';

class MapInternal extends React.Component {
    constructor(props) {
        super(props)

        // this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
        // this.handleZoomChanged = this.handleZoomChanged.bind(this)

        // this.state = {
        //     zoom: props.zoom,
        //     center: props.latlng
        // }
    }

    // handleBoundsChanged() {
    //     this.setState({
    //         center: this.props.refMap.current.getCenter()
    //     })
    // }

    // handleZoomChanged() {
    //     this.setState({
    //         zoom: this.props.refMap.current.getZoom()
    //     })
    // }

    render() {
        const { lat, lng, zoom } = this.props.latlng

        return (
            <Fragment>
                <GoogleMap
                    // onBoundsChanged={this.handleBoundsChanged}
                    // onZoomChanged={this.handleZoomChanged}
                    disableDefaultUI={true}
                    defaultZoom={zoom || 6.75}
                    defaultCenter={{ lat: lat || 38.987996, lng: lng || 35.453948}}
                    defaultOptions={{
                        streetViewControl: false,
                        scaleControl: false,
                        mapTypeControl: false,
                        panControl: false,
                        zoomControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        //
                        gestureHandling : "none",
                        keyboardShortcuts: false,
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
    }
}

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOdRysM2gyUv8wqF41DrNK9l6DzRRqmAE",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `150px`, position: 'relative' }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(MapInternal);

  export default MyMapComponent;