import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { LocationOn } from '@mui/icons-material';
import { Stack, Autocomplete, TextField } from '@mui/material';

import Logo from '../assets/zipnews-low-resolution-logo-color-on-transparent-background.png'

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

const Navbar = () => {
    const [selectedState, setSelectedState] = useState(null);

    const handleSelect = (event, value) => {
        setSelectedState(value);
    };
    return (
        <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '20px', xs: '12px' } }} px="20px">
            <img src={Logo} alt="logo" style={{ width: '120px', height: '64px', margin: '0px 20px' }} />
            <Paper
                component="form"
                elevation={0}
                sx={{
                    p: '2px 4px', display: 'flex', alignItems: 'center', width: 300,
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
                    value={selectedState}
                    onChange={handleSelect}
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
            </Paper>
        </Stack>
    )
}

export default Navbar