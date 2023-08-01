import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from '../../../Redux/actions/actionBanners/getAllBanners'; 
import styles from './Carousel.module.css';

export const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allBanners = useSelector((state) => state.banner.banners);
  const dispatch = useDispatch();
  const imageList = allBanners.length > 0 && allBanners.filter((b) => b.disabled === false);
  const totalImages = imageList.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    const velocity = 3000;
    intervalRef.current = setInterval(nextImage, velocity);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentImageIndex]);

  const updateActiveDot = (index) => {
    const dots = document.getElementsByClassName(styles.dot);
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].className.includes(styles.active)) {
        dots[i].className = dots[i].className.replace(styles.active, '');
        break;
      }
    }
    dots[index].className += ` ${styles.active}`;
  };

  const showImage = (index) => {
    const images = document.getElementsByClassName(styles.image);
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].className.includes(styles.current)) {
          images[i].className = images[i].className.replace(styles.current, '');
          break;
        }
      }
      setCurrentImageIndex(index);
      images[index].className += ` ${styles.current}`;
      updateActiveDot(index);
    }
  };

  const nextImage = () => {
    let next = currentImageIndex + 1;
    if (next === totalImages) {
      next = 0;
    }
    showImage(next);
  };

  const prevImage = () => {
    let prev = currentImageIndex - 1;
    if (prev < 0) {
      prev = totalImages - 1;
    }
    showImage(prev);
  };

  return (
    <div className={styles.container}>
      {imageList.length > 0 && imageList.map((banner, index) => (
        <div key={index} className={`${styles.image} ${currentImageIndex === index ? styles.current : ''}`}>
          <img src={banner.image} alt={banner.name} />
        </div>
      ))}

      {/* Navigation buttons */}
      <a href="#" className={styles.previous} onClick={prevImage}>
        &#10094;
      </a>
      <a href="#" className={styles.next} onClick={nextImage}>
        &#10095;
      </a>

      {/* Image dots for navigation */}
      <div className={styles.dots}>
        {imageList.length > 0 && imageList.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentImageIndex === index ? styles.active : ''}`}
            onClick={() => showImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};