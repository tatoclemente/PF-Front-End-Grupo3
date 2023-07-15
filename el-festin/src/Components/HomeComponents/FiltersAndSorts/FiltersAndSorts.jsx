import React from 'react'
import style from './FiltersAndSorts.module.css'
import { useDispatch  } from 'react-redux'
import { sortDishesByGluten, sortDishesByVeggy } from '../../../Redux/slices/platosSlice';

function FiltersAndSorts() {
const dispatch = useDispatch();

const handleGluten = (e) => {
  const val = e.target.value;
  dispatch(sortDishesByGluten(val))

}

const handleVeggy = (e) => {
  const val = e.target.value;
  dispatch(sortDishesByVeggy(val))
}


  return (
    <div className={style.mainContainer}>
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
  )
}

export default FiltersAndSorts