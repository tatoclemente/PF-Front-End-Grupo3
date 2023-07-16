import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import banner from "./images/banner.png";
import banner2 from './images/banner2.png';
import banner3 from './images/banner3.png';
import banner4 from './images/banner4.png';

export const Carousel = () => {
  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const velocity = 3000; // Delay between image changes in milliseconds
    const playInterval = setInterval(nextImage, velocity); // Start the interval to automatically change images

    // Clean up the interval on component unmount
    return () => {
      clearInterval(playInterval);
    };
  }, [currentImageIndex]);

  // Update the active dot based on the current image index
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

  // Show the image at the specified index and update the active dot
  const showImage = (index) => {
    const images = document.getElementsByClassName(styles.image);
    for (let i = 0; i < images.length; i++) {
      if (images[i].className.includes(styles.current)) {
        images[i].className = images[i].className.replace(styles.current, '');
        break;
      }
    }
    setCurrentImageIndex(index);
    images[index].className += ` ${styles.current}`;
    updateActiveDot(index);
  };

  // Show the next image in the carousel
  const nextImage = () => {
    let next = currentImageIndex + 1;
    if (next === 4) {
      next = 0;
    }
    showImage(next);
  };

  // Show the previous image in the carousel
  // const prevImage = () => {
  //   let prev = currentImageIndex - 1;
  //   if (prev < 0) {
  //     prev = 3;
  //   }
  //   showImage(prev);
  // };

  return (
    <div className={styles.container}>
      {/* Carousel images */}
      <div className={`${styles.image} ${styles.current}`}>
        <img src={banner} alt="banner" />
      </div>
      <div className={styles.image}>
        <img src={banner2} alt="banner2" />
      </div>
      <div className={styles.image}>
        <img src={banner3} alt="banner3" />
      </div>
      <div className={styles.image}>
        <img src={banner4} alt="banner4" />
      </div>

      {/* Navigation buttons
      <a href="#" className={styles.previous} onClick={prevImage}>
        &#10094;
      </a>
      <a href="#" className={styles.next} onClick={nextImage}>
        &#10095;
      </a> */}

      {/* Image dots for navigation */}
      <div className={styles.dots}>
        <span className={`${styles.dot} ${styles.active}`} onClick={() => showImage(0)}></span>
        <span className={styles.dot} onClick={() => showImage(1)}></span>
        <span className={styles.dot} onClick={() => showImage(2)}></span>
        <span className={styles.dot} onClick={() => showImage(3)}></span>
      </div>
    </div>
  );
};
