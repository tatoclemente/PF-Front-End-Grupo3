import React from 'react'
import EmojiTriste from '../../Assets/triste.png'
import style from './PaymentFailed.module.css'
import { Link } from 'react-router-dom'
import ROUTES from '../../Routes/routes'

function PaymentError({ toggleCart }) {

  return (
    <div className={StyleSheet.thankYouContainer}>
      <img src={EmojiTriste} alt="triste" className={style.emoji} />
      <h2 className={style.thankYou}>¡Oh, vaya!, parece que hubo un problema con su pago...</h2>
      <Link className={style.link} to={ROUTES.HOME}>
        <button className={style.buttonProfile} onClick={() => toggleCart()}>Volver a intenar</button>
      </Link>
  
    </div>
  )
}

export default PaymentError