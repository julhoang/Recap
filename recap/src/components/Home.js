import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
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
    console.log("from useEffects!");
    getBooks();
  }, []);

  // receive change notification from the "Add New Book button" from <Header/>
  const onChangeDB = () => {
    console.log("from onChange");
    getBooks();
  };

  return (
    <div className="home">
      <SearchBar />

      <Header onChangeDB={onChangeDB} />

      <div class="row justify-content-center" id="glance">
        <div class="col">
          <Goal onChangeDB={onChangeDB} books={progress} />
        </div>

        <div class="col">
          <Review onChangeDB={onChangeDB} books={completed} />
        </div>
      </div>

      <Database progress={progress} completed={completed} />
    </div>
  );
}
