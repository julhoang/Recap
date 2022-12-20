import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FiRefreshCcw } from "react-icons/fi";
import { NavLink } from "react-router-dom";

/**
 * @constructor
 * @param: {array} books
 * @returns the Daily Review Section
 */
export default function Review({ books }) {
  const [chosenBook, setChosenBook] = useState(undefined);
  const [message, setMessage] = useState("Finish A Book to Start Review");
  const [link, setLink] = useState("/");

  // Purpose: Load New Quote Upon starting, or if user click reload button
  // Update: chosenBook, link, and review message
  const reloadQuote = () => {
    let bookCount = books.length;
    let random = Math.floor(Math.random() * bookCount);
    let chosenBook = books[random];

    setChosenBook(chosenBook);
    setLink("/editor?id=" + chosenBook.id);
    setMessage(
      <span>
        Review: <span id="glance-title">{chosenBook.title}</span>
      </span>
    );
  };

  // Purpose: update quote once {array} books finished loading
  useEffect(() => {
    reloadQuote();
  }, []);

  return (
    <div>
      {/* Section Heading */}
      <div id="review-header">
        <h2>Daily Review</h2>
        <Button
          variant="light"
          onClick={reloadQuote}
        >
          <FiRefreshCcw />
        </Button>
      </div>

      {/* Review Quote Area */}

      {chosenBook && (
        <div id="review-quotes-area">
          <ReviewQuote book={chosenBook} />
        </div>
      )}

      {/* Button Link to Editor */}
      <NavLink to={link}>
        <Button variant="secondary">{message}</Button>
      </NavLink>
    </div>
  );
}

// ---- HELPER FUNCTIONS ----

/**
 * Purpose: Pick a random quote from the chosenbook
 * @param: book [Object]
 * @returns a book quote or friendly error message
 */
function ReviewQuote({ book }) {
  let random = Math.floor(Math.random() * book.quotes.length);
  if (book.quotes.length !== 0) {
    return <p>"{book.quotes[random].highlight}"</p>;
  }

  return <p>You have no saved highlights in this book.</p>;
}
