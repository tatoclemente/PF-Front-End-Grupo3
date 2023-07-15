import style from './CardsContainer.module.css'
import { dataDish, dataDrinks } from '../../../utils/mock'
import { getDishes } from '../../../Redux/actions/getAllDishes'
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../images/default-image.jpg'
import Card from '../../Card/Card'
import { useEffect } from 'react';

// {type, image, name, price, rating, description, id, addToCart}
const CardsContainer = () => {
const dispatch = useDispatch();

useEffect(() =>{
  dispatch(getDishes());
}, [])

const allDishes = useSelector(state => state.dishes.dishes);  

  const addToCart = () => {
    window.alert('Agregado al carrito')
  }


  return (
    <div className={style.cardsContainer}>
      {allDishes.map((dish, index) => {
        return (
          <div className={style.card} key={index}>
            <Card 
            type={dish.type}
            image={logo}
            name={dish.name}
            price={dish.price}
            rating={dish.rating}
            description={dish.description}
            id={dish.id}
            addToCart={addToCart} />
          </div>
        )
      
      })}
    </div>
  )
}

export default CardsContainer