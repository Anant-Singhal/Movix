import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from "../../hooks/useFetch.jsx"
import DetailsBanner from './detailsBanner/DetailsBanner.jsx'

const Details = () => {
  const {mediaType, id} = useParams();
  const { data,isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data : credits ,isLoading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
    </div>
  )
}

export default Details