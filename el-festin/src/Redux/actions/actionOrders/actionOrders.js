
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
  clearCart as clearCartAction,
} from '../../slices/cartSlice';

// Action asíncrona para agregar un producto al carrito
export const addToCart = (product) => (dispatch) => {
  dispatch(addToCartAction(product));
};

// Action para eliminar un producto del carrito
export const removeFromCart = (productId) => (dispatch) => {
  dispatch(removeFromCartAction(productId));
};

// Action para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch(updateCartItemQuantityAction({ id: productId, quantity }));
};

// Action para limpiar el carrito (vaciarlo)
export const clearCart = () => (dispatch) => {
  dispatch(clearCartAction());
};



// // Puedes implementar la lógica de persistencia en el servidor aquí, si es necesario
// export const persistCart = (cartItems) => async () => {
//   try {
//     // Aquí puedes realizar una llamada a tu API para guardar el carrito en el servidor
//     // Por ejemplo:
//     // await axios.post('https://tu-api.com/save-cart', { cartItems });
//     console.log('Carrito persistido en el servidor:', cartItems);
//   } catch (error) {
//     console.log('Error al persistir el carrito en el servidor:', error);
//   }
// };
