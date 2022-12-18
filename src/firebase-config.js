import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from "./api";
import { collection, doc, updateDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const booksCollectionRef = collection(db, "books");

/**
 * Purpose: update a particular field in a book
 */
export function updateDB(bookID, field, value) {
  const ref = doc(db, "books", bookID);
  updateDoc(ref, {
    [field]: value,
  });
}
