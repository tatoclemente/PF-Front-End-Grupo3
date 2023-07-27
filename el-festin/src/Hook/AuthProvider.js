// ReduxProvider.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "../Redux/slices/authSlice";

import { auth } from "../firebase";
//mantener el estado del usuario cuando esta logueado.
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch(); //

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Si el usuario está autenticado, actualizamos el estado en Redux con setUser
        dispatch(setUser(currentUser));
      } else {
        // Si el usuario no está autenticado, limpiamos el estado en Redux con clearUser
        dispatch(clearUser());
      }
    });
    return () => unsuscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
