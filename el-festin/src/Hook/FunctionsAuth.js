import Swal from "sweetalert2";
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

export const login = async (email, password) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const logout = () => {
  signOut(auth);
  localStorage.removeItem("customToken");
  Swal.fire({
    icon: "success",
    title: "¡Muchas gracias por su visita, vuelva pronto!",
    showConfirmButton: false,
    timer: 2000,
  })
};

// Acciones para autenticarse con Google o Facebook
export const logingWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);

    // Devolver el usuario autenticado
    return response.user;
  } catch (error) {
    console.error("Error de autenticación con Google:", error.message);
    throw error;
  }
};

// Acciones para enviar el correo de reseteo de contraseña
export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email);
};
