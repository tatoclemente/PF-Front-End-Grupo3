import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect } from "react";

import ravioles from "./images/ravioles.jpg";
import agua from "./images/agua.png";
import cocacola from "./images/cocacola.png";
import sprite from "./images/sprite.jpg";
import tiramisu from "./images/tiramisu.jpg";
import alfajor from "./images/alfajor.jpg";
import ravioles2 from "./images/ravioles2.jpg";
import {getDrinks} from '../../Redux/actions/actionsDrinks/getAllDrinks'
import { useDispatch, useSelector} from "react-redux";
import styles from "./DetailPage.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

const Detail = ({ dishDetail }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const drinksImages = [
    { id: 1, url: agua, name: "Agua Mineral sin Gas", price: 1000 },
    { id: 2, url: cocacola, name: "Coca-Cola", price: 1200 },
    { id: 3, url: sprite, name: "Sprite", price: 1200 },
    { id: 4, url: agua, name: "Agua Mineral sin Gas", price: 1000 },
    { id: 5, url: cocacola, name: "Coca-Cola", price: 1200 },
    { id: 6, url: sprite, name: "Sprite", price: 1200 },
    { id: 7, url: cocacola, name: "Coca-Cola", price: 1200 },
    { id: 8, url: sprite, name: "Sprite", price: 1200 },
  ];

  const dessertsImages = [
    { id: 7, url: tiramisu, name: "Tiramisú", price: 2800 },
    { id: 8, url: alfajor, name: "Alfajor", price: 2500 },
    { id: 9, url: tiramisu, name: "Tiramisú", price: 2800 },
    { id: 10, url: alfajor, name: "Alfajor", price: 2500 },
    { id: 11, url: tiramisu, name: "Tiramisú", price: 2800 },
    { id: 12, url: alfajor, name: "Alfajor", price: 2500 },
    { id: 13, url: tiramisu, name: "Tiramisú", price: 2800 },
    { id: 14, url: alfajor, name: "Alfajor", price: 2500 },
  ];

  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks.drinks);

  useEffect(() => {
    dispatch(getDrinks());
  }, [dispatch, dishDetail]);

  console.log(drinks)

  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <h1 className={styles.name}>{dishDetail.name}</h1>
        <img
          src={ravioles}
          className={styles.mainImage}
          alt={dishDetail.name}
        />
        <div className={styles.additionalContainer}>
          <p className={styles.guarnicionTitle}>seleccione una guarnición</p>
          <div className={styles.guarnicionContainer}>
            <img
              src={ravioles2}
              className={styles.secondaryImage}
              alt="Otra imagen de Ravioles de Jamón y Queso"
            />
            <img
              src={ravioles2}
              className={styles.secondaryImage}
              alt="Otra imagen de Ravioles de Jamón y Queso"
            />
            <img
              src={ravioles2}
              className={styles.secondaryImage}
              alt="Otra imagen de Ravioles de Jamón y Queso"
            />
          </div>
        </div>
        <div className={styles.containerPrice}>
          <h2 className={styles.titles}>{`${dishDetail.price}`}</h2>
        </div>
      </div>

      <div className={styles.rightInfo}>
        <h2 className={styles.title}>
          ¿Con qué te gustaría acompañar tu orden?
        </h2>
        <h3 className={styles.subTitles}>Bebidas</h3>
        <div className={styles.containerInfo}>
            <Slider {...settings} className={styles.slideContainer}>
              {drinksImages.map((image, index) => (
                <div key={index} className={styles.imageWithInfo}>
                  <img
                    src={image.url}
                    alt={image.id}
                    className={styles.secondaryImage}
                  />
                  <h4 className={styles.secondaryNames}>{image.name}</h4>
                  <h5
                    className={styles.secondaryPrices}
                  >{`+ $${image.price}`}</h5>
                </div>
              ))}
            </Slider>
        </div>
        <h3 className={styles.subTitles}>Postres</h3>
        <div className={styles.containerInfo}>     
            <Slider {...settings} className={styles.slideContainer}>
              {dessertsImages.map((image) => (
                <div key={image.id} className={styles.imageWithInfo}>
                  <img
                    src={image.url}
                    alt={image.id}
                    className={styles.secondaryImage}
                  />
                  <h4 className={styles.secondaryNames}>{image.name}</h4>
                  <h5
                    className={styles.secondaryPrices}
                  >{`+ $${image.price}`}</h5>
                </div>
              ))}
            </Slider>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonAdd}
            onClick={() =>
              window.confirm(
                `Esta por agregar ${dishDetail.name} al carrito, es correcto?`
              )
            }
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
