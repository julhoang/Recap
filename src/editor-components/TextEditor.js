import React from "react";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Button from "react-bootstrap/Button";

export default function TextEditor({ quotes, quote, id }) {
  const [note, setNote] = useState(quote.note);
  const [allQuotes, setAllQuotes] = useState(quotes);

  function handleCancel(e) {
    const id = e.target.id.replace("cancel-", "");
    const textarea = document.getElementById("my-note-" + id);
    textarea.value = note;
    textarea.classList.remove("textarea-show");
    document.getElementById("control-" + id).classList.remove("display");
  }

  function handleSave(e) {
    const id = e.target.id.replace("save-", "");
    const textarea = document.getElementById("my-note-" + id);
    setNote(textarea.value);
    textarea.classList.remove("textarea-show");
    document.getElementById("control-" + id).classList.remove("display");

    allQuotes[id].note = textarea.value;
    updateBookInfo();
  }

  function updateBookInfo() {
    const id = window.location.search.replace("?id=", "");
    const ref = doc(db, "books", id);
    updateDoc(ref, {
      quotes: allQuotes,
    });
  }

  function showTextArea(e) {
    const textarea = document.getElementById(e.target.id);
    textarea.classList.add("textarea-show");
    document.getElementById(e.target.id.replace("my-note", "control")).classList.add("display");
  }

  return (
    <div className="note-area">
      <p className="subheading">Your Notes</p>
      <textarea
        id={"my-note-" + id}
        placeholder="Add Notes"
        onClick={showTextArea}
      >
        {note}
      </textarea>
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
      </div>
    </div>
  );
}
