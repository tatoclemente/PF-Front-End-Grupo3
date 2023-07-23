  // Función para calcular el total de ítems en el carrito
  const calculateTotalItems = (order) => {
    let totalItems = 0;
    order && order.forEach((item) => {
      totalItems += item.quantity;
      totalItems += item.drinks.length; // Sumar la cantidad de bebidas
      totalItems += item.desserts.length; // Sumar la cantidad de postres
    });
    return totalItems;
  };

  console.log(calculateTotalItems());

  export default calculateTotalItems;