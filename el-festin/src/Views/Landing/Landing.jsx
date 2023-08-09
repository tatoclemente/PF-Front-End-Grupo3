import React, { useEffect, useState } from "react";
import { Carousel } from "../../Components/LandingComponents/Carousel/Carousel";
import CarouselPhotos from "../../Components/LandingComponents/CarouselPhotos/CarouselPhotos";
import Suggestions from "../../Components/LandingComponents/Suggestions/Suggestions";
import Buttons from "../../Components/LandingComponents/Buttons/Buttons";
import  Maps from "../../Components/LandingComponents/Maps/Maps"
import style from "./Landing.module.css";
import Loader from "../../Components/Loader/Loader";
import { useDispatch } from "react-redux";
import { getBanners } from "../../Redux/actions/actionBanners/getAllBanners";

function Landing() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getBanners());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);


  
  if(loading) 
  return ( <div style={{width: '100%', zIndex:'50', top: '0', left: '0', position: 'absolute', height: '100vh',backgroundColor: 'var(--background-darkblue)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <p><Loader /></p>
    </div>) 
  else return (
    <div className={style.landingContainer}>
      <Carousel />
      <Suggestions/>
      <Buttons/>
      <CarouselPhotos />
       <Maps /> 
    </div>
  );
}

export default Landing;
