// auth.js
import app from './firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Inicializa Firebase Authentication
const auth = getAuth(app);

// Función para registrar un nuevo usuario
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error en registro:", error.message);
    throw error;
  }
}

// Función para iniciar sesión
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario iniciado sesión:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error.message);
    throw error;
  }
}
