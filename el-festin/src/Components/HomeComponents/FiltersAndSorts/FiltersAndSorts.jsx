import React from 'react'
import style from './FiltersAndSorts.module.css'
import { useDispatch  } from 'react-redux'
import { sortDishesByGluten, sortDishesByVeggy } from '../../../Redux/slices/platosSlice';
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
      <select onChange={handleGluten}>
        <option select disabled>Elige comida con o sin gluten</option>
        <option value="all">Todos</option>
        <option value="gluten">Con gluten</option>
        <option value="noGluten">Sin gluten</option>
      </select>

      <select onChange={handleVeggy}>
        <option select disabled>Elige comida vegetariana</option>
        <option value="all">Todos</option>
        <option value="veggy">Vegetariano</option>
        <option value="noVeggy">No vegetariano</option>
      </select>
    </div>
  );
}

export default FiltersAndSorts;
