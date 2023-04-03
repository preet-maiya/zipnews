import React from "react";
import './News.css'
import States from "../States/States";
import StateNews from "../StateNews/StateNews";
import Charts from "../Charts/Charts";

function News(props) {
    console.log(`${props.selectedState} from news`);
    return (
        <div className="right-container">
            {/* <div className="temp">Right side needs to be completed.</div> */}
            <Charts />
            <States selectedState={props.selectedState} />
            <StateNews selectedState={props.selectedState} />
        </div>
    )
}

export default News;