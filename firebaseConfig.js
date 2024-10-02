// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export default app;