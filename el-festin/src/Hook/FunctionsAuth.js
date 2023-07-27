import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

// Thunks para las acciones de autenticación usando Firebase
export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

// Acciones para autenticarse con Google o Facebook
export const logingWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

// Acciones para enviar el correo de reseteo de contraseña
export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email);
};
