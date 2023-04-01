import React from "react";
import DateRangePicker from "../Date/DateRangePicker";
import MapUS from "../MapComponent/MapUS";
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="left-container">
            <img src="/logo-no-background.png" alt="Logo" className="logo" />
            <DateRangePicker />
            <MapUS />
        </div>
    );
}

export default Sidebar;