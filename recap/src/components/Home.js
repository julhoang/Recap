import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import AddBook from "./AddBook";
import Goal from "../components/Goal";
import Review from "../components/Review";
import Database from "../components/Database";

export default function Home() {
  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "books");
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);

  const getBooks = async () => {
    // load data from Firebase
    const data = await getDocs(booksCollectionRef);
    const localBooks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    updateBooks(localBooks);

    setBooks(localBooks, console.log("setBooks"));
  };

  const updateBooks = (data) => {
    const progressArr = data.filter((book) => {
      return !book.completed;
    });

    const completeArr = data.filter((book) => {
      return book.completed;
    });

    setCompleted(completeArr);
    setProgress(progressArr);
  };

  useEffect(() => {
    getBooks();
  }, []);

  // receive change notification from the "Add New Book button" from <AddBook/>
  const onChangeDB = () => {
    getBooks();
  };

  return (
    <div className="home">
      {/* TODO: implement search bar */}
      {/* <SearchBar />  */}
      <AddBook onChangeDB={onChangeDB} />
      <div class="row justify-content-center" id="glance">
        <div class="col">
          <Goal onChangeDB={onChangeDB} completed={completed} progress={progress} />
        </div>

        <div class="col">
          <Review onChangeDB={onChangeDB} books={completed} />
        </div>
      </div>
      <Database progress={progress} completed={completed} />
    </div>
  );
}
