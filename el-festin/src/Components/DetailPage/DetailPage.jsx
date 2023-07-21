import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailPage.module.css";
// import { sides } from "../../utils/mock";
import { getDesserts } from "../../Redux/actions/actionsDesserts/getAllDesserts";
import { getSides } from "../../Redux/actions/actiossSides/getAllSides";
import { addToCart } from "../../Redux/slices/orderSlice";

const Detail = ({ dishDetail }) => {
  const dispatch = useDispatch();
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const desserts = useSelector((state) => state.desserts.desserts);
  const sides = useSelector((state) => state.sides.sides);

  useEffect(() => {
    dispatch(getDrinks());
    dispatch(getDesserts());
    dispatch(getSides());
  }, [dispatch]);

  // Estado local para la orden seleccionada
  // const [order, setOrder] = useState({
  //   dish: dishDetail,
  //   garnish: null,
  //   drinks: [],
  //   desserts: [],
  // });

  // Estado local para la orden seleccionada
  const [order, setOrder] = useState({
    dish: dishDetail,
    garnish: null,
    drinks: [],
    desserts: [],
  });


  // Funciones para actualizar el estado local de la orden
  const selectGarnish = (selectedGarnish) => {
    setOrder((prevOrder) => ({ ...prevOrder, garnish: selectedGarnish }));
  };

   // Nueva función para obtener la cantidad total de bebidas y postres seleccionados
   const getTotalItems = () => {
    const totalDrinks = order.drinks.reduce((total, drink) => total + drink.cantidad, 0);
    const totalDesserts = order.desserts.reduce((total, dessert) => total + dessert.cantidad, 0);
    return totalDrinks + totalDesserts;
  };

  // Función para obtener la cantidad total de bebidas seleccionadas
const getTotalDrinks = () => {
  return order.drinks.reduce((total, drink) => total + drink.cantidad, 0);
};

// Función para obtener la cantidad total de postres seleccionados
const getTotalDesserts = () => {
  return order.desserts.reduce((total, dessert) => total + dessert.cantidad, 0);
};

  
  // Función para obtener la cantidad total de bebidas seleccionadas
  const selectDrink = (selectedDrink) => {

    const totalItemsDrink = getTotalDrinks() 

    if (totalItemsDrink >= 2) {
      alert('No puedes seleccionar más de dos bebidas en total.');
      return;
    }


    const existingDrink = order.drinks.find((drink) => drink.id === selectedDrink.id);
  
    if (existingDrink) {
      if (existingDrink.cantidad === 2) {
        alert('No puedes seleccionar más de dos unidades de esta bebida.');
        return;
      }
      
  
      setOrder((prevOrder) => ({
        ...prevOrder,
        drinks: prevOrder.drinks.map((drink) =>
          drink.id === selectedDrink.id
            ? { ...drink, cantidad: drink.cantidad + 1 }
            : drink
        ),
      }));
    } else {
      if (getTotalDrinks() < 2) {
        const updatedDrink = { ...selectedDrink, cantidad: 1 };
        setOrder((prevOrder) => ({
          ...prevOrder,
          drinks: [...prevOrder.drinks, updatedDrink],
        }));
      } else {
        alert("No puedes seleccionar más de dos bebidas.");
      }
    }
  };
  
  const selectDessert = (selectedDessert) => {

    const totalItemsDesserts = getTotalDesserts() 
    if (totalItemsDesserts >= 2) {
      alert('No puedes seleccionar más de dos postres en total.');
      return;
    }

    const existingDessert = order.desserts.find((dessert) => dessert.id === selectedDessert.id);
  
    if (existingDessert) {
      if (existingDessert.cantidad === 2) {
        alert('No puedes seleccionar más de dos unidades de este postre.');
        return;
      }
  
      setOrder((prevOrder) => ({
        ...prevOrder,
        desserts: prevOrder.desserts.map((dessert) =>
          dessert.id === selectedDessert.id ? { ...dessert, cantidad: dessert.cantidad + 1 } : dessert
        ),
      }));
    } else {
      if (getTotalDesserts() < 2) {
        const updatedDessert = { ...selectedDessert, cantidad: 1 };
        setOrder((prevOrder) => ({
          ...prevOrder,
          desserts: [...prevOrder.desserts, updatedDessert],
        }));
      } else {
        alert("No puedes seleccionar más de dos postres.");
      }
    }
  };
  

  
  
  

  const drinkTotalPrice = order.drinks.reduce(
    (total, drink) => total + (drink.price || 0) * drink.cantidad,
    0
  );

  const dessertTotalPrice = order.desserts.reduce(
    (total, dessert) => total + (dessert.price || 0) * dessert.cantidad,
    0
  );

  const price =
    +dishDetail.price +
    +(order.garnish?.price || 0) +
    drinkTotalPrice +
    dessertTotalPrice;

    const increaseQuantity = (item) => {
      const totalItemsDrink = getTotalDrinks() 
      const totalItemsDesserts = getTotalDesserts() 

    
      // Verificar si ya se han seleccionado 4 elementos en total
      if (totalItemsDrink >= 2) {
        alert('No puedes seleccionar más de dos bebidas en total.');
        return;
      }

      if (totalItemsDesserts >= 2) {
        alert('No puedes seleccionar más de dos postres en total.');
        return;
      }
    
      // Verificar si ya se ha seleccionado el mismo elemento 2 veces
      if (item.cantidad === 2) {
        alert('No puedes seleccionar más de dos unidades de este elemento.');
        return;
      }
    
      if (item.type === 'bebida' && getTotalDrinks() >= 2) {
        alert('No puedes seleccionar más de dos bebidas.');
        return;
      }
    
      if (item.type === 'postre' && getTotalDesserts() >= 2) {
        alert('No puedes seleccionar más de dos postres.');
        return;
      }
    
      // Incrementar la cantidad del elemento seleccionado
      setOrder((prevOrder) => ({
        ...prevOrder,
        drinks: prevOrder.drinks.map((drink) =>
          drink.id === item.id ? { ...drink, cantidad: drink.cantidad + 1 } : drink
        ),
        desserts: prevOrder.desserts.map((dessert) =>
          dessert.id === item.id ? { ...dessert, cantidad: dessert.cantidad + 1 } : dessert
        ),
      }));
    };
    
    const decreaseQuantity = (item) => {
      setOrder((prevOrder) => ({
        ...prevOrder,
        drinks: prevOrder.drinks.map((drink) =>
          drink.id === item.id && drink.cantidad > 0
            ? { ...drink, cantidad: drink.cantidad - 1 }
            : drink
        ),
        desserts: prevOrder.desserts.map((dessert) =>
          dessert.id === item.id && dessert.cantidad > 0
            ? { ...dessert, cantidad: dessert.cantidad - 1 }
            : dessert
        ),
      }));
    };
    
    
    

    const addToCartHandler = () => {
      // Verificar si la cantidad total de bebidas y postres seleccionados es igual a 4
      if (order.drinkCount + order.dessertCount === 4) {
        // Realizar un dispatch para agregar la orden al carrito global
        dispatch(addToCart(order));
        // Limpiar el estado local de la orden después de agregarla al carrito
        setOrder({
          dish: dishDetail,
          garnish: null,
          drinks: [],
          desserts: [],
          drinkCount: 0,
          dessertCount: 0,
        });
        // Opcional: Mostrar una notificación o mensaje de éxito al usuario
        alert("¡Producto agregado al carrito con éxito!");
      } else {
        alert("Debes seleccionar dos bebidas y dos postres para agregar al carrito.");
      }
    };
    

  const pastaGarnish = sides.filter((side) => side.type === "salsa");

  const resGarnish = sides.filter((side) => side.type === "acompañamiento");

  const papas = {
    ...sides.find((side) => side.name.toLowerCase() === "papa fritas"),
  };
  const batatas = {
    ...sides.find((side) => side.name.toLowerCase() === "batatas fritas"),
  };

  const sandwichGarnish = [papas, batatas].filter((side) => side !== null);

  const garnish =
    dishDetail.subtype === "pastas"
      ? pastaGarnish
      : dishDetail.subtype === "carnes" ||
        dishDetail.subtype === "pescados y mariscos"
      ? resGarnish
      : dishDetail.subtype === "sandwich"
      ? sandwichGarnish
      : [];

  // Filtrar los elementos con cantidad mayor a 0 antes de mostrarlos en el Slider
  const selectedDrinks = order.drinks.filter((drink) => drink.cantidad > 0);
  const selectedDesserts = order.desserts.filter(
    (dessert) => dessert.cantidad > 0
  );

  const combinedItems = [
    ...(order.garnish ? [order.garnish] : []), // Agrega la guarnición si existe
    ...selectedDrinks, // Agrega las bebidas seleccionadas
    ...selectedDesserts, // Agrega los postres seleccionados
  ];

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

  const length = garnish.length === 1 ? 1 : garnish.length === 2 ? 2 : 3;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settingsSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Obtiene el valor mínimo entre 3 y la cantidad de elementos seleccionados en total
  const lengthSelected = combinedItems.length > 3 ? 3 : combinedItems.length;

  const settingsSlide3 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: lengthSelected,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
            {garnish.length > 0 ? (
              <Slider {...settingsSlide}>
                {garnish.map((side, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.guarnicionContainer}
                      onClick={() => selectGarnish(side)}
                    >
                      <img
                        src={side.image}
                        className={styles.secondaryImage}
                        alt={side.name}
                      />
                      <div className={styles.guanicionNameContainer}>
                        <span className={styles.guarnicionName}>
                          {side.name}
                        </span>
                      </div>
                      <h5
                        className={styles.secondaryPrices}
                      >{`+ $${side.price}`}</h5>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <p>No hay guarniciones para este plato.</p>
            )}
          </div>
        </div>
        <div className={styles.additionalContainer}>
          <div className={styles.selectedAdditionalContainer}>
            <Slider {...settingsSlide3}>
              {combinedItems.map((item, index) => (
                <div key={index} className={styles.selectedAdditional}>
                  <span className={styles.selectedAdditionalName}>
                    {order.garnish === item
                      ? "Guarnición:"
                      : order.drinks.includes(item)
                      ? "Bebida:"
                      : order.desserts.includes(item)
                      ? "Postre:"
                      : ""}
                  </span>{" "}
                  <div className={styles.selectedAdditionalContent}>
                    <img
                      src={item.image}
                      className={styles.selectedAdditionalImage}
                      alt={item.name}
                    />
                    <div className={styles.additionalNameContainer}>
                      <span className={styles.additionalName}>{item.name}</span>
                      {order.garnish !== item && ( // Evita renderizar los botones para guarniciones
                        <div className={styles.quantityButtonsContainer}>
                          <button
                            className={styles.quantityButton}
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button
                            className={styles.quantityButton}
                            onClick={() => increaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className={styles.rightInfo}>
        <h2 className={styles.title}>
          ¿Con qué te gustaría acompañar tu orden?
        </h2>
        <h3 className={styles.subTitles}>Bebidas</h3>
        <div className={styles.containerInfo}>
          <Slider {...settings} className={styles.slideContainer}>
            {allDrinks?.map((drink, index) => {
              const capitalizedString = capitalizeFirstLetter(drink.name);

              return (
                <div
                  key={index}
                  className={styles.imageWithInfo}
                  onClick={() => selectDrink(drink)}
                >
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
              );
            })}
          </Slider>
        </div>
        <h3 className={styles.subTitles}>Postres</h3>
        <div className={styles.containerInfo}>
          <Slider {...settings} className={styles.slideContainer}>
            {desserts.map((dessert, index) => {
              const capitalizedString = capitalizeFirstLetter(dessert.name);
              return (
                <div
                  key={index}
                  className={styles.imageWithInfo}
                  onClick={() => selectDessert(dessert)}
                >
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
              );
            })}
          </Slider>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.containerPrice}>
            <h2 className={styles.titles}>{`Suma total: $ ${price}`}</h2>
          </div>
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
