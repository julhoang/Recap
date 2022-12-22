import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { updateDB } from "../firebase-config";
import TextEditor from "./TextEditor";

/**
 * Content is the container where all of the TextEditor components reside in.
 */

export default function Content({ book, bookID }) {
  const [quotes, setQuotes] = useState(
    book.quotes.map((quote, index) => (quote = { ...quote, id: index }))
  );
  const [uid, setUID] = useState(book.quotes.length - 1);

  /**
   * Create a new highlight box by adding an empty 'quote' object to quotes
   * React will re-render the page as 'quotes' has changed.
   */
  function addNewHighlightBox() {
    const quote = {
      highlight: "",
      note: "",
      id: uid + 1,
    };
    setUID((prev) => prev + 1);
    setQuotes([...quotes, quote]);
  }

  /**
   * add new quote+note to database
   */
  function saveToDB(allQuotes) {
    updateDB(bookID, { quotes: allQuotes });
    setQuotes(allQuotes);
  }

  /**
   * remove new quote+note from database by id
   */
  function removeFromDB(id) {
    const newQuotes = quotes.filter((quote) => quote.id != id);
    updateDB(bookID, { quotes: newQuotes });
    setQuotes(newQuotes);
  }

  if (quotes.length == 0) {
    addNewHighlightBox();
  } else {
    return (
      <div id="quotes-section">
        <Button onClick={addNewHighlightBox}>Add New Highlight</Button>
        {quotes.map((quote) => {
          return (
            <TextEditor
              key={"editor-" + quote.id.toString()}
              quotes={quotes}
              quote={quote}
              remove={removeFromDB}
              add={saveToDB}
            />
          );
        })}
      </div>
    );
  }
}
