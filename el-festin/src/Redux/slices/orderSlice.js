// carritoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
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

    removeFromCart: (state, action) => {
      const productId = action.payload;
      return state.filter((item) => item.id !== productId);
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    
    clearCart: (state) => {
      return [];
    },
  },
});

// Función de utilidad para comparar elementos seleccionados (bebidas o postres)
const compareItems = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item1) => {
    const foundItem = arr2.find((item2) => item2.id === item1.id);
    return foundItem && foundItem.cantidad === item1.cantidad;
  });
};

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
