// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRFp0gCcma6vwp9jOoGbC1oXHBkdisRJQ",
  authDomain: "chatapp-c8a43.firebaseapp.com",
  projectId: "chatapp-c8a43",
  storageBucket: "chatapp-c8a43.appspot.com",
  messagingSenderId: "840791335102",
  appId: "1:840791335102:web:5e74929273035582a33eef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
