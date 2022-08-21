import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Content() {
  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBooks();
  }, []);

  return (
    <div>
      <h1>Hello </h1>
      <p>Start Content</p>

      {books.map((book) => {
        return (
          <div>
            <h1>Title: {book.title}</h1>
            <h2>Author: {book.author}</h2>
            <p>Rating: {book.rating}</p>
          </div>
        );
      })}
    </div>
  );
}
