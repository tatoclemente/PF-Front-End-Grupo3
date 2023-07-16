import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselPhotos.module.css';
import rest1 from "./images/rest1.jpg"
import rest2 from "./images/rest2.jpg"
import rest3 from "./images/rest3.jpg"
import rest4 from "./images/rest4.jpg"

function SampleNextArrow(props) {

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", textShadow: '1px 1px 5px var(--shadow)' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", textShadow: '1px 1px 5px var(--shadow)' }}
      onClick={onClick}
    />
  );
}

const CarouselPhotos = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const images = [
    { id: 1, url: rest1},
    { id: 3, url: rest2 },
    { id: 4, url: rest3 },
    { id: 5, url: rest4}
  ];

  return (
    <div>
      <h2 className={styles.title}>GALERIA DE FOTOS</h2>
    <div className={styles.carousel}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className={styles.slide}>
            <img src={image.url} alt={image.id} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default CarouselPhotos;

