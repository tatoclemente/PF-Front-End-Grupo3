 // Función para calcular el total de ítems en el carrito
const calculateTotalItems = (order) => {

  console.log(order);
  if (!Array.isArray(order)) {
    return 0; // Si order no es un array o es null/undefined, devolver 0
  }

  let totalItems = 0;
  order.forEach((item) => {
    totalItems += item.quantity || 0; // Sumar la cantidad del artículo (si existe)
    totalItems += item.drinks?.length || 0; // Sumar la cantidad de bebidas (si existe y es un array)
    totalItems += item.desserts?.length || 0; // Sumar la cantidad de postres (si existe y es un array)
  });
  return totalItems;
};

export default calculateTotalItems;
