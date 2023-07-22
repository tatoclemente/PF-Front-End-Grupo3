import { useState } from "react";
import {server} from "../../Helpers/EndPoint";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

export const MercadoPago =()=> {
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-9c107084-7d18-42a0-8902-d22ab0167b1b");

  const createPreference = async () => {
    try {
      const { data } = await axios.post(`${server}/mercadopago`, {
        title: "Producto",
        description: "Producto",
        unit_price: 10,
        quantity: 1,
      });
      const { id } = data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();

    if (id) setPreferenceId(id);
  };

  return (
    <>
      <button onClick={handleBuy}>Comprar</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </>
  );
}

