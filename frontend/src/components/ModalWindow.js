import React from 'react'
import { Box, Backdrop, Modal, Fade, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '70vh',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
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
        </Modal>
    )
}

export default ModalWindow