import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CarouselPhotos.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocal } from '../../../Redux/actions/actionsLocal/getAllLocal';

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

  const allPhotos = useSelector((state) => state.local.locals);
  const dispatch = useDispatch();

  const imageList = allPhotos.filter((p) => p.disabled === false);

  useEffect(() => {
    dispatch(getLocal());
  }, [dispatch]);

 const numImagesToShow = imageList.length > 2 ? 3 : imageList.length;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numImagesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <div>
      <h2 className={styles.title}>GALERIA DE FOTOS</h2>
    <div className={styles.carousel}>
      <Slider {...settings}>
        {imageList.map((image) => (
          <div key={image.id} className={styles.slide}>
            <img src={image.image} alt={image.id} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default CarouselPhotos;

