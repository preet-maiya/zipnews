import React, { useState, useEffect } from "react";
import {store} from "../../../store/store";
import { useSelector, useDispatch } from 'react-redux'
import http from "../../../assets/http";
import './StateNews.css'

function StateNews() {
    const [news, setNews] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [page, setPage] = useState(0);
    const state = useSelector((state) => state.currentState.value)


    const fetchNews = () => {
        // Make some axios/fetch call to get the news
        /*
        http.get('/news', {
            params: {
                state: state,
                page: page
            }
        }).then((res) => {
            setNews([...news, ...res.data.news]);
        }).catch((err) => {
            setErrMsg("There was some error fetching the news.")
            console.log(err);
        });
        */
    }

    const scroll = () => {
        const docTop = document.getElementById("news").scrollTop
        const docHeight = document.getElementById("news").scrollHeight
        console.log(docTop, docHeight)

    }

    useEffect(() => {
        fetchNews();
        document.getElementById("state_news").addEventListener("scroll", scroll)
    }, [state]);


    return (
        <div id="state_news" className="state_news">
            <div id="news" className="news">
                {state} News will be listed here.
            </div>
        </div>
    );
}

export default StateNews;