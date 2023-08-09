import React from "react";
import style from '../AllRequests.module.css'

import { Divider } from "@tremor/react";




export const DetailReserv = ({detail, pedido, handleStatus, handleStatusEntrega, handleStatusEnProceso}) =>{

    function formatPedido(pedido) {
        if (!pedido || pedido.length === 0) {
            return [];
        }
    
        const formattedPedido = pedido.map((item) => {
            const formattedItem = {};
    
            // Extract dish information if available
            if (item.dish) {
                formattedItem.dish = {
                    name: item.dish.name,
                    quantity: item.dish.quantity
                };
            }
    
            // Extract drinks information if available
            if (item.drinks && item.drinks.length > 0) {
                formattedItem.drinks = item.drinks.map((drink) => ({
                    name: drink.drink.name,
                    quantity: drink.drink.quantity
                }));
            }
    
            if (item.desserts && item.desserts.length > 0) {
                formattedItem.desserts = item.desserts.map((dessert) => ({
                    name: dessert.dessert.name,
                    quantity: dessert.dessert.quantity
                }));
            }
            if (item.garnish && item.garnish.length > 0) {
                formattedItem.garnish = item.garnish.map((garnish) => ({
                    name: garnish.name,
                    quantity: garnish.quantity
                }));
            }
    
            return formattedItem;
        });
    
        return formattedPedido;
    }
    
    // Usage example
    const formattedPedido = formatPedido(pedido);


    return(
        <div className={style.contDet}>
           
            <div>
                {detail.price !== 0 ? detail.map((a, index) => {
                    return(
                        
                        <div key={index}>
                             <h4 className={style.titleDet}>Ticket</h4>
                             <Divider/>
                            <div className={style.conDetailWords}>
                            <span>Nombre: {a.user.name}</span>
                            </div>
                            <div className={style.conDetailWords}>
                            <span>Correo: {a.user.email}</span>
                            </div>
                            <div className={style.conDetailWords}>
                            <span>Fecha: {a.date} Hora: {a.time}</span>
                            
                            </div>
                    
                            
                            <Divider/>
                            <div className={style.conDetailWords}>
                                <h6>Numero de Orden: {a.order}</h6>
                            </div>
                            {formattedPedido &&
    formattedPedido.map((a, index) => {
        return (
            <div key={index}>

                {a.dish && (
                    <div className={style.contPedidos}>
                        <span>Plato: {a.dish.name}</span>
                        <span>Cantidad: {a.dish.quantity}</span>
                    </div>
                )}
                {a.drinks && a.drinks.length > 0 && (
                                    <div>
                                        {a.drinks.map((drink, drinkIndex) => (
                                            <div className={style.contPedidos} key={drinkIndex}>
                                                <span>Bebida: {drink.name}</span>
                                                <span>Cantidad: {drink.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                  {a.desserts && a.desserts.length > 0 && (
                                    <div>
                                        {a.desserts.map((dessert, dessertIndex) => (
                                            <div className={style.contPedidos} key={dessertIndex}>
                                                <span>Postre: {dessert.name}</span>
                                                <span>Cantidad: {dessert.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                 {a.garnish && a.garnish.length > 0 && (
                                    <div>
                                        {a.garnish.map((garnish, garnishIndex) => (
                                            <div className={style.contPedidos} key={garnishIndex}>
                                                <span>Guarnición: {garnish.name}</span>
                                                <span>Cantidad: {garnish.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
            </div>
        );
    })}
                 <div className={style.contPedidos}>
                    <span>Total: ${a.price}</span>
                    </div>
                            <Divider/>
                            {a.status === 'Aprobado' ? <div>
                            <button onClick={handleStatusEnProceso} data-value={a.order} className={style.detButton}>Empezar</button>
                            </div> : a.status === 'En proceso' ? <div>
                            <button onClick={handleStatus} data-value={a.order} className={style.detButton}>Completar</button>
                            </div> : a.status === 'Completo' ? <div>
                            <button onClick={handleStatusEntrega} data-value={a.order} className={style.detButton}>Entregar</button>
                            </div>  : <div>
                                <h6>El pedido esta {a.status} </h6>
                                </div>}
                            
                        </div>
                    )
                }): <h4>Selecciona un pedido para poder ver sus detalles</h4>}
            </div>
        </div>
    )
}