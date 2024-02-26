import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDJUqQTXFtAv2v9J36tfJvPgvxUQezRkP0",
    authDomain: "qrdb-549d6.firebaseapp.com",
    projectId: "qrdb-549d6",
    storageBucket: "qrdb-549d6.appspot.com",
    messagingSenderId: "1023399242735",
    appId: "1:1023399242735:web:1b8d194425a8282597e41a"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
