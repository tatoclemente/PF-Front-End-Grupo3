import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {validacionDish} from './Validaciones/validacionDish'
import {getTypes} from '../../Redux/actions/getDishesTypes'
import style from "./dashBoard.module.css"

export const ModalCreateDish = () => {
  let initialState = {
    name: "",
    description: "",
    type: "",
    subtype: [],
    calories: "",
    glutenfree: "",
    vegetarian: "",
    plateoftheday: "",
    price: "",
  };

  const [inputCreateDish, setInputCreateDish] = useState(initialState);
  const [error, setError] = useState({});
  const [selectTypeState, setSelectTypeState] = useState([])
  const  subtypes  = useSelector(state => state.dishes.dishesTypes);
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getTypes())
  },[])

  const onInputChange = ({ target }) => {
    setInputCreateDish({
      ...inputCreateDish,
      [target.name]: target.value,
    });
    setError(validacionDish({
      ...inputCreateDish,
      [target.name]: target.value,
    }));
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      console.log(inputCreateDish);
      setInputCreateDish(initialState);
      window.alert("Postre creado correctamente");
    } else {
      window.alert("Postre no creado");
    }
  };

  // function handleSelect(e){

  //   if(inputCreateDish.subtype.includes(e.target.value)) return //Con esto pregunta si el temperamento a añadir ya esta en el perro a crear
  
  //   setInputCreateDish({
  //     ...inputCreateDish,
  //     subtype: [...inputCreateDish.subtype, e.target.value]
  //   })//Seteo el temperamento del perro a crear
  
  //   const selectName = e.target.value;
  //   if(selectName === "default") return;
  //   setInputCreateDish({...inputCreateDish , subtype:[...inputCreateDish.subtype, selectTypeState]})
  //    //Yo con este estado de selectName hago que los tempremanetos seleccionados se me muestren en el formulario 
  //   setSelectTypeState([...selectTypeState, subtypes.filter(e => e.includes(selectTypeState))])
   
  
  // };
  
  // const handleDelete = (e) =>{
  //   setInputCreateDish({...inputCreateDish, subtype : inputCreateDish.subtype.filter(t => t !== e.target.value)})
  //   setSelectTypeState(selectTypeState.filter(t => t !== e.target.value))
  // }

  return (
  
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">
          Crear de plato
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Crear plato nuevo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmitCreate}>
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={inputCreateDish.name}
                    onChange={onInputChange}
                  />
                  {error.name && <p className={style.dato_incorrecto}>{error.name}</p>}
                  <label
                    htmlFor=""
                    className="pe-3 pt-3 form-label"
                    name="name">
                    Descripcion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={inputCreateDish.description}
                    onChange={onInputChange}
                  />
                  {error.description && <p className={style.dato_incorrecto}>{error.description}</p>}
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    tipo de plato (plato principal, entrada, Etc)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value={inputCreateDish.type}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Subtipo ("pastas", "ensaladas", "carnes")
                  </label>
                  {/* <select onChange={handleSelect}>
                 {
                  subtypes.map(e => {
                    return(
                    <option key={e} value={e}>{e}</option>
                  )})
                 }
                 </select>

                 <ul>
                  {
                    selectTypeState.map(e => {
                      return (<button key={e} value={e} onClick={handleDelete}><p>{e}</p></button>)
                    })
                  }
                 </ul> */}

                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Calorias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="calories"
                    value={inputCreateDish.calories}
                    onChange={onInputChange}
                  />
                  {error.calories && <p className={style.dato_incorrecto}>{error.calories}</p>}
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Glutenfree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="glutenfree"
                    value={inputCreateDish.glutenfree}
                    onChange={onInputChange}
                  />
                  {error.glutenfree && <p className={style.dato_incorrecto}>{error.glutenfree}</p>}
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Vegetariana
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vegetarian"
                    value={inputCreateDish.vegetarian}
                    onChange={onInputChange}
                  />
                  {error.vegetarian && <p className={style.dato_incorrecto}>{error.vegetarian}</p>}
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    dailyspecial
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="plateoftheday"
                    value={inputCreateDish.dailyspecial}
                    onChange={onInputChange}
                  />
                  {error.plateoftheday && <p className={style.dato_incorrecto}>{error.plateoftheday}</p>}
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={inputCreateDish.price}
                    onChange={onInputChange}
                  />
                  {error.price && <p className={style.dato_incorrecto}>{error.price}</p>}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal">
                      Cerrar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

