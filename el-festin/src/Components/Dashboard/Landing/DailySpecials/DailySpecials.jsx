import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDishes } from "../../../../Redux/actions/getAllDishes";
import { getFilterName } from "../../../../Redux/actions/getFilterName";
import { server } from "../../../../Helpers/EndPoint";
import axios from "axios";
import style from "./DailySpecials.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

export const DailySpecials = () => {
  const allDishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [filterDishes, setFilterDishes] = useState([]);



  //---------------------searchBar-------------------------------------
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
    dispatch(getDishes());


  }, [dispatch]);

  useEffect(() => {
    setFilterDishes(
      Array.isArray(allDishes) && allDishes.filter((dish) =>
        dish.name?.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [allDishes, input]);
  const handleUpdateSpecial = async (dishId) => {
    // Find the dish by its ID
    const dishToUpdate = Array.isArray(allDishes) && allDishes.find((dish) => dish.id === dishId);
    console.log("Dish to update:", JSON.stringify(dishToUpdate));

    // Check if the dish is found and toggle the dailyspecial property
    if (dishToUpdate) {
      // Toggle the value of dailyspecial
      const updatedDish = {
        ...dishToUpdate,
        dailyspecial: !dishToUpdate.dailyspecial,
      };
      console.log("updatedDish " + JSON.stringify(updatedDish));

      try {
        // Send the PUT request to update the dish
        const response = await axios.put(
          `${server}/dish/${dishId}`,
          updatedDish
        );
        console.log("Dish updated successfully:", response.data);

        // Assuming your server updates the data, you can also refresh the dishes here:
        dispatch(getDishes());
      } catch (error) {
        // Handle error if needed
        console.error("Error updating dish:", error);
      }
    }
  };


  const allDishesCopy = [...allDishes];

  const sortedDishes = allDishesCopy.sort((a, b) =>
  a.dailyspecial === b.dailyspecial ? 0 : a.dailyspecial ? -1 : 1
);


  const slidesToShow =
    input.length === 0 && allDishes.length >= 3
      ? 3
      : Math.min(filterDishes.length, 3);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{marginBottom: "50px"}}>
      <h2 className={style.title}>PLATOS DEL DIA</h2>
      <form className={style.form} onSubmit={onSubmitSearch}>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={onInputChange}
          />

          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div
          className={
            input.length > 0
              ? `${style.searchResults} ${style.show}`
              : style.hidden
          }
        >
          { Array.isArray(filterDishes) && filterDishes.slice(0, 3).map((d, i) => {
            return (
              <div key={i}>
                <p value={d.name} onClick={onHandleChange} className="results">
                  {d.name}
                </p>
              </div>
            );
          })}
        </div>
      </form>
      <div className={style.dropdownContainer}>
        <Slider {...settings}>
          {input.length === 0
            ? Array.isArray(sortedDishes) && sortedDishes.map((dish, index) => {
                return (
                  <div key={index} className={style.imageContainer}>
                    {/* <h3>{dish.name}</h3> */}
                    <img
                      src={dish.image}
                      alt="dish"
                      className={` ${
                        dish.dailyspecial === false ? style.imageDisabled : ""
                      } ${style.images}`}
                    />

                    <button
                      onClick={() => handleUpdateSpecial(dish.id)}
                      className={style.specialButton}
                    >
                      {dish.dailyspecial ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </div>
                );
              })
            : Array.isArray(filterDishes) && filterDishes.map((dish, index) => {
                return (
                  <div key={index} className={style.imageContainer}>
                    {/* <h3>{dish.name}</h3> */}
                    <img
                      src={dish.image}
                      alt="dish"
                      className={` ${
                        dish.dailyspecial === false ? style.imageDisabled : ""
                      } ${style.images}`}
                    /><button
                      onClick={() => handleUpdateSpecial(dish.id)}
                      className={style.specialButton1}
                    >
                      {dish.dailyspecial ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </div>
                );
              })}
        </Slider>
      </div>
    </div>
  );
};
