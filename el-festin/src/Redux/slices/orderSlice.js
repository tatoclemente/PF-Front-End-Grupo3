// carritoSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Obtenemos el carrito guardado en localStorage (si existe)
const storedCart = localStorage.getItem("cart");
const initialState = storedCart ? JSON.parse(storedCart) : [];


const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart", action.payload);
      const { dish, garnish, drinks, desserts } = action.payload;
      const newItem = {
        dish: dish,
        garnish: garnish,
        drinks: drinks,
        desserts: desserts,
      };

      const existingItemIndex = state.findIndex((item) => {
        return (
          item.dish.id === newItem.dish.id &&
          item.garnish?.id === newItem.garnish?.id &&
          compareItems(item.drinks, newItem.drinks) &&
          compareItems(item.desserts, newItem.desserts)
        );
      });

      if (existingItemIndex !== -1) {
        // Si el pedido ya existe en el carrito, solo actualiza la cantidad
        state[existingItemIndex].quantity += 1;
      } else {
        // Si el pedido no existe en el carrito, agrégalo con cantidad 1
        state.push({ ...newItem, quantity: 1 });
      }
    },


    

    // removeFromCart: (state, action) => {
    //   console.log("removeFromCart", action.payload);
    //   const { dish, garnish, drinks, desserts } = action.payload;

    //   return state.filter((item) => {
    //     const hasGarnish = item.garnish !== null;
    //     const hasDrinks = item.drinks !== undefined;

    //     const isDishMatch = item.dish && item.dish.id === dish?.id;
    //     const isGarnishMatch = hasGarnish && item.garnish && item.garnish.id === garnish?.id;
    //     const areDrinksMatch = hasDrinks && compareItems(item.drinks, drinks);
    //     const areDessertsMatch = compareItems(item.desserts, desserts);

    //     return !(isDishMatch && isGarnishMatch && areDrinksMatch && areDessertsMatch);
    //   });
    // },

      // Action para eliminar un producto del carrito por su ID
      removeFromCart: (state, action) => {
        const productId = action.payload;
        const product = findProductById(state, productId);
        if (product) {
          switch (product.type) {
            case "dish":
              return state.filter((item) => item.dish?.id !== productId);
            case "drink":
              return state.map((item) => ({
                ...item,
                drinks: item.drinks.filter((drink) => drink.id !== productId),
              }));
            case "dessert":
              return state.map((item) => ({
                ...item,
                desserts: item.desserts.filter((dessert) => dessert.id !== productId),
              }));
            default:
              return state;
          }
        }
        return state;
      },
  
    
    

    // updateCartItemQuantity: (state, action) => {
    //   console.log("updateCartItemQuantity", action.payload);

    //   const { id, quantity } = action.payload;
    //   return state.map((item) => {
    //     if (item.dish.id === id) {
    //       return { ...item, quantity: quantity };
    //     }
    //     return item;
    //   });
    // },


    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = findProductById(state, id);
      console.log("PRODUCTO ENCONTRADO", product);
      if (product) {
        switch (product.type) {
          case "dish":
            return state.map((item) =>
              item.dish.id === id ? { ...item.dish, quantity: quantity } : item.dish
            );
          case "drink":
            return state.map((item) =>
              item.drinks.some((drink) => drink.id === id)
                ? { ...item, drinks: item.drinks.map((drink) => (drink.id === id ? { ...drink, quantity: quantity } : drink)) }
                : item
            );
          case "dessert":
            return state.map((item) =>
              item.desserts.some((dessert) => dessert.id === id)
                ? { ...item, desserts: item.desserts.map((dessert) => (dessert.id === id ? { ...dessert, quantity: quantity } : dessert)) }
                : item
            );
          default:
            return state;
        }
      }
      return state;
    },

    
    
    
    clearCart: (state) => {
      return [];
    },
  },
});

// Función de utilidad para comparar elementos seleccionados (bebidas o postres)
const compareItems = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false; // Si alguno de los argumentos no es un arreglo, no se pueden comparar
  }

  if (arr1.length !== arr2.length) {
    return false; // Si los arreglos tienen diferente longitud, no son iguales
  }

  return arr1.every((item1) => {
    const foundItem = arr2.find((item2) => item2.id === item1.id);
    return foundItem && foundItem.cantidad === item1.cantidad;
  });
};


// Función de utilidad para guardar el carrito en localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;


// Middleware para guardar el carrito en localStorage cuando cambia
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === addToCart.type ||
    action.type === removeFromCart.type ||
    action.type === updateCartItemQuantity.type ||
    action.type === clearCart.type
  ) {
    const updatedCart = store.getState().cart;
    saveCartToLocalStorage(updatedCart);
  }
  return result;
};


// Función para encontrar un producto por su ID en el carrito
const findProductById = (state, id) => {
  // Buscar en cada elemento del carrito
  for (const item of state) {
    // Verificar si el ID corresponde a un plato (dish)
    if (item.dish?.id === id) {
      return { type: "dish", item: item.dish };
    }

    // Verificar si el ID corresponde a una bebida (drink)
    for (const drink of item.drinks || []) {
      if (drink.id === id) {
        return { type: "drink", item: drink };
      }
    }

    // Verificar si el ID corresponde a un postre (dessert)
    for (const dessert of item.desserts || []) {
      if (dessert.id === id) {
        return { type: "dessert", item: dessert };
      }
    }
  }

  // Si no se encontró el producto, retornar null
  return null;
};