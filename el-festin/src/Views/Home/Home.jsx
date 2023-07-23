import { useState } from "react";
import HomeComponents from "../../Components/HomeComponents"
import { useEffect } from "react";
import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { getDishes } from "../../Redux/actions/getAllDishes";
import { getTypes } from "../../Redux/actions/getDishesTypes";
// import {getDesserts} from '../../Redux/actions/actionsDesserts/getAllDesserts'
import { sortDishesByType } from "../../Redux/slices/platosSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css"

const Home = () => {
  const { CardsContainer, FiltersAndSorts, FeaturedCategories } = HomeComponents;
  const [stateFood, setStateFood] = useState('all')
  const [isCollapsed, setIsCollapsed] = useState(false);

  const dispatch = useDispatch();
  
  const dishType = useSelector((state) => state.dishes.dishesTypes);

  const handleType = (e) => {
    const val = e.target.getAttribute("data-value");
    dispatch(sortDishesByType(val));
    setStateFood('dishes')
  };

  const handleToShow = (e) => {
    const val = e.target.getAttribute("data-value");
    console.log(val);
    if(val === 'drinks'){
      setStateFood('drinks')
    } 
    if(val === 'all'){
      dispatch(sortDishesByType(val));
      setStateFood('all')
    }
  }
  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  // const allDeserts = useSelector((state) => state.desserts.desserts);
  // console.log(allDeserts)
  const all = allDishes.concat(allDrinks)
  // console.log(all)

  useEffect(() => {
    if (allDishes.length === 0) {
      dispatch(getDishes());
    }
    if(allDrinks.length === 0){
      dispatch(getDrinks());
    }
    // if(allDeserts.length === 0){
    //   dispatch(getDesserts())
    // }

    dispatch(getTypes());
  }, [dispatch, allDishes.length, allDrinks.length]);


  const allDishesFiltered = all.filter((d) => d.description);
  const allDrinksFiltered = all.filter((d) => d.volume);
  
  

  let allThings = 
  stateFood === 'all' ? all : 
  stateFood === 'dishes' 
  ? allDishesFiltered : all || 
  stateFood === 'drinks' 
  ? allDrinksFiltered : all 

  
  
  return (
    <div className={style.homeContainer}>
      <div className={style.mainContent}>
        <div
          style={
            isCollapsed
              ? { width: "5px", transition: "width 0.5s ease-in-out" }
              : { transition: "width 0.5s ease-in-out" }
          }
          className={style.sideBar}
        >
          <FiltersAndSorts stateFood={stateFood} state={[isCollapsed, setIsCollapsed]} />
        </div>
        <div
          className={style.productsContent}
          style={
            isCollapsed
              ? { width: "calc(100% - 5px)", transition: "width 0.5s ease-in-out" }
              : { transition: "width 0.5s ease-in-out" }
          }
        >
          <FeaturedCategories handleToShow={handleToShow} handleType={handleType} dishType={dishType} />
          <CardsContainer allThings={allThings}/>
        </div>
      </div>
    </div>
  );
};

export default Home;