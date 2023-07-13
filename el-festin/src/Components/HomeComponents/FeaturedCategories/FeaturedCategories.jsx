import style from './FeaturedCategories.module.css'
import { dataDish, dataDrink } from '../../../utils/mock'
import logo from '../../../images/default-image.jpg'

const FeaturedCategories = () => {

  const subTypes = dataDish.map(dish => dish.subtype);
  const categories = [...new Set(subTypes)];
  console.log(categories);
  return (
    <div className={style.mainContainer}>
        <ul className={style.listContainer}>
          {categories && categories.map((category, index) => {
            return (<li key={index}>
              <div className={style.categoryContainer}>
                {console.log(category)}
                <img className={style.imgCategory} src={logo} alt="imagen-default" />
                <p>{category} </p>
              </div>
            </li>)
          })}
          
        </ul>
    </div>
  )
}

export default FeaturedCategories