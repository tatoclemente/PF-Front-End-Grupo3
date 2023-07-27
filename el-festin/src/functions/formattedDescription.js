export const formattedDescription = (order) => {
    const orderDescriptions = order.reduce((descriptions, item) => {
        if (item.dish) {
          const dishDescription = item.garnish
            ? `${item.quantity} ${item.dish.name} con ${item.garnish.name}`
            : `${item.quantity} ${item.dish.name}`;
          descriptions.push(dishDescription);
        }
    
        if (item.drinks) {
          item.drinks.forEach((drink) => {
            descriptions.push(`${drink.quantity} ${drink.name}`);
          });
        }
    
        if (item.desserts) {
          item.desserts.forEach((dessert) => {
            descriptions.push(`${dessert.quantity} ${dessert.name}`);
          });
        }
    
        return descriptions;
      }, []);
    
      const preferenceDescription = orderDescriptions.join(", ");
    
      console.log(preferenceDescription);
      return preferenceDescription;
}