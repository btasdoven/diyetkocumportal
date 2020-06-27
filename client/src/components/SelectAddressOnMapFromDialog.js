import React, { Fragment } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";

class MapInternal extends React.Component {

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
        return (
            <Fragment>
                <GoogleMap
                    ref={this.props.refMap}
                    // onBoundsChanged={this.handleBoundsChanged}
                    // onZoomChanged={this.handleZoomChanged}
                    disableDefaultUI={true}
                    defaultZoom={this.props.zoom || 6.75}
                    defaultCenter={{ lat: this.props.lat || 38.987996, lng: this.props.lng || 35.453948}}
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
    }
}

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOdRysM2gyUv8wqF41DrNK9l6DzRRqmAE",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `385px`, position: 'relative' }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(MapInternal);

  export default React.forwardRef((props, ref) => <MyMapComponent refMap={ref} {...props} />)