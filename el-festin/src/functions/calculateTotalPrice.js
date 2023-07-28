export const calculateTotalPrice = (order) => {
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
