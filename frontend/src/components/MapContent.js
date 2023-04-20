import React, { useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from "../util/statesData"
import { Box, Backdrop, Modal, Fade, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import ModalWindow from './ModalWindow';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '70vw',
//     height: '70vh',
//     bgcolor: 'background.paper',
//     borderRadius: '15px',
//     boxShadow: 24,
//     p: 4,
// };


const MapContent = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const geoJson = useRef(null);
    const map = useMap();

    const highlightFeature = (e) => {
        const layer = e.target;

        layer.setStyle({
            fillColor: '#8DA80D',
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
        layer.setStyle(
            {
                color: 'white',
                fillColor: '#7EAFB4',
                fillOpacity: 0.8,
                weight: 1,
            }
        );
        layer.unbindTooltip();
    };

    const zoomToFeature = (e) => {
        map.fitBounds(e.target.getBounds(), { maxZoom: 6 });
        handleOpen();
        // props.onSelectingUSState(e.target.feature.properties.name)
    };

    return (
        <Box>
            <GeoJSON
                data={statesData}
                key='usa-states'
                ref={geoJson}
                style={() => {
                    return {
                        color: 'white',
                        fillColor: '#7EAFB4',
                        fillOpacity: 0.8,
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
            <ModalWindow open={open} handleClose={handleClose} />
            {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={handleClose}>
                            <Close />
                        </IconButton>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            State name
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Fade>
            </Modal> */}
        </Box>
    );
};

export default MapContent;