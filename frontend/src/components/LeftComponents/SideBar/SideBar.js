import React from "react";
import DateRangePicker from "../Date/DateRangePicker";
import MapUS from "../MapComponent/MapUS";
import './Sidebar.css'
import { useThemeProps } from "@mui/material";

function Sidebar(props) {
    let responseToApp = {
        fromDate: new Date(),
        toDate: new Date(),
    }

    const recieveDates = (dates) => {
        responseToApp = {
            ...responseToApp,
            fromDate: dates.fromDate,
            toDate: dates.toDate
        }
    }

    const receiveUSState = (stateName) => {
        responseToApp = {
            ...responseToApp,
            stateName: stateName
        }
        props.handleResponse(responseToApp);
    }
    return (
        <div className="left-container">
            <img src="/logo-no-background.png" alt="Logo" className="logo" />
            <DateRangePicker onSelectingDates={recieveDates} />
            <MapUS onSelectingUSState={receiveUSState} />
        </div>
    );
}

export default Sidebar;