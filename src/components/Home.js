import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import AddBook from "./AddBook";
import Goal from "../components/Goal";
import Review from "../components/Review";
import Database from "../components/Database";
import { Row, Col } from "react-bootstrap";

/**
 * Home is the major constructor for the main page.
 * It consists of the Add Book buttons, Goal section, Review Sections, and the Database sections (Sumamries Completed and In Progress)
 * It loads the data from Firebase.
 */

export default function Home() {
  const booksCollectionRef = collection(db, "books");
  const [books, setBooks] = useState();
  const [completed, setCompleted] = useState();
  const [progress, setProgress] = useState();

  async function getBooks() {
    const data = await getDocs(booksCollectionRef);
    const localBooks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    updateBooks(localBooks);
    setBooks(localBooks);
  }

  function updateBooks(data) {
    const progressArr = data.filter((book) => {
      return !book.completed;
    });

    const completeArr = data.filter((book) => {
      return book.completed;
    });

    setCompleted(completeArr);
    setProgress(progressArr);
  }

  // load data from Firebase once page finishes render
  useEffect(() => {
    getBooks();
  }, []);

  // receive change notification from the "Add New Book button" from <AddBook/>
  function onChangeDB() {
    getBooks();
  }

  return (
    <div className="home">
      {books && <AddBook onChangeDB={onChangeDB} />}
      {completed && progress && (
        <>
          <div id="glance">
            <Row>
              <Col
                md={6}
                xs={12}
              >
                <Goal
                  completed={completed}
                  progress={progress}
                />
              </Col>
              <hr class="solid d-block d-md-none"></hr>
              <Col
                md={6}
                xs={12}
              >
                <Review
                  onChangeDB={onChangeDB}
                  books={completed}
                />
              </Col>
            </Row>
          </div>
          <Database
            progress={progress}
            completed={completed}
          />
        </>
      )}
    </div>
  );
}
