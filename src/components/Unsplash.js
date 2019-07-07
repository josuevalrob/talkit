import React, { useState, useEffect } from 'react';
import ImgList from './misc/ImgList';
import imgService from '../services/UnsplashService'

const Unsplash = () => {
  const [imgs, setImgs] = useState([])
  
  const fetchData = async () => {
    const response = await imgService.getProfilePhotos()
    setImgs(response.data)
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="main-content">
        {
          imgs.length === 0 
          ? 'Loading...' //! add a loading component. 
          : <ImgList data={imgs}/>
        }
    </div>
  )
}

export default Unsplash