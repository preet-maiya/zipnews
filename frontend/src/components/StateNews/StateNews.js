import React, { useState, useEffect } from "react";
import './StateNews.css'

function StateNews() {
    const [news, setNews] = useState([]);
    

    const fetchNews = () => {
        // Make some axios/fetch call
        // setNews([...news, ...res.data.news]);
    }
    
      
    return (
        <div className="state_news">
            <div className="news">
                News will be listed here.
            </div>
        </div>
    );
}

export default StateNews;