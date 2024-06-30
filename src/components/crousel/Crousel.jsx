import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImages/Img.jsx";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import dayjs from "dayjs";
import Geners from "../geners/Geners.jsx";




const Crousel = ({data, loading, endpoint}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) =>state.home)
    const navigate = useNavigate();
    const navigation = (dir) =>{
        console.log("nkjnk")
     const container = carouselContainer.current;
     const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20) ;
    
     container.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
     });
    
    
    }
    
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
  return (
    <div className="carousel" >
        <ContentWrapper>
            
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
                className="carouselRighttNav arrow"
                onClick={() => navigation("right")}
            />
            {!loading && data ?  (
                <div className="carouselItems" ref={carouselContainer}> 
                {console.log(data)}
                {data?.map((item)=>{
                    
                    const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                    return(
                        
                        <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}}`)}>
                            {console.log(loading)}
                            <div className="posterBlock">
                                <Img src={posterUrl} />
                                <CircleRating rating={item.vote_average.toFixed(1)}/>
                                <Geners data={item.genre_ids.slice(0,2)}/>
                            </div>
                            <div className="textBlock">
                                <span className="title">
                                    {item.title || item.name}
                                </span>
                                <span className="date">
                                    {dayjs(item.release_Date).format(
                                        "MMM D, YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                )})}
                </div>
            ) :  (
                <div className="loadingSkeleton">
                    {console.log(loading)}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div> ) } 
             
        </ContentWrapper>    
    </div>
  )
}

export default Crousel