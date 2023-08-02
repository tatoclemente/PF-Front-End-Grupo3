import React, { useEffect, useState } from "react";
import DetailPage from "../../Components/DetailPage/DetailPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../Helpers/EndPoint";
import Reviews from "../../Components/DetailPage/Reviews/Reviews";

function Detail({ toggleCart }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dishDetail, setDishDetail] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${server}/id/${id}`
        );
        if (data.name) {
          setDishDetail(data);
        }
        window.scrollTo(0, 0);
        setLoading(false);
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          console.log(error);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false; // Establecer la variable de control en false al desmontar el componente
    };
  }, [id]);

  const dataReviews = dishDetail.Comments;
  console.log(dataReviews);

  // const dishes = useSelector(state => state.dishes)
  // console.log(dishes);
  // const dishDetail = dishes.dishes.find(dish => dish.id == id)
  if(loading) 
  return ( <div>
    <p>Please Wait...</p>
    </div>) 
    else return (
    <div>
      <DetailPage dishDetail={dishDetail} toggleCart={toggleCart}/>
      <Reviews dataReviews={dataReviews} />
    </div>
  );
}

export default Detail;
