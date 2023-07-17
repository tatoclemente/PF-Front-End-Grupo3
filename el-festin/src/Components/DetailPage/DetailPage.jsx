
import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




import ravioles2 from "./images/ravioles2.jpg";
import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailPage.module.css";
import { sides } from "../../utils/mock";
import { getDesserts } from "../../Redux/actions/actionsDesserts/getAllDesserts";

const Detail = ({ dishDetail }) => {


  const pastaGarnish = sides.filter((side) => side.type === "salsas");

  const resGarnish = sides.filter((side) => side.type === "acompañamientos");

  const sandwichGarnish = sides.filter((side) => side.name === "papas fritas");

  const garnish =
    dishDetail.subtype === "pastas"
      ? pastaGarnish
      : dishDetail.subtype === "carnes"
      ? resGarnish
      : dishDetail.subtype === "sandwich"
      ? sandwichGarnish
      : [];

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };



  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks.drinks);
  const desserts = useSelector((state) => state.desserts.desserts);

  useEffect(() => {
    dispatch(getDrinks());
    dispatch(getDesserts())
  }, [dispatch, dishDetail]);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <h1 className={styles.name}>{dishDetail.name}</h1>
        <img
          src={dishDetail.image}
          className={styles.mainImage}
          alt={dishDetail.name}
        />
        <div className={styles.additionalContainer}>
          <p className={styles.guarnicionTitle}>seleccione una guarnición</p>
          <div className={styles.guarnicionContent}>
            {garnish.map((side, index) => {
              return (
                <div className={styles.guarnicionContainer} key={index}>
                  <img
                    src={ravioles2}
                    className={styles.secondaryImage}
                    alt="Otra imagen de Ravioles de Jamón y Queso"
                  />
                  <div className={styles.guanicionNameContainer}>
                    <span className={styles.guarnicionName}>{side.name}</span>
                  </div>
                  <h5
                    className={styles.secondaryPrices}
                  >{`$ ${side.price}`}</h5>
                </div>
              );
            })}
          </div>
        </div>

    
        <div className={styles.containerPrice}>

          <h2
            className={styles.titles}
          >{`Suma total: $ ${dishDetail.price}`}</h2>

        </div>
      </div>

      <div className={styles.rightInfo}>
        <h2 className={styles.title}>
          ¿Con qué te gustaría acompañar tu orden?
        </h2>
        <h3 className={styles.subTitles}>Bebidas</h3>
        <div className={styles.containerInfo}>
          <Slider {...settings} className={styles.slideContainer}>
            {drinks?.map((drink, index) => {
              const capitalizedString = capitalizeFirstLetter(drink.name);

              return (
           
              <div key={index} className={styles.imageWithInfo}>
                <img
                  src={drink.image}
                  alt={drink.name}
                  className={styles.secondaryImage}
                />
                <h4 className={styles.secondaryNames}>{capitalizedString}</h4>
                <h5
                  className={styles.secondaryPrices}
                >{`+ $${drink.price}`}</h5>
              </div>
            )})}
          </Slider>
        </div>
        <h3 className={styles.subTitles}>Postres</h3>
        <div className={styles.containerInfo}>
          <Slider {...settings} className={styles.slideContainer}>
            {desserts.map((dessert, index) => {
              const capitalizedString = capitalizeFirstLetter(dessert.name);
              return (
              <div key={index} className={styles.imageWithInfo}>
                <img
                  src={dessert.image}
                  alt={dessert.name}
                  className={styles.secondaryImage}
                />
                <h4 className={styles.secondaryNames}>{capitalizedString}</h4>
                <h5
                  className={styles.secondaryPrices}
                >{`+ $${dessert.price}`}</h5>
              </div>
            )})}
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
