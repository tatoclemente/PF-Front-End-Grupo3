import React from 'react'
import EmojiFeliz from '../../Assets/contento.png'
import style from './PaymentSuccess.module.css'
import { Link } from 'react-router-dom'
import ROUTES from '../../Routes/routes'
import { useDispatch } from 'react-redux'
import { clearCart, deleteCartDataBase } from '../../Redux/actions/actionOrders/actionOrders'
import { useEffect } from 'react'

function PaymentSuccess() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Aquí puedes llamar a tus acciones para limpiar el carrito
    handleClearCart();
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(deleteCartDataBase());
  };

  return (
    <div className={StyleSheet.thankYouContainer}>
      <img src={EmojiFeliz} alt="feliz" className={style.emoji} />
      <h2 className={style.thankYou}>¡Muchas Gracias!, su pago fue realizado con exito...</h2>
      <Link className={style.link} to={ROUTES.PROFILE}>
        <button className={style.buttonProfile}>Ver mi pedido</button>
      </Link>
  
    </div>
  )
}

export default PaymentSuccess