import React, { useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from "./statesData";


const MapContent = () => {
    const geoJson = useRef(null);
    const map = useMap();

    const highlightFeature = (e) => {
        const layer = e.target;

        layer.setStyle({
            color: '#666',
            fillOpacity: 1,
            weight: 5,
            dash: '',
        });
        e.target.bindTooltip(e.target.feature.properties.name, {
            sticky: true,
            offset: [0, -10],
            permanent: true,
            interactive: false
        }).openTooltip();
    };

    const resetHighlight = (e) => {
        const layer = e.target;
        layer.setStyle(
            {
                color: 'black',
                fillColor: '#57756E',
                fillOpacity: 0.5,
                weight: 1,
            }
        );
        layer.unbindTooltip();
    };

    const zoomToFeature = (e) => {
        map.fitBounds(e.target.getBounds());
    };

    return (
        <GeoJSON
            data={statesData}
            key='usa-states'
            ref={geoJson}
            style={() => {
                return {
                    color: 'black',
                    fillColor: '#57756E',
                    fillOpacity: 0.5,
                    weight: 1,
                };
            }}
            onEachFeature={(__, layer) => {
                layer.on({
                    click: (e) => {
                        zoomToFeature(e);
                    },
                    mouseout: (e) => {
                        resetHighlight(e);
                    },
                    mouseover: (e) => {
                        highlightFeature(e);
                    },
                });
            }}
        />
    );
};

export default MapContent;