import { useState } from "react";
import HomeComponents from "../../Components/HomeComponents"
import { useEffect } from "react";
import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { getDishes } from "../../Redux/actions/getAllDishes";
import { getTypes } from "../../Redux/actions/getDishesTypes";
 import {getDesserts} from '../../Redux/actions/actionsDesserts/getAllDesserts'
import { sortDishesByType } from "../../Redux/slices/platosSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css"
import Loader from "../../Components/Loader/Loader";

const Home = ({ toggleCart }) => {

  const [currentPage, setCurrentPage] = useState(0);

  const { CardsContainer, FiltersAndSorts, FeaturedCategories } = HomeComponents;
  const [stateFood, setStateFood] = useState('all')
  const [stateSort, setStateSort] = useState(' ')
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();
  
  const dishType = useSelector((state) => state.dishes.dishesTypes);

  const handleType = (e) => {
    const val = e.target.getAttribute("data-value");
    dispatch(sortDishesByType(val));
    setStateFood('dishes')

    setCurrentPage(0)
  };


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDishes());
      await dispatch(getDrinks());
      await dispatch(getDesserts())
      await dispatch(getTypes());
    }
    fetchData();
    setLoading(false)
      
  }, [dispatch]);


  const handleToShow = (e) => {
    const val = e.target.getAttribute("data-value");
  
    if(val === 'drinks'){
      if(allDrinks.length === 0){
        dispatch(getDrinks());
      }
      setStateFood('drinks')
    }
    if(val === 'desserts'){
      if(allDeserts.length === 0){
        dispatch(getDesserts())
      }
      setStateFood('desserts')
    } 
    if(val === 'all'){
      dispatch(sortDishesByType(val));
      dispatch(getDishes());
      dispatch(getDrinks());
      dispatch(getDesserts())
      setStateFood('all')
    }

    setCurrentPage(0)
  };
  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const allDeserts = useSelector((state) => state.desserts.desserts);

  const all = [];
  if (Array.isArray(allDishes) && allDishes.length > 0) all.push(...allDishes);
  if (Array.isArray(allDrinks) && allDrinks.length > 0) all.push(...allDrinks);
  if (Array.isArray(allDeserts) && allDeserts.length > 0) all.push(...allDeserts);
  // const all = allDishes.concat(allDrinks).concat(allDeserts);
  


  const allDishesFiltered = all.filter((d) => d.description);
  const allDrinksFiltered = all.filter((d) => d.volume);
  const allDesertsFiltered = all.filter((d) => !d.description && !d.volume)

  let allT = 
  stateFood === 'all' ? all : 
  stateFood === 'dishes' ? allDishesFiltered :
  stateFood === 'drinks' ? allDrinksFiltered :
  stateFood === 'desserts' ? allDesertsFiltered : all;


let allThings = 
stateSort === ' ' ? allT :
stateSort === 'asc'
    ? allT.sort((a, b) => b.price - a.price)
    : allT.sort((a, b) => a.price - b.price);


console.log(loading);

if (loading) return ( 
    <div style={{width: '100%', zIndex:'50', top: '0', left: '0', position: 'absolute', height: '100vh',backgroundColor: 'var(--background-darkblue)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <p><Loader /></p>
    </div>) 
 else return (
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
          <FiltersAndSorts setStateSort={setStateSort} stateFood={stateFood} state={[isCollapsed, setIsCollapsed]} />
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
          <CardsContainer allThings={allThings} toggleCart={toggleCart} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;