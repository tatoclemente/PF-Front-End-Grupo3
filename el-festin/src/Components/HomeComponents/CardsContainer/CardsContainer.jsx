import style from './CardsContainer.module.css'
import { dataDish, dataDrinks } from '../../../utils/mock'
import logo from '../../../images/default-image.jpg'
import Card from '../../Card/Card'

// {type, image, name, price, rating, description, id, addToCart}
const CardsContainer = () => {
  const addToCart = () => {
    window.alert('Agregado al carrito')
  }
  return (
    <div className={style.cardsContainer}>
      {dataDish.map((dish, index) => {
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