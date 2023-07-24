const calculateTotalItems = (order) => {

  if (!Array.isArray(order)) {
    return 0; // Si order no es un array o es null/undefined, devolver 0
  }

  let totalItems = 0;
  order.forEach((item) => {
    totalItems += item.quantity || 0; // Sumar la cantidad del artículo (si existe)

    // Sumar la cantidad de bebidas (si existe y es un array)
    if (item.drinks && Array.isArray(item.drinks)) {
      item.drinks.forEach((drink) => {
        totalItems += drink.quantity || 0;
      });
    }

    // Sumar la cantidad de postres (si existe y es un array)
    if (item.desserts && Array.isArray(item.desserts)) {
      item.desserts.forEach((dessert) => {
        totalItems += dessert.quantity || 0;
      });
    }
  });
  return totalItems;
};

export default calculateTotalItems;
