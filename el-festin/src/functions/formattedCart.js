export const formattedCart = (order) => {
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

    return formattedCart;
}