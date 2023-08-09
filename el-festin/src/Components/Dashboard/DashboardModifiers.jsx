import {
  ModalCreateDesert,
  ModalCreateDish,
  ModalCreateDrink,
  ModalCreateSide,
} from "./Create/index";
import { useSelector } from "react-redux";
import { getDishes } from "../../Redux/actions/getAllDishes";
import { getDesserts } from "../../Redux/actions/actionsDesserts/getAllDesserts";
import { getDrinks } from "../../Redux/actions/actionsDrinks/getAllDrinks";
import { getSides } from "../../Redux/actions/actiossSides/getAllSides";
import Styles from "./Dashboard.module.css";
import { Deleted } from "./Delete/Deleted";
import { UpdateDish } from "./Update/UpdateDish";
import "./dashboard.css";
import { FiArrowLeft } from "react-icons/fi";
import { UpdateSide } from "./Update/UpdateSide";
import { UpdateDrink } from "./Update/UpdateDrink";
import { UpdateDesert } from "./Update/UpdateDesert";

export const DashboardModifiers = ({ comeBack }) => {
  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const allDeserts = useSelector((state) => state.desserts.desserts);
  const allSides = useSelector((state) => state.sides.sides);
  return (
    <div className={Styles.sidebarModifiers}>
      <button
        className="btn btn-outline-danger text-white d-flex justify-content-start ms-2 mb-2"
        onClick={() => comeBack(false)}
      >
        <FiArrowLeft
          style={{
            fontSize: "20px",
            marginTop: "2px",
          }}
        />
        Regresar
      </button>
      <div className={Styles.optionsContainer}>
        <p className={Styles.p}>CREAR</p>
        <ul>
          <div className={Styles.optionsModal}>
            <li>
              <ModalCreateDish />
            </li>
            <li>
              <ModalCreateDrink />
            </li>
          </div>
          <div className={Styles.optionsModal}>
            <li>
              <ModalCreateDesert />
            </li>
            <li>
              <ModalCreateSide />
            </li>
          </div>

        </ul>

      </div>

      <hr />
      <div className={Styles.optionsContainer}>
        <p className={Styles.p}>ACTUALIZAR</p>
        <ul>
          <div className={Styles.optionsModal}>
            <li>
              <UpdateDish allDates={allDishes} />
            </li>
            <li>
              <UpdateSide allDates={allSides} />
            </li>
          </div>

          <div className={Styles.optionsModal}>
            <li>
              <UpdateDrink allDates={allDrinks} />
            </li>
            <li>
              <UpdateDesert allDates={allDeserts} />
            </li>
          </div>

        </ul>
      </div>

      <hr />
      <div className={Styles.optionsContainer}>
        <p className={Styles.p}>BORRAR</p>
        <ul>
          <div className={Styles.optionsModal}>
            <li>
              <Deleted
                allDates={allDishes}
                name={"plato"}
                path={"dish"}
                getItems={getDishes}
                idModal={"staticBackdrop5"}
              />
            </li>
            <li>
              <Deleted
                allDates={allDrinks}
                name={"bebida"}
                path={"drink"}
                getItems={getDrinks}
                idModal={"staticBackdrop6"}
              />
            </li>
          </div>
          <div className={Styles.optionsModal}>
            <li>
              <Deleted
                allDates={allDeserts}
                name={"postre"}
                path={"desert"}
                getItems={getDesserts}
                idModal={"staticBackdrop7"}
              />
            </li>
            <li>
              {" "}
              <Deleted
                allDates={allSides}
                name={"guarnicion"}
                path={"side"}
                getItems={getSides}
                idModal={"staticBackdrop8"}
              />
            </li>
          </div>

        </ul>
      </div>
    </div>
  );
};
