import Style from "./FeaturedCategories.module.css";
import logo from "../../../images/default-image.jpg";
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
        display: "block",
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
        display: "block",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

const FeaturedCategories = ( props) => {
 

  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={Style.mainContainer}>
      <Slider className={Style.listContainer} {...sliderSettings}>
      <div
              data-value={'all'}
              className={Style.categoryContainer}
              onClick={props.handleToShow}
            >
              <img
                data-value={'all'}
                className={Style.imgCategory}
                src={logo}
                alt=" "
              />
              <p>Todos</p>
            </div>
        {
          props.dishType.map((type, index) => (
            <div
              data-value={type}
              key={index}
              className={Style.categoryContainer}
              onClick={props.handleType}
            >
              <img
                data-value={type}
                className={Style.imgCategory}
                src={logo}
                alt=" "
              />
              <p>{type}</p>
            </div>
          ))}
           <div
              data-value={'drinks'}
              className={Style.categoryContainer}
              onClick={props.handleToShow}
            >
              <img
                data-value={'drinks'}
                className={Style.imgCategory}
                src={logo}
                alt=" "
              />
              <p>Bebidas</p>
            </div>
            <div
              data-value={'deserts'}
              className={Style.categoryContainer}
              onClick={props.handleToShow}
            >
              <img
                data-value={'deserts'}
                className={Style.imgCategory}
                src={logo}
                alt=" "
              />
              <p>Postres</p>
            </div>
      </Slider>
    </div>
  );
};

export default FeaturedCategories;
