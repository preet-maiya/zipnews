import React, { useState, useEffect } from "react";
import {store} from "../../../store/store";
import { useSelector, useDispatch } from 'react-redux'
import './StateNews.css'

function StateNews() {
    const [news, setNews] = useState([]);
    const state = useSelector((state) => state.currentState.value)


    const fetchNews = () => {
        console.log(state)
        // Make some axios/fetch call
        // setNews([...news, ...res.data.news]);
    }

    useEffect(() => {
        fetchNews();
    }, [state]);


    return (
        <div className="state_news">
            <div className="news">
                {state} News will be listed here.
            </div>
        </div>
    );
}

export default StateNews;