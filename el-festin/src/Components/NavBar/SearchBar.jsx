import { useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Que desea comer"
        className="mi-input fs-5 fw-bold"
        value={input}
        onChange={onInputChange}
      />
    </div>
  );
};
