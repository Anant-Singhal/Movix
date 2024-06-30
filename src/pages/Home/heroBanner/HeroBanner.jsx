import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImages/Img'; 
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
const HeroBanner = () => {
  const [background,setBackground]  = useState("");
  const [query, setQuery] = useState("");
  const url = useSelector(state => state.home.url);
  const navigate = useNavigate();
  const {data,loading} = useFetch("/movie/upcoming");
  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    console.log(bg);
    setBackground(bg);
    
  },[data])
  const setQueryHandeler = (event)=>{
    if(event.key === "Enter" && query.length > 0)
    {
        navigate(`/search/${query}`)
    }
  }
  return (
    <div className="heroBanner">
      
      { !loading && <div className='backdrop-img'>
          <Img src={background} />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
          
            <div className="heroBannerContent">
              <span className="title">Welcome</span>
              <span className="subTitle">Millions of shows, movies, and people to discover</span>
              <div className='searchInput'>
                    <input 
                    type="text" 
                    placeholder='search for a movie or tv show....'
                    style={{width:"300px"}}
                    onKeyUp={setQueryHandeler}
                    onChange={(e)=>setQuery(e.target.value)} />
                    <button>search</button>
              </div>
            </div>
          
      </ContentWrapper>
      
    </div>
    
  )
}

export default HeroBanner
