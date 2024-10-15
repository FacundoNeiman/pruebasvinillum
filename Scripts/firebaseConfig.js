// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Y-w7ME5s8Wi53pKXldQxWF2pIpiI8Jk",
  authDomain: "vinillum-f3ebf.firebaseapp.com",
  projectId: "vinillum-f3ebf",
  storageBucket: "vinillum-f3ebf.appspot.com",
  messagingSenderId: "952341530390",
  appId: "1:952341530390:web:8abce3d6d9418b4196f237",
  measurementId: "G-L5KY5VMF3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

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
    return userCredential.user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error.message);
    throw error;
  }
}

export async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Sign Out Error', error);
  }
}

export function getUserLog() {
  return auth;
}
