// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAKSbLhB4rQa_V7nAwy_AvUYFLwDoqM6EA",

  authDomain: "churchifystorage.firebaseapp.com",

  projectId: "churchifystorage",

  storageBucket: "churchifystorage.appspot.com",

  messagingSenderId: "490939814196",

  appId: "1:490939814196:web:c840160e704c891a771561"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}