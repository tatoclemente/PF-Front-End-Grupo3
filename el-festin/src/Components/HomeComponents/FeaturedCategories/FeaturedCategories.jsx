import Style from './FeaturedCategories.module.css'
import { dataDish, dataDrink } from '../../../utils/mock'
import logo from '../../../images/default-image.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

const FeaturedCategories = () => {
  const subTypes = dataDish.map(dish => dish.subtype);
  const categories = [...new Set(subTypes)];

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
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    };


  return (
    <div className={Style.mainContainer}>
      <Slider className={Style.listContainer} {...sliderSettings}>
        {categories.map((category, index) => (
            <div key={index} className={Style.categoryContainer}>
              <img className={Style.imgCategory} src={logo} alt={category} />
              <p>{category}</p>
            </div>
          ))}
      </Slider>
    </div>
  );
};


export default FeaturedCategories