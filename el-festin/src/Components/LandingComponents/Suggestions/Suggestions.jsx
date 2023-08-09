import style from "./Suggestions.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../../Redux/actions/getAllDishes";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

function SampleNextArrow(props) {

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", textShadow: '1px 1px 5px var(--shadow)' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", textShadow: '1px 1px 5px var(--shadow)' }}
      onClick={onClick}
    />
  );
}

const Suggestions = () => {
  const allDishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  const DailySpecials = allDishes.length > 0 && allDishes.filter((dish) => dish.dailyspecial === true);

  const slidesToShow =
  DailySpecials.length > 2 ? 3 : DailySpecials.length;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <h2 className={style.title}>SUGERENCIAS DEL DIA</h2>
      <div className={style.carousel}>
      <Slider {...settings}>
        {DailySpecials.length > 0 && DailySpecials.map((special, index) => {
            return (
              <div key={index}  className={style.categoryContainer} >  
                <p>{special.name}</p>
                 <Link to={`/detail/${special.id}`}>
                <img src={special.image} alt={special.name}  className={style.imgCategory}/>
                </Link>
              </div>
            ); 
          })
        }
          </Slider>
      </div>
    </div>
  );
        }
export default Suggestions
