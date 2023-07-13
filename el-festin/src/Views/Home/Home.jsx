import HomeComponents from "../../Components/HomeComponents"
import style from "./Home.module.css"

const Home = () => {
  const { CardsContainer, FiltersAndSorts, FeaturedCategories } = HomeComponents;

  return (
    <div className={style.homeContainer}>
      <div className={style.mainContent}>
        <FiltersAndSorts />
        <div className={style.productsContent}>
          <FeaturedCategories />
          <CardsContainer />
        </div>
      </div>
      <div className={style.footer}>
        hola
      </div>
    </div>
  )
}

export default Home