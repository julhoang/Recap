import React from "react";
import { useState, useEffect } from "react";
import Emoji from "./Emoji";
import TextEditor from "./TextEditor";

export default function Content({ data, api }) {
  const [book, setBook] = useState(data);
  const [quotes, setQuotes] = useState([]);

  const loadQuotes = async () => {
    try {
      setQuotes(book.quotes);
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

  return (
    <div id="quotes-section">
      {quotes.map((quote, id) => {
        return (
          <div className="quote-comment-block">
            <div className="quotes">
              <Emoji symbol="💡" />
              <br></br>
              {quote.highlight}
            </div>
            <hr class="solid"></hr>
            <TextEditor
              quotes={quotes}
              quote={quote}
              id={id}
            />
          </div>
        );
      })}
    </div>
  );
}
