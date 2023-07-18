import { useState } from "react";
import {
  ModalCreateDesert,
  ModalCreateDish,
  ModalCreateDrink,
  ModalCreateSide,
} from "./index";

import Styles from "./Dashboard.module.css";
import { Navbar } from "../NavBar/NavBar.jsx";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";


export const Dashboard = () => {
  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>
      <div
        className={`${Styles.sidebar} ${sidebarVisible ? "" : Styles.hidden}`}
      >
        <div className={Styles.user}>
          <h4>Administrador</h4>
        </div>
        <h6>Dashboard</h6>
        <ul className={Styles.options}>
          <li>
            <ModalCreateDish />
          </li>
          <li>
            <ModalCreateDrink />
          </li>
          <li>
            <ModalCreateDesert />
          </li>
          <li>
            <ModalCreateSide />
          </li>
        </ul>
        <hr />
        <ul className={Styles.options}>
          <li>
            <button className={`btn btn-primary ${Styles.buttonDelete}`}>
              Borrar Plato
            </button>
          </li>
          <li>
            <button className={`btn btn-primary ${Styles.buttonDelete}`}>
              Borrar Bebida
            </button>
          </li>
          <li>
            <button className={`btn btn-primary ${Styles.buttonDelete}`}>
              Borrar Postre
            </button>
          </li>
          <li>
            <button className={`btn btn-primary ${Styles.buttonDelete}`}>
              Borrar Guarnicion
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
