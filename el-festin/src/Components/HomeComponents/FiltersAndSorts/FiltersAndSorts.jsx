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
      className={`${style.mainContainer} ${isCollapsed ? style.collapsed : ""}`}
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
      
      <div className={style.filteredContent} isCollapsed={isCollapsed}>
        <h6>FILTROS Y ORDENAMIENTOS</h6>
        <div className={style.filters}>
        <label>¿Sin gluten?</label>
        <select className={style.select} onChange={handleGluten}>
          <option selected disabled>Con o sin gluten</option>
          <option value="all">Todos</option>
          <option value="gluten">Con gluten</option>
          <option value="noGluten">Sin gluten</option>
        </select>
        </div>
       
        <div className={style.filters}>
        <label>¿Vegetariano?</label>
        <select className={style.select} onChange={handleVeggy}>
          <option selected disabled>Elige comida vegetariana</option>
          <option value="all">Todos</option>
          <option value="veggy">Vegetariano</option>
          <option value="noVeggy">No vegetariano</option>
        </select>
        </div>

        <div className={style.filters}>
        <label>Ordene por calorías</label>
        <select className={style.select} onChange={handleCalories}>
          <option selected disabled>Elige por calorias</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
        </div>
       
        <div className={style.filters}>
        <label>Ordene por precio</label>
        <select className={style.select} onChange={handlePrice}>
          <option selected disabled>Elige ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
        </div>
     
      </div>
    
    </div>
  );
}

export default FiltersAndSorts;
