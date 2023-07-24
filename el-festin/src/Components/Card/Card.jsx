import React, { useState } from 'react'
import style from './Card.module.css'

import { FaRegCreditCard } from 'react-icons/fa'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCartItemQuantity } from '../../Redux/slices/orderSlice'
import Swal from 'sweetalert2'

function Card({type, image, name, price, volume, rating, description, id, toggleCart}) {

  const dispatch = useDispatch();

  const drinks = useSelector((state) => state.drinks.drinks);
  const desserts = useSelector((state) => state.desserts.desserts);
  const order = useSelector((state) => state.cart);

  const drink = drinks.find((drink) => drink.id === id);
    const dessert = desserts.find((dessert) => dessert.id === id);
    const existingDrink = order.find((item) => item.drinks.some((d) => d.id === id));
    const existingDessert = order.find((item) => item.desserts.some((d) => d.id === id));

  const addToCartHandler = () => {

    if(order.length > 4) {
      Swal.fire({
        title:"Ups, Lo siento!",
        text: "Has alcanzado el máximo de 5 ordenes por compra.",
        icon: 'info'
      });
      return;
    }
    if (drink) {
      
      if (existingDrink && existingDrink.drinks[0].quantity > 4) {
        Swal.fire({
          title:"Ups, Lo siento!",
          text: "No puedes seleccionar más de 5 unidades de esta bebida.",
          icon: 'info'
        });
        return;
      } else if (existingDrink)  {
        dispatch(updateCartItemQuantity({ id, quantity: existingDrink.drinks[0].quantity + 1 }));
      } else {
        const item = {
          dish: null,
          garnish: null,
          drinks: [{ ...drink, quantity: 1 }],
          desserts: []
        };
        dispatch(addToCart(item));
      }
    } else if (dessert) {
     
      if (existingDessert &&existingDessert.desserts[0].quantity > 4) {
        Swal.fire({
          title:"Ups, Lo siento!",
          text: "No puedes seleccionar más de 5 unidades de este postre.",
          icon: 'info'
        });
        return;
      } else if (existingDessert)  {
        dispatch(updateCartItemQuantity({ id, quantity: existingDessert.desserts[0].quantity + 1 }));
      } else {
        const item = {
          dish: null,
          garnish: null,
          drinks: [],
          desserts: [{ ...dessert, quantity: 1 }]
        };
        dispatch(addToCart(item));

      }
    }
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: '¡Producto agregado al carrito con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
  };

  const showConfirmation = () => {

    // Obtener los nombres de los items seleccionados en la orden
    const selectedItemsNames = 
      drink? drink.name : dessert.name
    ;


    // console.log(confirmationMessage);
    // Mostrar la ventana de confirmación al usuario
    Swal.fire({
      title: 'Está agregando lo siguinete a la orden:',
      text: `1 ${selectedItemsNames}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Seguir comprando',
      denyButtonText: `Ir a pagar`,
      denyButtonColor: 'var(--main-color)',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        addToCartHandler(); // Llamada a la función para agregar al carrito
  
      } else if (result.isDenied) {
        addToCartHandler();
         // Llamada a la función para agregar al carrito

          toggleCart()
        }
    })

    // if (window.confirm(confirmationMessage)) {
    //   addToCartHandler(); // Llamada a la función para agregar al carrito
    // }
  };
  
  

  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= selectedStars ? (
        <AiTwotoneStar key={i} className={style.ratingIcon} onClick={() => handleStarClick(i)} />
      ) : (
        <AiOutlineStar key={i} className={style.ratingIcon} onClick={() => handleStarClick(i)} />
      );
      stars.push(starIcon);
    }
    return stars;
  };

  return (
    <div className={style.cardContainer}>
      <p className={style.type}>{type? type : 'N/A'}</p>
      <div className={style.cardContent}>
        <div className={style.rating}>{renderStars()}</div> 
        
        <img className={style.imageCard} src={image} alt={name} />
        <div className={style.cardInfo}>
          <h6 className={style.name}>{name}</h6>
          <p className={style.description}>{description || volume}</p>
          <p className={style.payInfo}><span className={style.payIcon}>{<FaRegCreditCard />}</span> Aceptamos todas las tarjetas</p>
        </div>
      </div>
      <span className={style.price}>${price}</span>
      {type === 'plato principal' || type === 'entrada' 
      ? <Link to={`/detail/${id}`} className={style.link}>
          Ver detalle
        </Link>
        : <button className={style.buttonAddCart} onClick={showConfirmation}>
          Agregar a la orden
        </button>
      }
      
    </div>
  )
}

export default Card