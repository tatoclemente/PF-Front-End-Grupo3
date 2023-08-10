import React, { useState } from 'react'
import styleModal from './ModalReviews.module.css'
import { AiFillCloseCircle, AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import axios from 'axios';
import { server } from '../../../Helpers/EndPoint';
import Swal from 'sweetalert2';

function ModalReviews({setShowReviewModal, selectedItem, userId, orders, setShowModal}) {
    
  const { name, lastName } = selectedItem[0]; // Información del usuario
  const orderItems = selectedItem.slice(1); // Detalles de los items de la orden

  const [showForm, setShowForm] = useState(false);
  const [currentDishId, setCurrentDishId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
    

  const handleShowForm = (idDish) => {
    // Verifica si el usuario ya ha dejado un comentario para este plato
    const isRated = orderItems.some(item => item.dish?.id === idDish && item.dish?.Comments.some(comment => comment.User?.id === userId));
  
    if (isRated) {
      // El usuario ya ha valorado este plato, mostrar un mensaje o hacer algo
      Swal.fire({
        icon: 'info',
        title: '¡Ups, parece que ya has opinado!',
        text: 'Solo puedes valorar el plato una vez'
      })
    } else {
      setShowForm(true);
      setCurrentDishId(idDish);
    }
  };
  
  

  const dataPost = {
    userId,
    dishId: currentDishId,
    rating,
    comment,
  }
  // console.log(dataPost);
  const handleSubmitReview = async () => {
    // Realiza la solicitud POST para enviar la reseña al servidor
    try {
      const response = await axios.post(`${server}/comment`, dataPost);
      console.log(response.data);
      if (response.data){
      await orders()
      Swal.fire({
        icon: 'success',
        title: 'Reseña enviada',
        text: 'Gracias por calificar este plato!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      setComment("")
      setRating(0)
      setShowForm(false);
      setShowReviewModal(false);
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ups, parece que ha habido un error!',
        text: 'Intenta de nuevo más tarde',
        confirmButtonText: 'Ok'
      })
      // Maneja el error de manera adecuada, como mostrar un mensaje de error
    }
  };

  // console.log(currentDishId);
  // console.log(userId);

    const handleStarClick = (stars) => {
      setRating(stars);
    };

    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        const starIcon = i <= rating ? (
          <AiTwotoneStar key={i} className={styleModal.ratingIcon} onClick={() => handleStarClick(i)} />
        ) : (
          <AiOutlineStar key={i} className={styleModal.ratingIcon} onClick={() => handleStarClick(i)} />
        );
        stars.push(starIcon);
      }
      return stars;
    };

  
  
  return (
    <>
       {showForm && <div className={styleModal.overlay2} onClick={() => setShowForm(false)}></div>}
      {showForm && (
        
        <div className={styleModal.ratingFormModal}>
          <div className={styleModal.headersCloseReview}>
            <button onClick={() => setShowForm(false)} className={styleModal.closeButton}><AiFillCloseCircle /></button>
          </div>
         
          <h4>Calificar este plato</h4>
          <div className={styleModal.ratingStars}>{renderStars()}</div>
          <textarea
            className={styleModal.commentTextarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ingrese su comentario..."
          />
          <button className={styleModal.ratingButton} onClick={handleSubmitReview}>Enviar reseña</button>
        </div>
      )}

      {/* Capa semi-transparente */}
      <div className={styleModal.overlay} onClick={() => setShowReviewModal(false)}></div>

      <div className={styleModal.modal}>
        <div className={styleModal.headersClose}>
          <button onClick={() => setShowReviewModal(false)} className={styleModal.closeButton}><AiFillCloseCircle /></button>
        </div>
        <section className={styleModal.header}>
          <p className={styleModal.title}>¡Muchas gracias por su compra {name}{lastName !== null && (" ", lastName)}!</p>
          <span className={styleModal.orderNumber}><b>Estos son los platos que puede Calificar:</b></span>
        </section>
        <section className={styleModal.bodyDetail}>
          {orderItems.map((item, index) => {

            const hasGarnish = item.garnish && item.garnish !== null;
            // const hasDrink = item.drinks && item.drinks.length > 0;
            // console.log(hasDrink);
            // const hasDessert = item.desserts && item.desserts.length > 0;
            const hasDish = item.dish && item.dish !== null;

            return (
              <div key={index} className={styleModal.productContainer}>
                {hasDish && (
                  <div className={styleModal.dishDetails}>
                    <div className={styleModal.dishDetailsHeader}>
                      <img
                        className={styleModal.productImage}
                        src={item.dish.image}
                        alt={item.dish.name}
                      />
                      <div className={styleModal.dishDetailsInfo}>
                        <h3 className={styleModal.productName}>
                          {item.dish.name}{" "}
                          {hasGarnish && `con ${item.garnish.name}`}
                        </h3>
                        <div className={styleModal.dishDetailsInfoUnitPrice}>
                            <button onClick={() => handleShowForm(item.dish.id)} className={styleModal.ReviewButton}>Calificar este plato</button>
                        </div>
                      </div>
                    </div>                  
                  </div>          
                )}               
              </div>


            )
          })}
      </section>

      </div>
    </>
  )
}

export default ModalReviews