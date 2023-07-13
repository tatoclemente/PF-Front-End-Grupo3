import style from './CardsContainer.module.css'
import { dataDish, dataDrinks } from '../../../utils/mock'
import logo from '../../../images/default-image.jpg'

const CardsContainer = () => {
  return (
    <div className={style.cardsContainer}>
      {dataDish.map((dish, index) => {
        return (
          <div className={style.card} key={index}>
            <img src={logo} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
          </div>
        )
      
      })}
    </div>
  )
}

export default CardsContainer