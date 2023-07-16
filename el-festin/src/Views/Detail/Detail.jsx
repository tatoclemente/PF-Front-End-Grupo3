import React, { useState } from 'react'
import DetailPage from "../../Components/DetailPage/DetailPage"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
console.log(id);
  const dishes = useSelector(state => state.dishes)
  console.log(dishes);
  const dishDetail = dishes.dishes.find(dish => dish.id == id)

  console.log(dishDetail);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchData = async () => {
  //     try {
  //       const {data} = await axios.get(`/recipes/${id}`)
  //       if(data.name) {
  //         setRecipe(data);
  //       }
  //       window.scrollTo(0, 0);
  //       setLoading(false)
  //     } catch (error) {
  //       if(isMounted){
  //         history.push(ROUTE.NOT_FOUND)
  //         setLoading(false)
  //         console.log(error);
  //       }
  //     }
  //   }
  //   fetchData()

  //   return () => {
  //     isMounted = false; // Establecer la variable de control en false al desmontar el componente
  //   };
  // }, [id, history])

  return (
    <div><DetailPage
      dishDetail={dishDetail} 
      />
    </div>
  )
}

export default Detail