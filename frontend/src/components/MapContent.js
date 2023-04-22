import React, { useRef, useState, useEffect } from 'react';
import { GeoJSON, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from "../util/statesData"
import { Box } from '@mui/material';

import ModalWindow from './ModalWindow';

const MapContent = ({ heatmap, searchValue, handleRefresh }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const geoJson = useRef(null);
    const map = useMap();
    const [state, setstate] = useState('');
    useEffect(() => {
        if (searchValue) {
            setstate('Hawaii');
            setOpen(true);
        }
    }, [searchValue]);

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
        setstate(e.target.feature.properties.name);
        handleOpen();
        highlightFeature(e)
    };

    const mapPolygonColorToDensity = (density => {
        if (!heatmap) {
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

    // const legend = (
    //     <Box sx={{
    //         position: 'absolute',
    //         bottom: '20px',
    //         left: '20px',
    //         backgroundColor: 'white',
    //         padding: '10px',
    //         borderRadius: '5px',
    //         boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    //         fontSize: '16px'
    //     }}>
    //         <p>State: {highlightedState ? highlightedState : 'Hover over a state'}</p>
    //     </Box>
    // );
    return (
        <Box>
            <GeoJSON
                data={statesData}
                key='usa-states'
                ref={geoJson}
                style={styles}
                onEachFeature={handleOnEachFeatures}
            />
            {/* {legend} */}
            <ModalWindow open={open} handleClose={handleClose} selectedState={state} />
        </Box>
    );
};

export default MapContent;