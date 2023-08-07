import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterName } from "../../Redux/actions/getFilterName";

export const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const allDeserts = useSelector((state) => state.desserts.desserts);
  const all = [];
  if (Array.isArray(allDishes) && allDishes.length > 0) all.push(...allDishes);
  if (Array.isArray(allDrinks) && allDrinks.length > 0) all.push(...allDrinks);
  if (Array.isArray(allDeserts) && allDeserts.length > 0) all.push(...allDeserts);



   const onInputChange = ({ target }) => {
     setInput(target.value);
   };

   const onSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(getFilterName(input));
    setInput(' ')
  
  };

  const onHandleChange = (e) =>{
   const val = e.target.innerText;
   setInput(val.toLowerCase())
  }

  let filteredDishes = all.filter(
    (dish) =>
      dish.name?.toLowerCase().includes(input.toLowerCase()))

 
  if (props.path === "/home") {
    return (
      <form onSubmit={onSubmitSearch} className="search-input-container">
        <input
          type="text"
          placeholder="Busca comidas, bebidas o postres..."
          className="mi-input fs-5"
          value={input}
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="fa-solid fa-magnifying-glass border-end-0 border-top-0 border-bottom-0 border-dark search-icon fs-3"
          ></button>
          <div className={input.length === 0 ? null : 'contSearchBarResults'}>
           {input && filteredDishes.slice(0, 3).map((d, i) => {
              return (
                <div >
                  <p value={d.name} onClick={onHandleChange} className="results" key={i}>{d.name}</p>
                  {/* En esta parte hice un recomendaciones que vayan apareciendo dependiendo que estes buscando, esto lo hice con un and en el estado local de search y el estado global de dogs. Al darles click, estas te llevan a los detalles del perro que te aparezca */} 
                </div>
              )
            })}
            </div>
      </form>
    );
  }

  return undefined;
};
