import React from 'react'
import styles from './404.module.css'
import logo from '../../Assets/logo-el-festin-nav.png'
import { Link } from 'react-router-dom'
import ROUTES from '../../Routes/routes'
function NotFound() {
  return (
    <div className={styles.mainContainer}>
        <img src={logo} alt="logo" />
        <h3>Ups, nada por aquí...</h3>
        <span>404 | Not Found</span>
        <Link to={ROUTES.HOME} className={styles.button}>
            Volver al sitio
        </Link>
    </div>
  )
}

export default NotFound