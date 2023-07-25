import { MercadoPago } from "../../Components/MercadoPago/MercadoPago";
import React, { useState } from "react";
import style from "./ShoppingCart.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../../Redux/slices/orderSlice";
import capitalizeFirstLetter from "../../functions/capitalizeFirstLetter";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../Context/authContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

function ShoppingCart({ isOpen, onCloseCart }) {

  //* MERCADO PAGO

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

  //*MERCADO PAGO

  const dispatch = useDispatch();

  const usersDB = useSelector(state => state.users.users)
  const { user } = useAuth();
  
  const currentUser = usersDB.find(u => u.email === user?.email)

  console.log(currentUser?.id);
  
  const cartStyle = {
    right: isOpen ? "0" : "-100%",
  };

  const order = useSelector((state) => state.cart); 

  //? --> Con esta funcion formateo lo que voy a mandar en el POST a order
  const formattedCart = order.map((item) => {
    const formattedItem = {};

    if (item.dish) {
      formattedItem.dish = [{
        id: item.dish.id,
        price: item.dish.price,
        quantity: item.dish.quantity,
      }];
    }

    if (item.garnish) {
      formattedItem.garnish = [{
        id: item.garnish.id,
        price: item.garnish.price,
        quantity: item.garnish.quantity,
      }];
    }

    if (item.drinks.length > 0) {
      formattedItem.drinks = item.drinks.map((drink) => ({
        id: drink.id,
        price: drink.price,
        quantity: drink.quantity,
      }));
    }

    if (item.desserts.length > 0) {
      formattedItem.desserts = item.desserts.map((dessert) => ({
        id: dessert.id,
        price: dessert.price,
        quantity: dessert.quantity,
      }));
    }

    return formattedItem;
  });

  //? --> VER LO QUE SE HA FORMATEADO
  // console.log("CART", formattedCart);

  // ...

  // Función para calcular el precio total de todos los ítems en el carrito
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    order.forEach((item) => {
      const hasGarnish = item.garnish !== null;

      if (item.dish && item.dish.price) {
        totalPrice += parseFloat(item.dish.price) * item.dish.quantity; // Multiplicar el precio del plato por la cantidad
      }

      if (hasGarnish && item.garnish && item.garnish.price) {
        totalPrice += parseFloat(item.garnish.price);
      }

      // Sumar el precio de las bebidas
      item.drinks.forEach((drink) => {
        if (drink.price) {
          totalPrice += parseFloat(drink.price) * drink.quantity; // Multiplicar el precio de la bebida por la cantidad
        }
      });

      // Sumar el precio de los postres
      item.desserts.forEach((dessert) => {
        if (dessert.price) {
          totalPrice += parseFloat(dessert.price) * dessert.quantity; // Multiplicar el precio del postre por la cantidad
        }
      });
    });
    return totalPrice;
  };

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
  };


  const pedido = {
    userId: currentUser?.id,
    order: formattedCart,
  } 

  const handlePaySubmit = async (e) => {
    e.preventDefault()

     // Crear la preferencia de pago
     if (!preferenceId) {
      await handleBuy();
      return; // No envíes la orden al backend todavía, ya que el usuario será redirigido a Mercado Pago
    }

    try {
      const data = await axios.post(`${server}/completeOrder`, pedido)
      // const data = await axios.post(`http://localhost:3001/completeOrder`, pedido)
      console.log("DATA POST_________", data.data);
      if (Object.keys(data).length > 0) {
        clearAllCart();
        onCloseCart();
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: '¡Su orden ha sido procesada!',
          showConfirmButton: false,
          timer: 2000
        })
      }  else {
        Swal.fire({
          icon: 'error',
          title: '¡Hubo un error. Su orden fue rechazada!',
          showConfirmButton: false,
          timer: 2000
          })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={style.shoppingCartContainer} style={cartStyle}>
      <div className={style.shoppingCartHeader}>
        <button onClick={onCloseCart} className={style.closeCart}>
          <AiOutlineCloseCircle />
        </button>
        <h2 className={style.shoppingCartTitle}>Aquí esta su orden</h2>
      </div>
      <div className={style.shoppingCartBody}>
        {order === null || order.length === 0 ? (
          <p>Aún no ha realizado ninguna orden</p>
        ) : (
          order.map((item, index) => {
            const hasGarnish = item.garnish !== null;
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
            const capitalizeSubtitle = hasDish ? capitalizeFirstLetter(item.dish.type): '';
            return (
              <div key={index} className={style.productContainer}>
                { hasDish && <div>
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
      
                    <div className={style.quantityButtons}>
                      <button
                        className={style.buttonDelete}
                        onClick={() => removeItem(item.dish.id)}
                      >
                        Eliminar
                      </button>
                      {/* <div className={style.quantityContainer}>
                      <button className={style.buttonQuantity} onClick={() => decreaseQuantity(item.dish.id, item.dish.quantity)}>
                        -
                      </button>
                      <button className={style.buttonQuantity} onClick={() => increaseQuantity(item.dish.id, item.dish.quantity)}>
                        +
                      </button>
                    </div> */}
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
                </div>}

                <div>

                 {hasDessert || hasDrink && <p className={style.subTitle}>{ hasDrink && hasDessert ? 'Bebidas y postres' : hasDessert ? 'Postres' : hasDrink ? 'Bebidas' : null}</p>} 
                  {/* Mapear las bebidas */}
                  { hasDrink && item.drinks.map((drink, drinkIndex) => (
                    <div key={drinkIndex} className={style.additionalContainer}>
                      <div className={style.dishDetailsHeader}>
                        <img
                          className={style.productImage}
                          src={drink.image}
                          alt={drink.name}
                        />
                        <div className={style.dishDetailsInfo}>
                          <h3 className={style.productName}>{drink.name}</h3>

                          <div className={style.dishDetailsInfoUnitPrice}>
                            <p className={style.volumeDrink}>{drink.volume}</p>
                          </div>
                        </div>
                      </div>
                      <div className={style.quantityButtons}>
                        <button
                          className={style.buttonDelete}
                          onClick={() => removeItem(drink.id)}
                        >
                          Eliminar
                        </button>
                        <div className={style.quantityContainer}>
                          <button
                            className={style.buttonQuantity}
                            onClick={() =>
                              decreaseQuantity(drink.id, drink.quantity)
                            }
                          >
                            -
                          </button>
                          <button
                            className={style.buttonQuantity}
                            onClick={() =>
                              increaseQuantity(drink.id, drink.quantity)
                            }
                          >
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
                  {hasDessert && item.desserts.map((dessert, dessertIndex) => (
                    <div
                      key={dessertIndex}
                      className={style.additionalContainer}
                    >
                      <div className={style.dishDetailsHeader}>
                        <img
                          className={style.productImage}
                          src={dessert.image}
                          alt={dessert.name}
                        />
                        <div className={style.dishDetailsInfo}>
                          <h3 className={style.productName}>{dessert.name}</h3>
                        </div>
                      </div>
                      <div className={style.quantityButtons}>
                        <button
                          className={style.buttonDelete}
                          onClick={() => removeItem(dessert.id)}
                        >
                          Eliminar
                        </button>
                        <div className={style.quantityContainer}>
                          <button
                            className={style.buttonQuantity}
                            onClick={() =>
                              decreaseQuantity(dessert.id, dessert.quantity)
                            }
                          >
                            -
                          </button>
                          <button
                            className={style.buttonQuantity}
                            onClick={() =>
                              increaseQuantity(dessert.id, dessert.quantity)
                            }
                          >
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
        disabled={order === null || order.length === 0}
        className={
          order === null || order.length === 0
            ? `${style.payButton} ${style.disabledButton}`
            : style.payButton
        }
      >
        PAGAR <span>{` Suma total $${calculateTotalPrice()}`}</span>
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
      {order.length !== 0 && (
        <button className={style.clearButton} onClick={clearAllCart}>
          YA NO QUIERO ESTA LA ORDEN
        </button>
      )}
    </div>
  );
}

export default ShoppingCart;
