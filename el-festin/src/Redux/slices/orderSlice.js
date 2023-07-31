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
      // console.log("addToCart", action.payload);
      const { dish, garnish, drinks, desserts } = action.payload;

      console.log("PAYLOAD___", action.payload);

      // Crea un objeto newItem con las propiedades proporcionadas o valores por defecto si son null
      const newItem = {
        dish: dish || null,
        garnish: garnish || null,
        drinks: drinks || [],
        desserts: desserts || [],
      };

      if (newItem.dish === null) {
        state.push(newItem);
      } else {
        const existingItemIndex = state.findIndex((item) => {
          return (
            item.dish?.id === newItem.dish?.id &&
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
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      // console.log("REMOVE FROM CART", productId);

      const product = findProductById(state, productId);
      // console.log("ORDER TYPE", product.type);

      if (product) {
        switch (product.type) {
          case "dish":
            // console.log("Dish ID to remove:", productId);
            return state.filter((item) => item.dish?.id !== productId);

          case "drink":
            // console.log("Drink ID to remove:", productId);
            return state.map((item) => {
              if (
                item.drinks?.length === 1 &&
                item.drinks[0]?.id === productId
              ) {
                return { ...item, drinks: [] };
              } else if (item.drinks?.some((drink) => drink.id === productId)) {
                return {
                  ...item,
                  drinks: item.drinks.filter((drink) => drink.id !== productId),
                };
              } else {
                return item;
              }
            });

          case "dessert":
            // console.log("Dessert ID to remove:", productId);
            return state.map((item) => {
              if (
                item.desserts?.length === 1 &&
                item.desserts[0]?.id === productId
              ) {
                return { ...item, desserts: [] };
              } else if (
                item.desserts?.some((dessert) => dessert.id === productId)
              ) {
                return {
                  ...item,
                  desserts: item.desserts.filter(
                    (dessert) => dessert.id !== productId
                  ),
                };
              } else {
                return item;
              }
            });

          default:
            return state;
        }
      }

      return state;
    },

    // carritoSlice.js

    updateCartItemQuantity: (state, action) => {
      const { id } = action.payload;
      console.log("UPDATE CART ITEM QUANTITY", id);  
      const product = findProductById(state, id.id);
      console.log("PRODUCT____", product);

      if (product) {
        switch (product.type) {
          case "dish":
            return state.map((item) =>
              item.dish.id === id.id
                ? { ...item.dish, quantity: id.quantity }
                : item.dish
            );
          case "drink":
            return state.map((item) =>
              item.drinks.some((drink) => drink.id === id.id)
                ? {
                    ...item,
                    drinks: item.drinks.map((drink) =>
                      drink.id === id.id ? { ...drink, quantity: id.quantity } : drink
                    ),
                  }
                : item
            );
          case "dessert":
            return state.map((item) =>
              item.desserts.some((dessert) => dessert.id === id.id)
                ? {
                    ...item,
                    desserts: item.desserts.map((dessert) =>
                      dessert.id === id.id
                        ? { ...dessert, quantity: id.quantity }
                        : dessert
                    ),
                  }
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

    setCartFromDatabase: (state, action) => {
      if (action.payload.length > 0) {
        const cartItems = action.payload;
        console.log("CART ITEMS DB____", cartItems);
        return (state = [...cartItems]);
      }
      return state;
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
    return foundItem && foundItem.quantity === item1.quantity;
  });
};

// Función de utilidad para guardar el carrito en localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCartFromDatabase,
} = cartSlice.actions;
export default cartSlice.reducer;

// Middleware para guardar el carrito en localStorage cuando cambia
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Obtener el carrito actualizado después de la acción
  const updatedCart = store.getState().cart;

  // Guardar el carrito en el local storage
  saveCartToLocalStorage("cart", JSON.stringify(updatedCart));

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

localStorage.removeItem("cart");
