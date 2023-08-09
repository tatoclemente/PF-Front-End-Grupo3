// actions.js
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
  clearCart as clearCartAction,
  setCartFromDatabase as setCartFromDatabaseAction,
} from "../../slices/orderSlice";

// Acción asíncrona para agregar un producto al carrito y guardar el carrito en el backend
export const addToCart = (item) => async (dispatch, getState) => {
  // ... (lógica existente para agregar el producto al carrito)  // Despachar la acción para agregar el producto al carrito

  
  dispatch(addToCartAction(item));
  // Obtener el carrito actualizado después de agregar el producto
  let updatedCart = getState().cart;

  const cartItems = {
    cartItems: updatedCart,
  };

  const updatedCartItems = {
    cartItems: updatedCart,
  };

  // console.log("__UPDATE CART_____", updatedCartItems);
  try {
    // Obtener el token del usuario desde el local storage
    const token = localStorage.getItem("customToken");
    //  console.log("TOKEN___", token);
    // Verificar que el token existe antes de hacer la solicitud
    if (token) {
      // Configurar el header con el token de autorización
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Realizar la petición GET a la API para obtener el carrito actual del usuario
      const response = await axios.get(`${server}/cart`, config);

      // Verificar si el usuario ya tiene un carrito en la base de datos
      if (response.data && response.data.cart.length > 0) {
        // Si el usuario ya tiene un carrito, realizar una solicitud PUT para actualizarlo con los datos actualizados del carrito local
        await axios.put(`${server}/cart`, updatedCartItems, config);
        console.log("Carrito actualizado en el backend:");
      } else {
        // Si el usuario no tiene un carrito, realizar una solicitud POST para crear un nuevo carrito en la base de datos
        await axios.post(`${server}/cart`, cartItems, config);
      }
      console.log("Carrito guardado en el backend:", cartItems);
    } else {
      console.error(
        "No se encontró el token en el local storage. No se puede guardar el carrito en el backend."
      );
      // Manejar el caso en el que el token no existe
    }
  } catch (error) {
    console.error("Error al guardar el carrito en el backend:", error);
    // Manejar el error de manera adecuada (por ejemplo, mostrar un mensaje de error en la interfaz)
  }

};

// Action para eliminar un producto del carrito
export const removeFromCart = (product) => async (dispatch, getState) => {
  // console.log(product);

  try {
    dispatch(removeFromCartAction(product));
    // Obtener el carrito actualizado después de eliminar el producto
    const updatedCart = getState().cart;
    // console.log("UPDATED CART_____",updatedCart);
    // Obtener el token del usuario desde el local storage
    const token = localStorage.getItem("customToken");

    // Verificar que el token existe antes de hacer la solicitud
    if (token) {
      // Configurar el header con el token de autorización
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud PUT al backend para actualizar el carrito en la base de datos
      await axios.put(`${server}/cart`, { cartItems: updatedCart }, config);

      console.log("Carrito actualizado en el backend:");
    } else {
      console.error(
        "No se encontró el token en el local storage. No se puede actualizar el carrito en el backend."
      );
      // Manejar el caso en el que el token no existe
    }
  } catch (error) {
    console.error("Error al actualizar el carrito en el backend:", error);
    // Manejar el error de manera adecuada (por ejemplo, mostrar un mensaje de error en la interfaz)
  }
};

// Action para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = (productId, quantity) => async (dispatch, getState) => {
  console.log("UPDATE QUANTITY", productId);
  try {
    // Despachar la acción para actualizar la cantidad del producto en el carrito localmente
    dispatch(updateCartItemQuantityAction({ id: productId, quantity }));

    // Obtener el carrito actualizado después de actualizar la cantidad del producto
    const updatedCart = getState().cart;

    // Obtener el token del usuario desde el local storage
    const token = localStorage.getItem("customToken");

    // Verificar que el token existe antes de hacer la solicitud
    if (token) {
      // Configurar el header con el token de autorización
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud PUT al backend para actualizar el carrito en la base de datos
      await axios.put(`${server}/cart`, { cartItems: updatedCart }, config);

      console.log("Carrito actualizado en el backend:", updatedCart);
    } else {
      console.error(
        "No se encontró el token en el local storage. No se puede actualizar el carrito en el backend."
      );
      // Manejar el caso en el que el token no existe
    }
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito:",
      error
    );
    // Manejar el error de manera adecuada (por ejemplo, mostrar un mensaje de error en la interfaz)
  }

};

// Action para limpiar el carrito (vaciarlo)
export const clearCart = () => async (dispatch) => {
  try {
    // Despachar la acción para limpiar el carrito localmente
    dispatch(clearCartAction());
  
  } catch (error) {
    console.error("Error al eliminar el carrito de la base de datos:", error);
    // Manejar el error de manera adecuada (por ejemplo, mostrar un mensaje de error en la interfaz)
  }
};

export const deleteCartDataBase = () => async () => {
  try {
     // Obtener el token del usuario desde el local storage
    const token = localStorage.getItem("customToken");

    // Verificar que el token existe antes de hacer la solicitud
    if (token) {
      // Configurar el header con el token de autorización
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud DELETE al backend para eliminar el carrito de la base de datos
      await axios.delete(`${server}/cart`, config);

      console.log("Carrito eliminado de la base de datos.");
    } else {
      console.error(
        "No se encontró el token en el local storage. No se puede eliminar el carrito de la base de datos."
      );
      // Manejar el caso en el que el token no existe
    }
  } catch (error) {
    console.log('No se pudo eliminar el carrito de la base de datos: ', error);
  }
}
// Función para obtener el carrito desde la base de datos y establecerlo en el estado local
export const setCartFromDatabase = (token) => async (dispatch) => {
  try {
    // console.log("ATION TOKEN", token);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Realizar la petición GET a la API para obtener el carrito
    const response = await axios.get(`${server}/cart`, { headers });

    const cartItems = response.data;

    // Despachar la acción para establecer el carrito en el estado local
    dispatch(setCartFromDatabaseAction(cartItems.cart));
  } catch (error) {
    console.error("Error al obtener el carrito desde la base de datos:", error);
    // Manejar el error de manera adecuada (por ejemplo, mostrar un mensaje de error en la interfaz)
  }
};
