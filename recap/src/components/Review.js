import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FiRefreshCcw } from "react-icons/fi";

function ReviewQuote({ book }) {
  try {
    let random = Math.floor(Math.random() * book.quotes.length);
    if (book.quotes.length != 0) {
      return <p>"{book.quotes[random]}"</p>;
    }
  } catch (err) {
    console.log("err from ReviewQuote");
  }
  return <p>You have no saved highlights.</p>;
}

export default function Review({ books }) {
  const [chosenBook, setChosenBook] = useState();
  const [message, setMessage] = useState("Finish A Book to Start Review");
  const [count, setCount] = useState(0); // for debug

  const reloadQuote = () => {
    let bookCount = books.length; // can be undefined
    setCount(bookCount);

    let random = Math.floor(Math.random() * bookCount);
    setChosenBook(books[random]);

    setMessage(
      <span>
        Review: <span id="glance-title">{books[random].title}</span>
      </span>
    );
  };

  useEffect(() => {
    try {
      reloadQuote();
    } catch (err) {
      console.error();
    }
  }, [books]);

  return (
    <div>
      <div id="review-header">
        <h2>Daily Review</h2>
        <Button variant="light" onClick={reloadQuote}>
          <FiRefreshCcw />
        </Button>
      </div>

      <div id="review-quotes-area">
        <ReviewQuote book={chosenBook} />
      </div>

      <Button variant="secondary">{message}</Button>
    </div>
  );
}
