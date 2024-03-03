import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
// destructered data 
const Carousel = ({ data,  endpoint, title }) => {
      // to select any div,element or virtual dom we use useRef
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
   // scrolling of movies left 
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };


    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                {/*this is used give arrow to move left and right*/}
                <BsFillArrowLeftCircleFill 
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                        // this is for poster image if not available then one bydefault imported poster as posterFallback
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item.media_type || endpoint}/${
                                                item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        {/* insert poster*/}
                                        <Img src={posterUrl} />
                        {/*as voting average is in decimal made it fixed to integer */}
                    <CircleRating   rating={item.vote_average.toFixed(1 )}    /> 
                      {/* <Genres      data={item.genre_ids.slice(0, 2)} />  */}
                                    </div>
                                    {/* insert tiltle of movies or anything*/}
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                       {/* insert date of movies or anything using dayjs which is imported above*/}  
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
