import React, { useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from "../util/statesData"
import { Box, Backdrop, Modal, Fade, Button, Typography, IconButton } from '@mui/material';

import ModalWindow from './ModalWindow';

const MapContent = ({ heatmap }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const geoJson = useRef(null);
    const map = useMap();

    const styles = (f) => {
        return {
            color: '#666',
            fillColor: mapPolygonColorToDensity(f.properties.density),
            fillOpacity: 0.8,
            weight: 1,
            dashArray: '3'
        };
    }

    const handleOnEachFeatures = (__, layer) => {
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
    }

    const highlightFeature = (e) => {
        const layer = e.target;
        layer.setStyle({
            dashArray: '',
            color: '#666',
            fillOpacity: 1,
            weight: 5,
            dash: '1',
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
        layer.setStyle({
            color: '#666',
            fillOpacity: 0.8,
            weight: 1,
            dashArray: '3',
        });
        layer.unbindTooltip();
    };

    const zoomToFeature = (e) => {
        map.fitBounds(e.target.getBounds(), { maxZoom: 6 });
        handleOpen();
        highlightFeature(e)
        // props.onSelectingUSState(e.target.feature.properties.name)
    };

    const mapPolygonColorToDensity = (density => {
        if (!heatmap) {
            console.log("inside")
            return '#7EAFB4'
        }
        return density > 1000
            ? '#0A4C6A'
            : density > 500
                ? '#166386'
                : density > 200
                    ? '#267C93'
                    : density > 100
                        ? '#38929D'
                        : density > 25
                            ? '#4AA4A7'
                            : '#5FC5C5';
    })
    return (
        <Box>
            <GeoJSON
                data={statesData}
                key='usa-states'
                ref={geoJson}
                style={styles}
                onEachFeature={handleOnEachFeatures}
            />
            <ModalWindow open={open} handleClose={handleClose} />
        </Box>
    );
};

export default MapContent;