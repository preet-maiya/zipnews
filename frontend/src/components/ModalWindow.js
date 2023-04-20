import React from 'react'
import { Box, Backdrop, Modal, Fade, Button, Typography, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchBar from './SearchBar';
import Card from './NewsCard'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75vw',
    height: '75vh',
    bgcolor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '15px',
    boxShadow: 0,
    border: '2px solid white',
    p: 2,
    outline: 'none',
};

const ModalWindow = ({ open, handleClose }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 1000,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            State name
                        </Typography>
                        <SearchBar />
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around" mt={2}>
                        <Typography width="15%">
                            Some filters
                        </Typography>
                        <Stack direction="row" sx={{ gap: { xl: '10px', lg: '5px', xs: '2px' } }} flexWrap="wrap" justifyContent="flex-end">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </Stack>
                    </Stack>
                </Box>
            </Fade>
        </Modal>


    )
}

export default ModalWindow