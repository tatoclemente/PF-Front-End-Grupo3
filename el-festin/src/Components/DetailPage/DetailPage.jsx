import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import swal from 'sweetalert2';

import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'

import styles from "./DetailPage.module.css";
// import { sides } from "../../utils/mock";
import { getDesserts } from "../../Redux/actions/actionsDesserts/getAllDesserts";
import { getSides } from "../../Redux/actions/actiossSides/getAllSides";
import { addToCart } from "../../Redux/actions/actionOrders/actionOrders";
import capitalizeFirstLetter from "../../functions/capitalizeFirstLetter";
import { FaArrowLeft } from "react-icons/fa";

const Detail = ({ dishDetail, toggleCart }) => {
  const dispatch = useDispatch();
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const desserts = useSelector((state) => state.desserts.desserts);
  const sides = useSelector((state) => state.sides.sides);
  const orderCart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getDrinks());
    dispatch(getDesserts());
    dispatch(getSides());
  }, [dispatch]);

  const Navigate = useNavigate()

  // Estado local para la orden seleccionada
  const [order, setOrder] = useState({
    dish: {
      ...dishDetail,
      quantity: dishDetail.quantity || 1,
    },
    garnish: null,
    drinks: [],
    desserts: [],
  });

  // Funciones para actualizar el estado local de la orden
  const selectGarnish = (selectedGarnish) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      garnish: { ...selectedGarnish, quantity: 1 }, // Establecer cantidad en 1 para la guarnición seleccionada
    }));
  };

  const removeGarnish = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      garnish: null,
    }));
  };

  // Función para obtener la cantidad total de bebidas seleccionadas
  const getTotalDrinks = () => {
    return order.drinks.reduce((total, drink) => total + drink.quantity, 0);
  };

  // Función para obtener la cantidad total de postres seleccionados
  const getTotalDesserts = () => {
    return order.desserts.reduce(
      (total, dessert) => total + dessert.quantity,
      0
    );
  };

  // Función para obtener la cantidad total de bebidas seleccionadas
  const selectDrink = (selectedDrink) => {
    const totalItemsDrink = getTotalDrinks();

    if (totalItemsDrink >= 2) {
      swal.fire({
        title: "Ups, Lo siento!",
        text: "No puedes seleccionar más de dos bebidas en total.",
        icon: 'info'
      });
      return;
    }

    const existingDrink = order.drinks.find(
      (drink) => drink.id === selectedDrink.id
    );

    if (existingDrink) {
      if (existingDrink.quantity === 2) {
        swal.fire({
          title: "Ups, Lo siento!",
          text: "No puedes seleccionar más de dos unidades de esta bebida.",
          icon: 'info'
        });
        return;
      }

      setOrder((prevOrder) => ({
        ...prevOrder,
        drinks: prevOrder.drinks.map((drink) =>
          drink.id === selectedDrink.id
            ? { ...drink, quantity: drink.quantity + 1 }
            : drink
        ),
      }));
    } else {
      if (getTotalDrinks() < 2) {
        const updatedDrink = { ...selectedDrink, quantity: 1 };
        setOrder((prevOrder) => ({
          ...prevOrder,
          drinks: [...prevOrder.drinks, updatedDrink],
        }));
      } else {
        swal.fire({
          title: "Ups, Lo siento!",
          text: " No puedes seleccionar más de dos bebidas.",
          icon: 'info'
        });
      }
    }
  };

  const selectDessert = (selectedDessert) => {
    const totalItemsDesserts = getTotalDesserts();
    if (totalItemsDesserts >= 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos postres en total.',
        icon: 'info'
      })
      return;
    }

    const existingDessert = order.desserts.find(
      (dessert) => dessert.id === selectedDessert.id
    );

    if (existingDessert) {
      if (existingDessert.quantity === 2) {
        swal.fire({
          title: 'Ups, Lo siento!',
          text: 'No puedes seleccionar más de dos unidades de este postre.',
          icon: 'info'
        })
        return;
      }

      setOrder((prevOrder) => ({
        ...prevOrder,
        desserts: prevOrder.desserts.map((dessert) =>
          dessert.id === selectedDessert.id
            ? { ...dessert, quantity: dessert.quantity + 1 }
            : dessert
        ),
      }));
    } else {
      if (getTotalDesserts() < 2) {
        const updatedDessert = { ...selectedDessert, quantity: 1 };
        setOrder((prevOrder) => ({
          ...prevOrder,
          desserts: [...prevOrder.desserts, updatedDessert],
        }));
      } else {
        swal.fire({
          title: 'Ups, Lo siento!',
          text: 'No puedes seleccionar más de dos postres.',
          icon: 'info'
        })
      }
    }
  };

  const drinkTotalPrice = order.drinks.reduce(
    (total, drink) => total + (drink.price || 0) * drink.quantity,
    0
  );

  const dessertTotalPrice = order.desserts.reduce(
    (total, dessert) => total + (dessert.price || 0) * dessert.quantity,
    0
  );

  const price =
    +dishDetail.price +
    +(order.garnish?.price || 0) +
    drinkTotalPrice +
    dessertTotalPrice;

  const increaseDrinksQuantity = (item) => {
    const totalItemsDrink = getTotalDrinks();
    // const totalItemsDesserts = getTotalDesserts()

    // Verificar si ya se ha seleccionado el mismo elemento 2 veces
    if (item.cantidad === 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos unidades de este elemento.',
        icon: 'info'
      })
      return;
    }

    // Verificar si ya se han seleccionado 2 elementos en total
    if (totalItemsDrink >= 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos bebidas en total.',
        icon: 'info'
      })
      return;
    }

    if (item.type === "bebida" && getTotalDrinks() >= 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos bebidas.',
        icon: 'info'
      })
      alert("");
      return;
    }

    // Incrementar la cantidad del elemento seleccionado
    setOrder((prevOrder) => ({
      ...prevOrder,
      drinks: prevOrder.drinks.map((drink) =>
        drink.id === item.id
          ? { ...drink, quantity: drink.quantity + 1 }
          : drink
      ),
    }));
  };

  const increaseDessertsQuantity = (item) => {
    const totalItemsDesserts = getTotalDesserts();

    // Verificar si ya se ha seleccionado el mismo elemento 2 veces
    if (item.quantity === 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos unidades de este elemento.',
        icon: 'info'
      })
      return;
    }

    if (totalItemsDesserts >= 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos postres en total.',
      })
      return;
    }

    if (item.type === "postre" && getTotalDesserts() >= 2) {
      swal.fire({
        title: 'Ups, Lo siento!',
        text: 'No puedes seleccionar más de dos postres.',
        icon: 'info'
      })
      return;
    }

    // Incrementar la cantidad del elemento seleccionado
    setOrder((prevOrder) => ({
      ...prevOrder,
      desserts: prevOrder.desserts.map((dessert) =>
        dessert.id === item.id
          ? { ...dessert, quantity: dessert.quantity + 1 }
          : dessert
      ),
    }));
  };

  const decreaseQuantity = (item) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      drinks: prevOrder.drinks
        .map((drink) =>
          drink.id === item.id && drink.quantity > 0
            ? { ...drink, quantity: drink.quantity - 1 }
            : drink
        )
        .filter((drink) => drink.quantity > 0), // Elimina los elementos con cantidad 0
      desserts: prevOrder.desserts
        .map((dessert) =>
          dessert.id === item.id && dessert.quantity > 0
            ? { ...dessert, quantity: dessert.quantity - 1 }
            : dessert
        )
        .filter((dessert) => dessert.quantity > 0), // Elimina los elementos con cantidad 0
    }));
  };

  const pastaGarnish = Array.isArray(sides) && sides.filter((side) => side.type === "salsa");

  const resGarnish = Array.isArray(sides) && sides.filter((side) => side.type === "acompañamiento");

  let papas = []
  let batatas = []
  if (pastaGarnish || resGarnish) {
    papas = {
      ...sides.find((side) => side.name.toLowerCase() === "papa fritas"),
    };
    batatas = {
      ...sides.find((side) => side.name.toLowerCase() === "batatas fritas"),
    };
  }

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
  const selectedDrinks = order.drinks.filter((drink) => drink.quantity > 0);
  const selectedDesserts = order.desserts.filter(
    (dessert) => dessert.quantity > 0
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


  const lengthDesserts = desserts.length < 6 ? desserts.length : 6; 
  console.log(lengthDesserts);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: lengthDesserts,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const lengthDrinks = allDrinks.length < 6 ? allDrinks.length : 6;
  const settingsDrinks = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: lengthDrinks,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const lengthGarnish = garnish.length === 1 ? 1 : garnish.length === 2 ? 2 : 3;

  const settingsSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: lengthGarnish,
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



  const typeAdditional = (item) =>
    order.garnish === item
      ? "Guarnición:"
      : order.drinks.includes(item)
        ? "Bebida:"
        : order.desserts.includes(item)
          ? "Postre:"
          : "";

  //DISPATCH DE LA ORDEN AL ESTADO GLOBAL

  const addToCartHandler = () => {

    if (orderCart.length > 4) {
      swal.fire({
        title: "Ups, Lo siento!",
        text: "Has alcanzado el máximo de 5 ordenes por compra.",
        icon: 'info'
      });
      return;
    }

    // Verificar si hay al menos un artículo seleccionado (guarnición, bebida o postre)
    if (order.dish || order.garnish || order.drinks.length > 0 || order.desserts.length > 0) {
      // Realizar un dispatch para agregar la orden al carrito global
      dispatch(addToCart(order));
      // Limpiar el estado local de la orden después de agregarla al carrito
      setOrder({
        dish: dishDetail,
        garnish: null,
        drinks: [],
        desserts: [],
      });
      // Opcional: Mostrar una notificación o mensaje de éxito al usuario
      swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: '¡Producto agregado al carrito con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  // Función para mostrar la confirmación con los nombres de los items seleccionados
  const showConfirmation = () => {
    const dishQuantity = order.dish.quantity ? order.dish.quantity : 1;
    // Obtener los nombres de los items seleccionados en la orden
    const selectedItemsNames = [
      order.garnish
        ? [`${dishQuantity} ${order.dish.name} con ${order.garnish.name}`]
        : [`${dishQuantity} ${order.dish.name}`],
      // ...(order.garnish ? [order.garnish.name] : []), // Agrega el nombre de la guarnición si existe
      ...order.drinks.map((drink) => `${drink.quantity} ${drink.name}`), // Agrega los nombres de las bebidas seleccionadas
      ...order.desserts.map((dessert) => `${dessert.quantity} ${dessert.name}`), // Agrega los nombres de los postres seleccionados
    ];

    // Construir el mensaje de confirmación
    const confirmationMessage = `${selectedItemsNames.join(
      ", "
    )}`;


    // console.log(confirmationMessage);
    // Mostrar la ventana de confirmación al usuario
    swal.fire({
      title: 'Está agregando lo siguinete a la orden:',
      text: confirmationMessage,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Seguir comprando',
      denyButtonText: `Ir a pagar`,
      denyButtonColor: 'var(--main-color)',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        addToCartHandler(); // Llamada a la función para agregar al carrito
        Navigate('/home')
      } else if (result.isDenied) {
        addToCartHandler(); // Llamada a la función para agregar al carrito
        toggleCart()
        Navigate('/home')
      }
    })

    // if (window.confirm(confirmationMessage)) {
    //   addToCartHandler(); // Llamada a la función para agregar al carrito
    // }
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
                    {typeAdditional(item)}
                  </span>{" "}
                  <div className={styles.selectedAdditionalContent}>
                    <img
                      src={item.image}
                      className={styles.selectedAdditionalImage}
                      alt={item.name}
                    />
                    <div className={styles.additionalNameContainer}>
                      <span className={styles.additionalName}>{item.name}</span>
                      {order.garnish !== item ? ( // Evita renderizar los botones para guarniciones
                        <div className={styles.quantityButtonsContainer}>
                          <button
                            className={styles.quantityButton}
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className={styles.quantityButton}
                            onClick={
                              typeAdditional(item) === "Bebida:"
                                ? () => increaseDrinksQuantity(item)
                                : () => increaseDessertsQuantity(item)
                            }
                          >
                            +
                          </button>
                        </div>
                      )
                        : ( // Botón para eliminar la selección de la guarnición
                          <div className={styles.removeButtonContainer}>
                            <button
                              className={styles.removeGarnishButton}
                              onClick={removeGarnish}
                            >
                              Eliminar
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
        <Link className={styles.backButton} to='/home'>
          <button className={styles.buttonStyle}><span><FaArrowLeft /></span> Volver atras</button>
        </Link>
        <h2 className={styles.title}>
          ¿Con qué te gustaría acompañar tu orden?
        </h2>
        <h3 className={styles.subTitles}>Bebidas</h3>
        <div className={styles.containerInfo}>
          <Slider {...settingsDrinks} className={styles.slideContainer}>
            {Array.isArray(allDrinks) && allDrinks?.map((drink, index) => {
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
            {Array.isArray(desserts) &&desserts.map((dessert, index) => {
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
            <h2 className={styles.titles}>Suma total: <b>${price}</b></h2>
          </div>
          <button className={styles.buttonAdd} onClick={showConfirmation}>
            agregar a orden
          </button>
        </div>
      </div>
    </div>
  );
};
export default Detail;
