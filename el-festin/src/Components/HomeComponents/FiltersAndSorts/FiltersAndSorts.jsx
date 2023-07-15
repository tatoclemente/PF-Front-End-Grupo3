import React from "react";
import style from "./FiltersAndSorts.module.css";
import { RiArrowLeftSLine } from "react-icons/ri";

function FiltersAndSorts({ state }) {
  const [isCollapsed, setIsCollapsed] = state;


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
    </div>
  );
}

export default FiltersAndSorts;
