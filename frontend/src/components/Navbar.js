import React, { useState } from 'react';
import { FormControl, FormControlLabel, Switch, Stack } from '@mui/material';
import SearchBar from '../components/SearchBar';

import Logo from '../assets/zipnews-low-resolution-logo-color-on-transparent-background.png'

const Navbar = ({ heatmapSelection }) => {


    const handleSwitch = (e) => {
        heatmapSelection(e.target.checked)
    }


    return (
        <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '20px', xs: '12px' } }} px="20px">
            <img src={Logo} alt="logo" style={{ width: '120px', height: '64px', margin: '0px 20px' }} />
            <SearchBar/>
            <FormControl component="fieldset">
                <FormControlLabel
                    value="Heatmap"
                    control={<Switch color="primary" />}
                    label="Heatmap"
                    labelPlacement="end"
                    onChange={handleSwitch}
                />
            </FormControl>
        </Stack>
    )
}

export default Navbar