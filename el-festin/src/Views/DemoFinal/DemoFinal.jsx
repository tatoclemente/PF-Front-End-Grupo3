import React from 'react'
import style from './DemoFinal.module.css'
import { Link } from 'react-router-dom'
import { FaRegCirclePlay } from 'react-icons/fa6'
import logo from '../../Assets/logo-el-festin-nav.png'

function DemoFinal() {
  return (
    <div className={style.mainContainer}>
        <h1 className={style.title}>¡Bienvenidos!</h1>
        <Link className={style.button} to={'https://pf-front-end-grupo3.vercel.app/'}>
           <FaRegCirclePlay />
        </Link>
        <img className={style.logo} src={logo} alt="logo-el-festin" />
    </div>
  )
}

export default DemoFinal