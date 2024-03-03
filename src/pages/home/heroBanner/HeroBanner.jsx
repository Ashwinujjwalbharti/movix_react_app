import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
     //navigate takes to that path which i have searched 
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    // fech data of upcoming movie from tmdb api
    const { data ,loading} = useFetch("/movie/upcoming");
    

    useEffect(() => {
    // path for background image which will change every render
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
        
    }, [data]);
    // when we search on search box and event.key is when we press enter then it will search
    const searchQueryHandler = (event) => {
        if (event.key === "Enter"  && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    const clickHandler=()=>{
        if(query.length>0){
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
    {/* this is for making two layers image opecity */}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={clickHandler} >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
