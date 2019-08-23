import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { Dimmer, Loader } from 'semantic-ui-react';

const getAverageForKey = (list, key) => {
    if (!list.length) {
        return 0;
    }

    const sum = list.map((element) => element[key]);

    return sum.reduce((total, current) => total + current, 0) / list.length;
}

const getPosition = (program) => ({ lat: Number(program.latitude), lng: Number(program.longitude) });

const getMarker = (program, index, hideLabel, onMarkerClicked) => (hideLabel
    ? <Marker position={getPosition(program)} key={index} onClick={() => onMarkerClicked(program)} /> 
    : (
        <MarkerWithLabel
            position={getPosition(program)}
            key={index}
            onClick={() => onMarkerClicked(program)}
            labelAnchor={new google.maps.Point(0, 0)}
            labelStyle={{backgroundColor: "black", 'color': 'white', fontSize: "10px", padding: "5px"}}
        >
            <div>{program.name}</div>
        </MarkerWithLabel>
    ));

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '75vh', maxHeight: '500px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({
    programs,
    loading,
    onMarkerClicked = () => {},
    hideLabel = false
}) => {
    if(loading){
        return (
            <Dimmer active>
                <Loader>Loading Map...</Loader>
            </Dimmer>
        );
    }

    const markerPositions = programs.map((program) => getPosition(program));
    const markers = programs.map((program, index) => getMarker(program, index, hideLabel, onMarkerClicked));

    const avgLat = getAverageForKey(markerPositions, 'lat');
    const avgLng = getAverageForKey(markerPositions, 'lng');

    const map = markerPositions.length > 0
        ? (
            <GoogleMap
                defaultZoom={10}
                center={{ lat: avgLat, lng: avgLng }}
            >
                {markers}
            </GoogleMap>
        ) : '';

    return map;
});

