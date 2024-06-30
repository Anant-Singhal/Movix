import React from 'react'
import "./stylse.scss"
import { useSelector } from 'react-redux'
const Geners = ({data}) => {
    const {generes} = useSelector((state) => state.home)
  return (
    <div className='genres'>
      {data?.map((g)=>{
        if(!generes[g]?.name)
          {
            console.log("hi");
            return;
          }
        return (
          <div key={g} className='genre'>
            {generes[g]?.name}
            
          </div>
        )
      })}
    </div>
  )
}

export default Geners