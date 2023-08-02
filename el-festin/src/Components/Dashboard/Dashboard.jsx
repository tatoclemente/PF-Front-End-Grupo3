import {
  ModalCreateDesert,
  ModalCreateDish,
  ModalCreateDrink,
  ModalCreateSide,
} from "./Create/index";
import { useSelector } from "react-redux";

import { Navbar } from "../NavBar/NavBar.jsx";

import "./dashboard.css";

import { Sidebar } from "./Sidebar";

export const Dashboard = () => {
  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>

      <Sidebar />
    </>
  );
};
