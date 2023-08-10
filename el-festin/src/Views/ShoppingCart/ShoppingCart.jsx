// import { MercadoPago } from "../../Components/MercadoPago/MercadoPago";
import React, { useState } from "react";
import style from "./ShoppingCart.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  deleteCartDataBase,
} from "../../Redux/actions/actionOrders/actionOrders";
import capitalizeFirstLetter from "../../functions/capitalizeFirstLetter";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { formattedDescription } from "../../functions/formattedDescription";
import { formattedCart } from "../../functions/formattedCart";
import { calculateTotalPrice } from "../../functions/calculateTotalPrice";
import getCustomTokenFromLocalStorage from "../../functions/getCustomToken";
import Spinner from "../../Components/Spinner/Spinner";
// import { logo } from "../../Helpers/ImageUrl";

function ShoppingCart({ isOpen, onCloseCart }) {
  const [loading, setLoading] = useState(false);
  const order = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.auth.user);
  // console.log("USER_____", user);

  // console.log(order);

  const navigate = useNavigate();

  initMercadoPago("TEST-9c107084-7d18-42a0-8902-d22ab0167b1b");

  //*MERCADO PAGO

  const dispatch = useDispatch();

  // Función para calcular el precio total de todos los ítems en el carrito

  const totalPrice = calculateTotalPrice(order);

  // ...

  const increaseQuantity = (id, quantity) => {
    const updatedQuantity = quantity < 2 ? quantity + 1 : quantity;
    dispatch(updateCartItemQuantity({ id: id, quantity: updatedQuantity }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      dispatch(updateCartItemQuantity({ id: id, quantity: updatedQuantity }));
    }
  };
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearAllCart = () => {
    dispatch(clearCart());
    dispatch(deleteCartDataBase())
  };

  //? --> Con esta funcion formateo lo que voy a mandar en el POST a order
  const formattedOrder = formattedCart(order);
  //? --> VER LO QUE SE HA FORMATEADO
  // console.log("CART", formattedOrder);

  // Armo el objeto para enviar al back
  const pedido = {
    order: formattedOrder,
  };

  // console.log(pedido);
  
  const handlePaySubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const customToken = getCustomTokenFromLocalStorage();

    // console.log("____CUSTOM TOKEN_____", customToken);

    const config = {
      headers: {
        Authorization: `Bearer ${customToken}`,
      },
    };

    if (!customToken) {
      Swal.fire({
        icon: "info",
        title: "Ups, siento!",
        text: "Debe estar registrado para pagar esta orden",
        confirmButtonText: "Registrarme Ahora!",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          onCloseCart();

          navigate("/auth/login");
        }
      });
      return;
    }

    try {
      const data = await axios.post(`${server}/completeOrder`, pedido, config);

      // console.log("DATA POST_________", data.data);
      const idPedido = data.data
      if (Object.keys(data).length > 0) {
        setLoading(false)
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "¡Lo estamos redirecionando para su pago!",
          showConfirmButton: false,
          timer: 2000,
        });
        const description = formattedDescription(order);
        onCloseCart();
        const { data: mercadopagoData } = await axios.post(
          `${server}/mercadopago`,
          {
            // id: pedido.userId,
            title: `Compra en El Festín online -${idPedido}`,
            unit_price: totalPrice,
            quantity: 1,
          }
        );
        const response = mercadopagoData.response;

        window.location.href = response.body?.init_point;
        // clearAllCart();
        onCloseCart();
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Hubo un error. Su orden fue rechazada!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const cartStyle = {
    right: isOpen ? "0" : "-100%",
  };

  return (
    <div className={style.shoppingCartContainer} style={cartStyle}>
      <div className={style.shoppingCartHeader}>
        <button onClick={onCloseCart} className={style.closeCart}>
          <AiOutlineCloseCircle />
        </button>
        <h2 className={style.shoppingCartTitle}>Aquí esta su orden</h2>
      </div>
      <div className={style.shoppingCartBody}>
        {Array.isArray(order) === false ||
        order === null ||
        order.length === 0 ? (
          <p>Aún no ha realizado ninguna orden</p>
        ) : (
          order.map((item, index) => {
            const hasGarnish = item.garnish && item.garnish !== null;
            const hasDrink = item.drinks.length > 0;
            const hasDessert = item.desserts.length > 0;
            const hasDish = item.dish !== null;
            const totalPrice =
              (hasDish ? parseFloat(item.dish.price) * item.dish.quantity : 0) +
              (hasGarnish
                ? parseFloat(item.garnish.price) * item.garnish.quantity
                : 0) +
              (hasDrink
                ? item.drinks.reduce(
                    (acc, drink) => acc + drink.price * drink.quantity,
                    0
                  )
                : 0) +
              (hasDessert
                ? item.desserts.reduce(
                    (acc, dessert) => acc + dessert.price * dessert.quantity,
                    0
                  )
                : 0);
            const capitalizeSubtitle = hasDish
              ? capitalizeFirstLetter(item.dish.type)
              : "";
            return (
              <div key={index} className={style.productContainer}>
                {hasDish && (
                  <div>
                    <p className={style.subTitle}>{capitalizeSubtitle}</p>
                    <div className={style.dishDetails}>
                      <div className={style.dishDetailsHeader}>
                        <img
                          className={style.productImage}
                          src={item.dish.image}
                          alt={item.dish.name}
                        />
                        <div className={style.dishDetailsInfo}>
                          <h3 className={style.productName}>
                            {item.dish.name}{" "}
                            {hasGarnish && `con ${item.garnish.name}`}
                          </h3>
                          <div className={style.dishDetailsInfoUnitPrice}>
                            <p className={style.unitPrice}>
                              Precio del plato: ${item.dish.price}
                            </p>
                            {hasGarnish && (
                              <p className={style.unitPrice}>
                                Precio de la guarnición: ${item.garnish.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={style.quantityButtonCombo}>
                        <button
                          className={style.buttonDeleteCombo}
                          onClick={() => removeItem(item.dish.id)}>
                          Eliminar combo
                        </button>
                      </div>
                      <div className={style.dishDetailsFooter}>
                        <p className={style.totalPrice}>
                          Su orden suma: ${totalPrice}
                        </p>
                        <p className={style.quantity}>
                          Cantidad: {item.dish.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  {hasDessert ||
                    (hasDrink && (
                      <p className={style.subTitle}>
                        {hasDrink && hasDessert
                          ? "Bebidas y postres"
                          : hasDessert
                          ? "Postres"
                          : hasDrink
                          ? "Bebidas"
                          : null}
                      </p>
                    ))}
                  {/* Mapear las bebidas */}
                  {hasDrink &&
                    item.drinks.map((drink, drinkIndex) => (
                      <div
                        key={drinkIndex}
                        className={style.additionalContainer}>
                        <div className={style.dishDetailsHeader}>
                          <img
                            className={style.productImage}
                            src={drink.image}
                            alt={drink.name}
                          />
                          <div className={style.dishDetailsInfo}>
                            <h3 className={style.productName}>{drink.name}</h3>

                            <div className={style.dishDetailsInfoUnitPrice}>
                              <p className={style.volumeDrink}>
                                {drink.volume}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={style.quantityButtons}>
                          <button
                            className={style.buttonDelete}
                            onClick={() => removeItem(drink.id)}>
                            Eliminar
                          </button>
                          <div className={style.quantityContainer}>
                            <button
                              className={style.buttonQuantity}
                              onClick={() =>
                                decreaseQuantity(drink.id, drink.quantity)
                              }>
                              -
                            </button>
                            <button
                              className={style.buttonQuantity}
                              onClick={() =>
                                increaseQuantity(drink.id, drink.quantity)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                        <div className={style.dishDetailsFooterAdditionals}>
                          <p>Precio: ${drink.price}</p>
                          <p>Cantidad: {drink.quantity}</p>
                        </div>
                      </div>
                    ))}

                  {/* Mapear los postres */}
                  {hasDessert &&
                    item.desserts.map((dessert, dessertIndex) => (
                      <div
                        key={dessertIndex}
                        className={style.additionalContainer}>
                        <div className={style.dishDetailsHeader}>
                          <img
                            className={style.productImage}
                            src={dessert.image}
                            alt={dessert.name}
                          />
                          <div className={style.dishDetailsInfo}>
                            <h3 className={style.productName}>
                              {dessert.name}
                            </h3>
                          </div>
                        </div>
                        <div className={style.quantityButtons}>
                          <button
                            className={style.buttonDelete}
                            onClick={() => removeItem(dessert.id)}>
                            Eliminar
                          </button>
                          <div className={style.quantityContainer}>
                            <button
                              className={style.buttonQuantity}
                              onClick={() =>
                                decreaseQuantity(dessert.id, dessert.quantity)
                              }>
                              -
                            </button>
                            <button
                              className={style.buttonQuantity}
                              onClick={() =>
                                increaseQuantity(dessert.id, dessert.quantity)
                              }>
                              +
                            </button>
                          </div>
                        </div>
                        <div className={style.dishDetailsFooterAdditionals}>
                          <p>Precio: ${dessert.price}</p>
                          <p>Cantidad: {dessert.quantity}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* <MercadoPago /> */}
      
      <button
        onClick={handlePaySubmit}
        disabled={order === null || order.length === 0 || loading}
        className={
          order === null || order.length === 0
            ? `${style.payButton} ${style.disabledButton}`
            : loading ? `${style.payButton} ${style.disabledPay}` : style.payButton
        }>
        {loading 
        ? <div className={style.payButtonFalse}><Spinner /> Cargando...</div>
      : <div className={style.payButtonTrue}>PAGAR <span>{` Suma total $${totalPrice}`}</span></div>}
        
      </button>
      {order.length !== 0 && (
        <button disabled={loading} className={loading ? style.disabledClear : style.clearButton} onClick={clearAllCart}>
          YA NO QUIERO ESTA ORDEN
        </button>
      )}
    </div>
  );
}

export default ShoppingCart;
