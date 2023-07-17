import React, { useEffect, useState } from "react";
import DetailPage from "../../Components/DetailPage/DetailPage";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dishDetail, setDishDetail] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://pf-server-production.up.railway.app/id/${id}`
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

  // const dishes = useSelector(state => state.dishes)
  // console.log(dishes);
  // const dishDetail = dishes.dishes.find(dish => dish.id == id)

  return (
    <div>
      {loading ? <p>Please Wait...</p> : <DetailPage dishDetail={dishDetail} />}
    </div>
  );
}

export default Detail;
