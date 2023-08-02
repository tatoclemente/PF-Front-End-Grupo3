import React from 'react'
import style from './Reviews.module.css';
import defaultImage from './images/profile.png'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';

function Reviews({ dataReviews }) {

  // Función para obtener el nombre del mes en español
  const getNameMonth = (mesNum) => {
    const nombresMeses = [
      "ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov", "dic"
    ];
    return nombresMeses[mesNum];
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? (
        <AiTwotoneStar key={i} className={style.ratingIcon} />
      ) : (
        <AiOutlineStar key={i} className={style.ratingIcon} />
      );
      stars.push(starIcon);
    }
    return stars;
  };

  return (
    <div className={style.mainContainer}>
      <h1 className={style.title}>Valoraciones de nuestros clientes</h1>
      {dataReviews && Array.isArray(dataReviews) && dataReviews.length === 0 ? <p>Este plato aún no tiene ninguna reseña</p> :
        
        dataReviews.map(review => {
          const user = review.User;
          const comment = review.content;
          const rating = review.rating;
          // Formateo la fecha para que se vea mejor Ej.: 12 de ago, 2023

          const originalDate = review.createdAt;
          const date = new Date(originalDate);
          const day = date.getDate();
          const month = getNameMonth(date.getMonth());
          const year = date.getFullYear();
          const formatedDate = `${day} de ${month}, ${year}`;

          return (

            <div key={review.id} className={style.container}>
              <div className={style.cardConainer}>
                <div className={style.userInfo}>
                  <img src={user.image || defaultImage} alt="profile-image" />
                  <p className={style.name}>{user.name}</p>
                </div>
                <div className={style.contentInfo}>
                  <div className={style.header}>
                    <div className={style.rating}>{renderStars(rating)}</div>
                    <p className={style.date}>{formatedDate}</p>
                  </div>
                  <div className={style.commentContainer}>
                    <p className={style.comment}>"{comment}"</p>
                  </div>
                </div>
              </div>  
            </div>
          )
        })
      }
    </div>
  )
}

export default Reviews