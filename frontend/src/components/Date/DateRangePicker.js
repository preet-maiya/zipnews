import './DateRangePicker.css';

import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ForwardIcon from '@mui/icons-material/Forward';
import dayjs from 'dayjs';

function DateRangePicker() {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    function HandleFromChange(e) {
        setFromDate(e.$d);
    }
    function HandleToChange(e) {
        setToDate(e.$d);
    }

    function handleDates() {
        const response = {
            fromDate: fromDate,
            toDate: toDate
        }
        console.log(response)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='date-container'>
                <div className='date-picker-label' >
                    <DatePicker
                        label="FROM"
                        onChange={HandleFromChange}
                        disableFuture={true}
                        maxDate={toDate && dayjs(toDate)}
                        className="white-label"
                    />
                </div>
                <div className="dash"></div>
                <div className='date-picker-label' >
                    <DatePicker
                        label="TO"
                        onChange={HandleToChange}
                        disableFuture={true}
                        minDate={fromDate && dayjs(fromDate)}
                        className="white-label"
                    />
                </div>

                <span className='forward-icon' onClick={handleDates}><ForwardIcon fontSize='large' /></span>
            </div>
        </LocalizationProvider>
    );
}

export default DateRangePicker;