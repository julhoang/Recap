import React from "react";
import { useState, useEffect } from "react";
import { db, booksCollectionRef } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Emoji from "./Emoji";

export default function Content({ data, api }) {
  const [book, setBook] = useState(data);
  const [quotes, setQuotes] = useState([]);

  const Quotes = () => {
    return (
      <div id="quotes-section">
        {quotes.map((quote) => {
          return (
            <div className="quotes">
              <Emoji symbol="💡" /> <span>"{quote}"</span>
            </div>
          );
        })}
      </div>
    );
  };
  const loadQuotes = async () => {
    try {
      setQuotes(book.quotes);
      quotes.map((quote) => {});
    } catch (err) {
      console.log("book still loading");
    }
  };

  useEffect(() => {
    setBook(data);
  });

  useEffect(() => {
    loadQuotes();
  }, [book]);

  return <Quotes />;
}
