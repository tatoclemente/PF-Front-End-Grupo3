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
import { Navbar } from "../NavBar/NavBar.jsx";
import { Dates } from "./Metrics/metrics";
// import { DeleteDish } from "./Delete/DeleteDish";
import { Deleted } from "./Delete/Deleted";
import { useState } from "react";
import { Banner } from "./Landing/Banners/Banners";
import { Local } from "./Landing/LocalImages/Local";
import { DailySpecials } from "./Landing/DailySpecials/DailySpecials";
import { Updater } from "./Update/Updater";

export const Dashboard = () => {
  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  const allDeserts = useSelector((state) => state.desserts.desserts);
  const allSides = useSelector((state) => state.sides.sides);


  const [showMarketingInfo, setShowMarketingInfo] = useState(false);

  const handleMarketingButtonClick = () => {
    setShowMarketingInfo(!showMarketingInfo);
  };

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
      <div className={Styles.dashboardContainer}>
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
            <li><div className="container-fluid text-dark">
            <button
              type="button"
              className={`btn btn-primary ${Styles.buttonDelete}`}
              onClick={handleMarketingButtonClick}
            >
              Marketing
            </button>
          </div></li>
          </ul>
          
          {showMarketingInfo && (
          <div className={Styles.marketingContent}>
            <Banner />
            <Local />
            <DailySpecials/>
          </div>
        )}
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

          <hr />
          <ul className={Styles.options}>
            <li>
              <Updater allDates={allDishes} />
            </li>
          </ul>

        </ul>
       <li>
          <button onClick={handleRender}>
            Datos
          </button>
        </li> 
      </div>
      
      {things === true ? <div className={Styles.containerMetrics}>
      <Dates/>
      </div> : null}
      
    </>
    
  );
};
