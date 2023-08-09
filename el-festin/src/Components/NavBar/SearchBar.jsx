import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterName } from "../../Redux/actions/getFilterName";

export const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    setInput("");
  };

  const onHandleChange = (e) => {
    const val = e.target.innerText;
    setInput(val.toLowerCase());
  };

  useEffect(() => {
    if (input.length > 0) {
      const filteredDishes = all.filter((dish) =>
        dish.name?.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filteredDishes.slice(0, 3));
    } else {
      setSearchResults([]);
    }
  }, [input ]);
 
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
        <div className={searchResults.length === 0 ? null : "contSearchBarResults"}>
          {searchResults.map((d, i) => (
            <div key={i}>
              <p value={d.name} onClick={onHandleChange} className="results">
                {d.name}
              </p>
            </div>
          ))}
        </div>
      </form>
    );
  }

  return undefined;
};