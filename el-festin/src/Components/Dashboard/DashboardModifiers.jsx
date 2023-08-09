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
      <div className={Styles.sidebar}>
        <button
          className="btn btn-outline-danger text-white d-flex justify-content-start ms-2 mb-0 "
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
        <ul className={Styles.options}>
          <p className={Styles.p}>CREAR</p>
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
          <p className={Styles.p}>ACTUALIZAR</p>
          <li>
            <UpdateDish allDates={allDishes} />
          </li>
          <li>
            <UpdateSide allDates={allSides} />
          </li>
          <li>
            <UpdateDrink allDates={allDrinks} />
          </li>
          <li>
            <UpdateDesert allDates={allDeserts} />
          </li>
        </ul>
        <hr />
        <ul className={Styles.options}>
          <p className={Styles.p}>BORRAR</p>
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
        </ul>
      </div>
  );
};
