import React, { useEffect, useState } from 'react'
import { Box, Backdrop, Modal, Fade, Button, Typography, IconButton, Stack, Paper, Autocomplete, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { LocationOn } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import Card from './NewsCard'
import { changeState } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../store/searchSlice';
import {http} from '../assets/http'
import { getStateCodeByStateName, getStateNameByStateCode, sanitizeStateCode, sanitizeStateName } from 'us-state-codes';

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const state_code = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO',
    'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD',
    'TN', 'TX', 'UT', 'VT', 'VA',
    'WA', 'WV', 'WI', 'WY'
]

const stringStates = states.toString().toUpperCase();

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




const ModalWindow = ({selectedState }) => {
    const [open, setOpen] = useState(false);
    const [news, setNews] = useState([]);
    const state = useSelector((state) =>  state.currentState.value)
    const searchValue = useSelector((state) => state.searchValue.value)
    const dispatch = useDispatch();

    const getNews = () => {
        http.get(`/v1/news?start_time=${''}&end_time=${''}&state_code=${getStateCodeByStateName(state)}`).then((res) => {
            if(res.data.success) {
                setNews([...news, ...res.data.news])
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (searchValue) {
            dispatch(changeState(searchValue))
            setOpen(true);
        }

        if(state) {
            setOpen(true);
        }
        // state_code.map((state_code) => {
        //     console.log(getStateNameByStateCode(state_code))
        // })
    }, [searchValue, state])

    const handleClose = () => {
        setOpen(false);
        dispatch(changeSearch(''));
        dispatch(changeState(''));
    }

    const handleSelect = (e, value) => {
        dispatch(changeSearch(''));
        dispatch(changeState(e.target.innerHTML))
    };
    const AutocompleteComponent = (<Paper
        component="form"
        elevation={0}
        sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 50,
            borderRadius: '50px 50px 50px 50px',
        }}
    >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
            <LocationOn />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Autocomplete
            width="200px"
            options={states}
            value={state}
            onChange={handleSelect}
            clearIcon={null}
            renderInput={(params) => (
                <TextField {...params} sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    width: "200px",
                    alignItems: 'center',
                }} label="State" variant="outlined" color="success" />

            )}
        />
    </Paper>)

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
                        <Typography fontWeight={600} color="#0A4C6A" id="transition-modal-title" sx={{ opacity: '0.5', display: { lg: 'block', xs: 'none' }, fontSize: '24px' }}>
                            {state}
                        </Typography>
                        {AutocompleteComponent}
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