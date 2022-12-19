import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from "./api";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const booksCollectionRef = collection(db, "books");

/**
 * Purpose: update a particular field in a book
 */
export function updateDB(bookID, newValues) {
  const ref = doc(db, "books", bookID);
  updateDoc(ref, newValues);
}

/**
 * Purpose: delete book from database
 */
export function deleteBook(bookID) {
  deleteDoc(doc(db, "books", bookID));
}
