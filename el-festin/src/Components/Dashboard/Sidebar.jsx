import { useState } from "react";
import { DashboardModifiers } from "./DashboardModifiers";
import Styles from "./Dashboard.module.css";

export const Sidebar = (props) => {
  const [productos, setProductos] = useState(true);
  const onProductChange = () => {
    setProductos(!productos);
  };

  if (productos) {
    return (
      <>
        <div className={Styles.sidebar}>
          <div className={Styles.user}>
            <h4 className="fs-3 pb-1 pt-1">Administrador</h4>
          </div>

          <ul className={Styles.options}>
            <li className="pt-4">
              <button
                type="button"
                data-value="Requests"
                className={`btn btn-primary ${Styles.buttonDelete}`}
                onClick={props.handleRender}>
                Pedidos
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                value="Products"
                className={Styles.buttonDelete}
                onClick={onProductChange}
              >
                Productos
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                data-value="Users"
                className={Styles.buttonDelete}
                onClick={props.handleRender}
              >
                Usuarios
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                data-value="Metrics"
                className={Styles.buttonDelete}
                onClick={props.handleRender}
              >
                Metricas
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                data-value="Market"
                className={Styles.buttonDelete}
                onClick={props.handleRender}
              >
                Marketing
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                data-value="Reser"
                className={Styles.buttonDelete}
                onClick={props.handleRender}
              >
                Reservas
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <DashboardModifiers comeBack={onProductChange} />;
      </>
    );
  }
};
