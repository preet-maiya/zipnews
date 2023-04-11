import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import store from "../../../store/store";
import { changeState } from "../../../store/stateSlice";
import './States.css'

function States() {
    const state = useSelector((state) => state.currentState.value)
    const dispatch = useDispatch()
    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    const handleChangeState = (e) => {
        const value = e.target.value;
        if (value) {
            dispatch(changeState(value));
        }
        // setSelectedState(value);
    }


    return (
        <div className="states">
            <select className="selectOptions" value={state} onChange={handleChangeState}>
                <option>Select a state</option>
                {states.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default States;