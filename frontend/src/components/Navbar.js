import React, { useState } from 'react';
import { FormControl, FormControlLabel, Switch, Stack, IconButton, InputAdornment, Box } from '@mui/material';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SearchBar from '../components/SearchBar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Logo from '../assets/zipnews-low-resolution-logo-color-on-transparent-background.png'

import dayjs, { Dayjs } from 'dayjs';


const Navbar = ({ heatmapSelection }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs('2023-04-24'));;
    const handleDateChange = (e) => {
        setSelectedDate(e);
    };
    const handleDateSubmit = () => {
        if (selectedDate) {

            console.log(selectedDate.$d);
        }
        // Add your date submission logic here
    };




    const handleSwitch = (e) => {
        heatmapSelection(e.target.checked)
    }


    return (
        <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '20px', xs: '12px' } }} px="20px">
            <img src={Logo} alt="logo" style={{ width: '120px', height: '64px', margin: '0px 20px' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{
                        width: '150px', '& .MuiInputBase-input': {
                            fontSize: '12px',
                        }, '& .MuiInputBase-root': {
                            borderRadius: '20px',
                        },
                        '& .MuiInputAdornment-root': {
                            borderRadius: '0 20px 20px 0',
                        },
                    }}
                        value={selectedDate}
                        onChange={handleDateChange}

                        minDate={dayjs('2022-05-01')}
                        maxDate={dayjs('2023-04-28')}
                    />
                </LocalizationProvider>
                <IconButton>
                    <ArrowRightAltRoundedIcon onClick={handleDateSubmit} />
                </IconButton>
            </Box>
            <SearchBar />
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