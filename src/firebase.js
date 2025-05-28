import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPlWANqjZZ11B9UFHaMQOcGdiJPCA9LfA",
  authDomain: "kanban-todo-app.firebaseapp.com",
  projectId: "kanban-todo-app",
  storageBucket: "kanban-todo-app.firebasestorage.app",
  messagingSenderId: "165139419766",
  appId: "1:165139419766:web:5384bd2f72cb0394a6c557",
  measurementId: "G-701MX0TKJ1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);