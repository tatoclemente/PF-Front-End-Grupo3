import React from "react";
import { Carousel } from "../../Components/LandingComponents/Carousel/Carousel";
import CarouselPhotos from "../../Components/LandingComponents/CarouselPhotos/CarouselPhotos";
import Suggestions from "../../Components/LandingComponents/Suggestions/Suggestions";
import Buttons from "../../Components/LandingComponents/Buttons/Buttons";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.landingContainer}>
      <Carousel />
      <Suggestions/>
      <Buttons/>
      <CarouselPhotos />
    </div>
  );
}

export default Landing;
