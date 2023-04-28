import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Switch, Stack, IconButton, InputAdornment, Box } from '@mui/material';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SearchBar from '../components/SearchBar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Logo from '../assets/zipnews-low-resolution-logo-color-on-transparent-background.png'

import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate } from '../store/dateSlice';

const Navbar = ({ heatmapSelection }) => {
    const date = useSelector((state) => state.date.value)
    const [selectedDate, setSelectedDate] = useState(new dayjs());
    const [minDate, setMinDate] = useState();
    const dispatch = useDispatch()

    const handleDateChange = (e) => {
        setSelectedDate(e);
    };
    const handleDateSubmit = () => {
        if (selectedDate) {
            dispatch(changeDate(Date(selectedDate.$d)))
        }
        // Add your date submission logic here
    };


    useEffect(() => {
        // console.log(selectedDate)
        const temp = new dayjs(date)
        // const newDate = temp.subtract(7, 'days');
        setSelectedDate(temp)
        setMinDate(temp.subtract(1, 'month'));
    }, [])




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

                        minDate={dayjs(minDate)}
                        maxDate={dayjs(selectedDate)}
                    />
                </LocalizationProvider>
                <IconButton onClick={handleDateSubmit}>
                    <ArrowRightAltRoundedIcon  />
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