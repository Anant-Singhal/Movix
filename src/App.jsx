import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchDatafromApi} from './utils/api.js'
import { getApiConfiguration, getGeneres } from "./store/homeSlice.js";
import {BrowserRouter ,Route, Routes } from "react-router-dom";

import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import Details from './pages/Detalis/Details.jsx'
import PageNotFound from './pages/404/404.jsx'
import Explore from './pages/Explore/Explore.jsx'
import Home from './pages/Home/Home.jsx'

import SearchResult from './pages/SearchResults/SearchResult.jsx'

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    
    fetchDatafromApi('/configuration').then((res)=>{
        
        const url = {
          backdrop:res.images.secure_base_url+"original",
          poster:res.images.secure_base_url+"original",
          profile:res.images.secure_base_url+"original",
        }
        dispatch(getApiConfiguration(url));
        
      })
      genersCall();
},[]);
const genersCall = async () => {
  let promises = [];
  let endPoints = ["tv","movie"];
  let allGeners = {};
  endPoints.forEach((url)=>{
    promises.push(fetchDatafromApi(`/genre/${url}/list`))
  })
  //this will ensure that code does not move ahead until both tv, and movie data gets collected
  const data = await Promise.all(promises);
  
  data.map(({genres}) => {
  return genres.map((item)=>{
      allGeners[item.id] = item;
      
    })
  })
  console.log(allGeners);
  dispatch(getGeneres(allGeners));
  
}
  return (
<BrowserRouter>
    <Header/>
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/:mediaType/:id" element={<Details/>}/>
       <Route path="/search/:query" element={<SearchResult/>}/>
       <Route path="/explore/:mediaType" element={<Explore/>} />
       <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
    
</BrowserRouter>
  )
}

export default App
