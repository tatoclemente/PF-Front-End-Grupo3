import React from "react";
import { Carousel } from "../../Components/Carousel/Carousel";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.landingContainer}>
      <Carousel />
    </div>
  );
}

export default Landing;
