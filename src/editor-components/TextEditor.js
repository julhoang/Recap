import React from "react";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Button from "react-bootstrap/Button";
import Emoji from "./Emoji";

export default function TextEditor({ quotes, quote, id }) {
  const [note, setNote] = useState(quote.note);
  const [highlight, setHighlight] = useState(quote.highlight);
  const [allQuotes, setAllQuotes] = useState(quotes);

  function handleCancel(e) {
    const id = e.target.id.replace("cancel-", "");
    const noteArea = document.getElementById("my-note-" + id);
    noteArea.value = note;
    noteArea.classList.remove("textarea-show");

    const highlightArea = document.getElementById("highlight-" + id);
    highlightArea.value = highlight;
    highlightArea.classList.remove("textarea-show");

    document.getElementById("control-" + id).classList.remove("display");
  }

  function handleSave(e) {
    const id = e.target.id.replace("save-", "");

    const noteArea = document.getElementById("my-note-" + id);
    setNote(noteArea.value);
    noteArea.classList.remove("textarea-show");

    const highlightArea = document.getElementById("highlight-" + id);
    setHighlight(highlightArea.value);
    highlightArea.classList.remove("textarea-show");

    document.getElementById("control-" + id).classList.remove("display");

    allQuotes[id].note = noteArea.value;
    allQuotes[id].highlight = highlightArea.value;
    updateBookInfo();
  }

  // function handleDeleteHighlight(e) {
  //   const id = e.target.id.replace("delete-", "");
  //   const highlight = quotes[id].highlight;
  //   let newQuotes = [...quotes];
  //   newQuotes = newQuotes.filter((quote) => quote.highlight != highlight);
  //   removeFunction(id, newQuotes);
  // }

  function updateBookInfo() {
    const id = window.location.search.replace("?id=", "");
    const ref = doc(db, "books", id);
    updateDoc(ref, {
      quotes: allQuotes,
    });
  }

  function showTextArea(e) {
    const id = e.target.id.replace("my-note", "").replace("highlight", "");
    const textarea = document.getElementById(e.target.id);
    textarea.classList.add("textarea-show");
    document.getElementById("control" + id).classList.add("display");
  }

  return (
    <div className="quote-comment-block">
      <div className="quotes">
        <Emoji symbol="💡" />
        <br></br>
        <textarea
          placeholder="Add New Highlight"
          id={"highlight-" + id}
          onClick={showTextArea}
        >
          {highlight}
        </textarea>
      </div>
      <hr className="solid"></hr>
      <div className="note-area">
        <p className="subheading">Your Notes</p>
        <textarea
          id={"my-note-" + id}
          placeholder="Add Notes"
          onClick={showTextArea}
        >
          {note}
        </textarea>
      </div>

      {/* Buttons */}
      <div
        className="control-buttons"
        id={"control-" + id}
      >
        <Button
          variant="dark"
          onClick={handleSave}
          id={"save-" + id}
        >
          Save
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          id={"cancel-" + id}
        >
          Cancel
        </Button>
        {/* <Button
          variant="outline-danger"
          onClick={handleDeleteHighlight}
          id={"delete-" + id}
        >
          Delete Highlight
        </Button> */}
      </div>
    </div>
  );
}
