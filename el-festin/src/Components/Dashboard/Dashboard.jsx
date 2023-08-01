import {
  ModalCreateDesert,
  ModalCreateDish,
  ModalCreateDrink,
  ModalCreateSide,
} from "./Create/index";
import Styles from "./Dashboard.module.css";
import { Navbar } from "../NavBar/NavBar.jsx";
import { Dates } from "./Metrics/metrics";
import { DeleteDish } from "./Delete/DeleteDish";
import { useState } from "react";

export const Dashboard = () => {
const [things, setThings] = useState(false)
console.log(things)

const handleRender = () =>{
  if(things === false){
    setThings(true)
  }
  if(things === true){
    setThings(false)
  }
}

  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>
      <div className={Styles.sidebar}>
        <div className={Styles.user}>
          <h4>Administrador</h4>
        </div>
        {/* <h6>Dashboard</h6> */}
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
            <DeleteDish/>
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
         <li>
          <button onClick={handleRender}  className={`btn btn-primary ${Styles.buttonDelete}`}>
            Datos de Administrador
          </button>
        </li> 
        </ul>
      </div>
   
      {things === true ? <div className={Styles.containerMetrics}>
      <Dates/>
      </div> : null}
      
    </>
    
  );
};
