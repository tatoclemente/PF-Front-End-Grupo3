import React, { useState } from 'react'
import style from './Card.module.css'

import { FaRegCreditCard } from 'react-icons/fa'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Card({type, image, name, price, rating, description, id}) {

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
      <p className={style.type}>{type}</p>
      <div className={style.cardContent}>
        <div className={style.rating}>{renderStars()}</div> 
        
        <img className={style.imageCard} src={image} alt={name} />
        <div className={style.cardInfo}>
          <h6 className={style.name}>{name}</h6>
          <p className={style.description}>{description}</p>
          <p className={style.payInfo}><span className={style.payIcon}>{<FaRegCreditCard />}</span> Aceptamos todas las tarjetas</p>
        </div>
      </div>
      <span className={style.price}>${price}</span>
      <Link to={`/detail/${id}`} className={style.link}>
        Agregar a la orden
      </Link>
    </div>
  )
}

export default Card