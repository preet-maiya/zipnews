import React from "react";
import './MapUS.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapContent from "./MapContent";


function MapUS(props) {

    const receiveUSState = (stateName) => {
        props.onSelectingUSState(stateName)
    }
    return (
        <div className="map">
            <MapContainer center={[45.255758, -104.156110]} zoom={3} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
                < TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.us/{z}/{x}/{y}.png"
                    subdomains={['a', 'b', 'c', 'd']}
                />
                <MapContent onSelectingUSState={receiveUSState} />
            </MapContainer>
        </div >
    )
}


export default MapUS;
