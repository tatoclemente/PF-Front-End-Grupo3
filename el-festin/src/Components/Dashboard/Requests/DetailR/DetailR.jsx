import React from "react";
import style from '../AllRequests.module.css'

import { Divider } from "@tremor/react";




export const DetailReserv = ({ detail, pedido, handleStatus, handleStatusEntrega, handleStatusEnProceso }) => {

  // function formatPedido(pedido) {
  //     if (!pedido || pedido.length === 0) {
  //         return [];
  //     }

  //     const formattedPedido = pedido.map((item) => {
  //         const formattedItem = {};

  //         // Extract dish information if available
  //         if (item.dish) {
  //             formattedItem.dish = {
  //                 name: item.dish.name,
  //                 quantity: item.dish.quantity
  //             };
  //         }

  //         // Extract drinks information if available
  //         if (item.drinks && item.drinks.length > 0) {
  //             formattedItem.drinks = item.drinks.map((drink) => ({
  //                 name: drink.drink.name,
  //                 quantity: drink.drink.quantity
  //             }));
  //         }

  //         if (item.desserts && item.desserts.length > 0) {
  //             formattedItem.desserts = item.desserts.map((dessert) => ({
  //                 name: dessert.dessert.name,
  //                 quantity: dessert.dessert.quantity
  //             }));
  //         }
  //         if (item.garnish && item.garnish.length > 0) {
  //             formattedItem.garnish = item.garnish.map((garnish) => ({
  //                 name: garnish.name,
  //                 quantity: garnish.quantity
  //             }));
  //         }

  //         return formattedItem;
  //     });

  //     return formattedPedido;
  // }

  const orderItems = pedido.slice(1);

  const transformedOrderItems = orderItems && orderItems.map((item) => {
    const transformedDrinks = item.drinks?.map((drink) => drink.drink); // Extraer solo los valores de drinks
    const transformedDesserts = item.desserts?.map((dessert) => dessert.dessert); // Extraer solo los valores de desserts

    return {
      ...item,
      drinks: transformedDrinks,
      desserts: transformedDesserts,
    };
  });


  console.log(pedido);
  // Usage example

  console.log(transformedOrderItems);

  function invertDate(date) {
    const parts = date.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date; // Devuelve la fecha sin cambios si no tiene el formato esperado
  }
  return (
    <div className={style.contDet}>

      <div>
        {detail.price !== 0 ? detail.map((a, index) => {
          return (

            <div key={index}>
              <h4 className={style.titleDet}>Ticket N° {a.order}</h4>
              <Divider />
              <div className={style.headerDetail}>
                <div className={style.conDetailWords}>
                  <span>Nombre: {a.user.name}</span>
                </div>
                <div className={style.conDetailWords}>
                  <span>Correo: {a.user.email}</span>
                </div>
                <div className={style.conDetailWords}>
                  <span>Fecha: {invertDate(a.date)}</span>
                </div>
                <div className={style.conDetailWords}>
                  <span>Hora: {a.time}</span>
                </div>
              </div>


              <Divider />
              {transformedOrderItems &&
                transformedOrderItems.map((a, index) => {
                  const hasGarnish = a.garnish && a.garnish !== null;
                  // const hasDrink = a.drinks && a.drinks.length > 0;
                  // const hasDessert = a.desserts && a.desserts.length > 0;
                  // const hasDish = a.dish && a.dish !== null;
                  return (
                    <div key={index}>

                      {a.dish && (
                        <div className={style.contPedidos}>
                          <span className={style.productName}>
                          {a.dish.quantity}{" "}{a.dish.name}{" "}
                            {hasGarnish && `con ${a.garnish.name}`}
                          </span>
                          <span>${hasGarnish ? parseFloat(a.dish.price) + a.garnish.price : parseFloat(a.dish.price)}</span>
                        </div>
                      )}
                      {a.drinks && a.drinks.length > 0 && (
                        <div>
                          {a.drinks.map((drink, drinkIndex) => (
                            <div className={style.contPedidos} key={drinkIndex}>
                              <span className={style}>{drink.quantity}{" "}{drink.name}</span>
                              <span>${drink.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {a.desserts && a.desserts.length > 0 && (
                        <div>
                          {a.desserts.map((dessert, dessertIndex) => (
                            <div className={style.contPedidos} key={dessertIndex}>
                              <span>{dessert.quantity}{" "}{dessert.name}</span>
                              <span>${dessert.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              <div className={style.totalPriceContainer}>
                <span className={style.totalPrice}>Total: ${a.price}</span>
              </div>
              <Divider />
              {a.status === 'Aprobado' ? <div>
                <button onClick={handleStatusEnProceso} data-value={a.order} className={style.actionButton}>Empezar</button>
              </div> : a.status === 'En proceso' ? <div>
                <button onClick={handleStatus} data-value={a.order} className={style.actionButton}>Completar</button>
              </div> : a.status === 'Completo' ? <div>
                <button onClick={handleStatusEntrega} data-value={a.order} className={style.actionButton}>Entregar</button>
              </div> : <div>
                <h6>El pedido esta {a.status} </h6>
              </div>}

            </div>
          )
        }) : <h4 style={{color:'var(--primary-light'}}>Selecciona un pedido para poder ver sus detalles</h4>}
      </div>
    </div>
  )
}