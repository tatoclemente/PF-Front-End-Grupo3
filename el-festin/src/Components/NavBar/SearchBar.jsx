import { useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Busca comidas, bebidas o postres..."
        className="mi-input fs-5 fw-bold"
        value={input}
        onChange={onInputChange}
        />
        <div className="search-line"></div>
        <i className="fa-solid fa-magnifying-glass search-icon fs-3"></i>
    </div>
  );
};
