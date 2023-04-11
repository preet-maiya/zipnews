import React from "react";
import './News.css'
import States from "../States/States";
import StateNews from "../StateNews/StateNews";
import Charts from "../Charts/Charts";

function News(props) {
    return (
        <div className="right-container">
            {/* <div className="temp">Right side needs to be completed.</div> */}
            <Charts />
            <States />
            <StateNews />
        </div>
    )
}

export default News;