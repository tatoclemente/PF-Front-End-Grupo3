import { ModalCreateDesert } from "./ModalCreateDesert";
import { ModalCreateDish } from "./ModalCreateDish";
import { ModalCreateDrink } from "./ModalCreateDrink";
import { ModalCreateSide } from "./ModalCreateSide";

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="fs-4 text-center">
        <h1>Dashboard</h1>
        <ModalCreateDish />
        <ModalCreateDrink />
        <ModalCreateDesert />
        <ModalCreateSide />

      </div>
    </div>
  );
};
