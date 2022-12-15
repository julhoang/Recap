import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import { firebaseConfig } from "./api";
import { collection } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const booksCollectionRef = collection(db, "books");
