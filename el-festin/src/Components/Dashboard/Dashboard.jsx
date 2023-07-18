import React, { useState } from "react";
import { ModalCreateDesert } from "./ModalCreateDesert";
import { ModalCreateDish } from "./ModalCreateDish";
import { ModalCreateDrink } from "./ModalCreateDrink";
import { ModalCreateSide } from "./ModalCreateSide";
import Styles from "./Dashboard.module.css";
import { Navbar } from "../NavBar/NavBar.jsx";

export const Dashboard = () => {
  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>
      <div className={Styles.sidebar}>
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
