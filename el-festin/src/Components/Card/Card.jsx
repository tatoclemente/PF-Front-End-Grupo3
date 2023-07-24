import React, { useState } from 'react'
import style from './Card.module.css'

import { FaRegCreditCard } from 'react-icons/fa'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Button } from 'bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart2 } from '../../Redux/actions/actionOrders/actionOrders'
import { addToCart } from '../../Redux/slices/orderSlice'

function Card({type, image, name, price, volume, rating, description, id}) {

  const dispatch = useDispatch();

  const drinks = useSelector((state) => state.drinks.drinks);
  const desserts = useSelector((state) => state.desserts.desserts);

  const addToCartHandler = () => {
    const drink = drinks.find((drink) => drink.id === id);
    const dessert = desserts.find((dessert) => dessert.id === id);

    const item = drink ? {
      dish: null,
      garnish: null,
      drinks:[{...drink, quantity: 1}],
      desserts: []
    } : {
      dish: null,
      garnish: null,
      drinks:[],
      desserts:[{...dessert, quantity: 1}]
    }; 

    dispatch(addToCart(item))
  }


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
        : <button className={style.butonAddCart} onClick={addToCartHandler}>
          Agregar a la orden
        </button>
      }
      
    </div>
  )
}

export default Card