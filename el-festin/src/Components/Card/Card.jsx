import React from 'react'
import style from './Card.module.css'

import { FaRegCreditCard } from 'react-icons/fa'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

function Card({type, image, name, price, rating, description, id, addToCart}) {

  return (
    <div className={style.cardContainer}>
      <p className={style.type}>{type}</p>
      <div className={style.cardContent}>
        {rating? <div className={style.rating}><AiTwotoneStar className={style.ratingIcon} /><span className={style.ratingText}>{rating}</span></div>:<div className={style.rating}><AiOutlineStar className={style.ratingIcon} /><AiOutlineStar className={style.ratingIcon} /><AiOutlineStar className={style.ratingIcon} /><AiOutlineStar className={style.ratingIcon} /><AiOutlineStar className={style.ratingIcon} /></div> }
        
        <img className={style.imageCard} src={image} alt={name} />
        <div className={style.cardInfo}>
          <h6 className={style.name}>{name}</h6>
          <p className={style.description}>{description}</p>
          <p className={style.payInfo}><span className={style.payIcon}>{<FaRegCreditCard />}</span> Aceptamos todas las tarjetas</p>
        </div>
      </div>
      <span className={style.price}>${price}</span>
      <button className={style.button} onClick={addToCart}>Agregar a la orden</button>
    </div>
  )
}

export default Card