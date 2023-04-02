import React from "react";
import './News.css'
import States from "../States/States";
import StateNews from "../StateNews/StateNews";

function News() {
    return (
        <div className="right-container">
            {/* <div className="temp">Right side needs to be completed.</div> */}
            <States />
            <StateNews />
        </div>
    )
}

export default News;