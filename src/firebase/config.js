// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9bnSHC7VXvRXe_qogVVVH2xvD6npzaHY",
  authDomain: "book-store-695e4.firebaseapp.com",
  projectId: "book-store-695e4",
  storageBucket: "book-store-695e4.firebasestorage.app",
  messagingSenderId: "891873877237",
  appId: "1:891873877237:web:9ae3b5ad12f3bb7c1df9bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);