import React from 'react'
import style from './FiltersAndSorts.module.css'
import { useDispatch  } from 'react-redux'
import { sortDishesByGluten, sortDishesByVeggy, sortByCalories, sortByPrice } from '../../../Redux/slices/platosSlice';
import { RiArrowLeftSLine } from "react-icons/ri";





function FiltersAndSorts({ state }) {
  
  const [isCollapsed, setIsCollapsed] = state;
const dispatch = useDispatch();

const handleGluten = (e) => {
  const val = e.target.value;
  dispatch(sortDishesByGluten(val))

}

const handleVeggy = (e) => {
  const val = e.target.value;
  dispatch(sortDishesByVeggy(val))
}

const handlePrice = (e) => {
  const val = e.target.value;
  dispatch(sortByPrice(val))
}

const handleCalories = (e) => {
  const val = e.target.value;
  dispatch(sortByCalories(val))
}



  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={
        isCollapsed
          ? { width: "5px", transition: "width 0.5s ease-in-out" }
          : { width: "18vw", transition: "width 0.5s ease-in-out" }
      }
      className={style.mainContainer}
    >
      <div
        style={
          isCollapsed
            ? {
                transform: "translateX(-150%)",
                transition: "transform .5s ease-in-out",
              }
            : {}
        }
      >
        <button
          className={isCollapsed ? style.btnCollapsed : style.buttonDropDown}
          onClick={handleToggleMenu}
        >
          <RiArrowLeftSLine className={style.arrow} />
        </button>
        {isCollapsed?<p className={style.text}>abrir barra de filtros</p>:null}
      </div>
      
      <div className={style.filteredContent}>
        <select className={style.select} onChange={handleGluten}>
          <option selected disabled>Con o sin gluten</option>
          <option value="all">Todos</option>
          <option value="gluten">Con gluten</option>
          <option value="noGluten">Sin gluten</option>
        </select>

        <select className={style.select} onChange={handleVeggy}>
          <option selected disabled>Elige comida vegetariana</option>
          <option value="all">Todos</option>
          <option value="veggy">Vegetariano</option>
          <option value="noVeggy">No vegetariano</option>
        </select>

       
        <select className={style.select} onChange={handleCalories}>
          <option select disabled>Elige por calorias</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>


        <select className={style.select} onChange={handlePrice}>
          <option select disabled>Elige ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
     
      </div>
    
    </div>
  );
}

export default FiltersAndSorts;
