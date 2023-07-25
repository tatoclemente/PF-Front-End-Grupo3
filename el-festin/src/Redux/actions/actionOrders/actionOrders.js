
// actions.js

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
  clearCart as clearCartAction,
} from '../../slices/orderSlice';

// Action asíncrona para agregar un producto al carrito
export const addToCart = (product) => (dispatch) => {
  dispatch(addToCartAction(product));
};

// Action para eliminar un producto del carrito
export const removeFromCart = (product) => (dispatch) => {
  console.log(product);
  dispatch(removeFromCartAction(product));
};

// Action para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch(updateCartItemQuantityAction({ id: productId, quantity }));
};

// Action para limpiar el carrito (vaciarlo)
export const clearCart = () => (dispatch) => {
  dispatch(clearCartAction());
};
