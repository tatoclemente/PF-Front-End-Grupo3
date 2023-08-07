import React from 'react'
import styleModal from './Modal.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import capitalizeFirstLetter from '../../../functions/capitalizeFirstLetter'

function Modal({ setShowModal, selectedItem }) {
  

  const { pedido, name, lastName } = selectedItem[0]; // Información del usuario
  const orderItems = selectedItem.slice(1); // Detalles de los items de la orden

  console.log(orderItems);

  const transformedOrderItems = orderItems && orderItems.map((item) => {
    const transformedDrinks = item.drinks?.map((drink) => drink.drink); // Extraer solo los valores de drinks
    const transformedDesserts = item.desserts?.map((dessert) => dessert.dessert); // Extraer solo los valores de desserts
  
    return {
      ...item,
      drinks: transformedDrinks,
      desserts: transformedDesserts,
    };
  });

  console.log(transformedOrderItems);
  
  // La variable transformedOrderItems ahora contiene el array transformado con los valores sin las claves
  
  return (
    <>
      {/* Capa semi-transparente */}
      <div className={styleModal.overlay} onClick={() => setShowModal(false)}></div>

      <div className={styleModal.modal}>
        <div className={styleModal.headersClose}>
          <button onClick={() => setShowModal(false)} className={styleModal.closeButton}><AiFillCloseCircle /></button>
        </div>
        <section className={styleModal.header}>
          <p className={styleModal.title}>¡Muchas gracias por su compra {name}{lastName !== null && (" ", lastName)}!</p>
          <span className={styleModal.orderNumber}>Detalles del pedido N°: <b>{pedido}</b></span>
        </section>
        <section className={styleModal.bodyDetail}>
          {transformedOrderItems.map((item, index) => {

            const hasGarnish = item.garnish && item.garnish !== null;
            const hasDrink = item.drinks && item.drinks.length > 0;
            console.log(hasDrink);
            const hasDessert = item.desserts && item.desserts.length > 0;
            const hasDish = item.dish && item.dish !== null;
            // const totalPrice =
            //   (hasDish ? parseFloat(item.dish.price) * item.dish.quantity : 0) +
            //   (hasGarnish
            //     ? parseFloat(item.garnish.price) * item.garnish.quantity
            //     : 0) +
            //   (hasDrink
            //     ? item.drinks.reduce(
            //         (acc, drink) => acc + drink.price * drink.quantity,
            //         0
            //       )
            //     : 0) +
            //   (hasDessert
            //     ? item.desserts.reduce(
            //         (acc, dessert) => acc + dessert.price * dessert.quantity,
            //         0
            //       )
            //     : 0);
            const capitalizeSubtitle = hasDish
              ? capitalizeFirstLetter(item.dish.name)
              : "";

            return (

              <div key={index} className={styleModal.productContainer}>
                {hasDish && (
                  <div className={styleModal.dishDetails}>
                    <div className={styleModal.dishDetailsHeader}>
                      <img
                        className={styleModal.productImage}
                        src={item.dish.image}
                        alt={item.dish.name}
                      />
                      <div className={styleModal.dishDetailsInfo}>
                        <h3 className={styleModal.productName}>
                          {item.dish.name}{" "}
                          {hasGarnish && `con ${item.garnish.name}`}
                        </h3>
                        <div className={styleModal.dishDetailsInfoUnitPrice}>
                          <p className={styleModal.unitPrice}>
                            Precio del plato: ${item.dish.price}
                          </p>
                          {hasGarnish && (
                            <p className={styleModal.unitPrice}>
                              Precio de la guarnición: ${item.garnish.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className={styleModal.quantityButtons}>
                        <button
                          className={styleModal.buttonDelete}
                          onClick={() => removeItem(item.dish.id)}>
                          Eliminar combo
                        </button>
                      </div>
                      <div className={styleModal.dishDetailsFooter}> */}
                    {/* <p className={styleModal.totalPrice}>
                          Su orden suma: ${totalPrice}
                        </p> */}
                    {/* </div> */}
                  
                  </div>
                  
                  
          
                )}
                <div>
                  {/* {hasDessert ||
                    (hasDrink && (
                      <p className={styleModal.subTitle}>
                        {hasDrink && hasDessert
                          ? "Bebidas y postres"
                          : hasDessert
                          ? "Postres"
                          : hasDrink
                          ? "Bebidas"
                          : null}
                      </p>
                    ))} */}
                  {/* Mapear las bebidas */}
                  {hasDrink && hasDrink !== undefined &&
                    item.drinks?.map((drink, drinkIndex) => (
                      <div
                        key={drinkIndex}
                        className={styleModal.additionalContainer}>
                        <div className={styleModal.dishDetailsHeader}>
                          <img
                            className={styleModal.productImage}
                            src={drink.image}
                            alt={drink.name}
                          />
                          <div className={styleModal.dishDetailsInfo}>
                            <h3 className={styleModal.productName}>{drink.name}</h3>

                            <div className={styleModal.dishDetailsInfoUnitPrice}>
                              <p className={styleModal.volumeDrink}>
                                {drink.volume}
                              </p>
                            </div>
                          </div>
                        </div>
              
                        <div className={styleModal.dishDetailsFooterAdditionals}>
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
                        className={styleModal.additionalContainer}>
                        <div className={styleModal.dishDetailsHeader}>
                          <img
                            className={styleModal.productImage}
                            src={dessert.image}
                            alt={dessert.name}
                          />
                          <div className={styleModal.dishDetailsInfo}>
                            <h3 className={styleModal.productName}>
                              {dessert.name}
                            </h3>
                          </div>
                        </div>
  
                        <div className={styleModal.dishDetailsFooterAdditionals}>
                          <p>Precio: ${dessert.price}</p>
                          <p>Cantidad: {dessert.quantity}</p>
                        </div>
                      </div>
                    ))}
                </div>
               
              </div>


            )
          })}
          <h6 className={styleModal.totalPrice}>Su orden suma:<b>&nbsp;${orderItems[orderItems.length - 1].totalTicketPrice}</b></h6>
        </section>

      </div>
    </>
  )
}

export default Modal