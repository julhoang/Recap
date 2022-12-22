import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

/**
 * @brief TextEditor is a component consist of the highlight and the note box.
 */

export default function TextEditor({ quotes, quote, add, remove }) {
  const id = quote.id;
  const [note, setNote] = useState(quote.note);
  const [highlight, setHighlight] = useState(quote.highlight);

  /**
   * If user hit Cancel, restore all previous value states and close the edit view.
   */
  function handleCancel() {
    const noteArea = document.getElementById("my-note-" + id);
    noteArea.value = note;
    noteArea.classList.remove("textarea-show");

    const highlightArea = document.getElementById("highlight-" + id);
    highlightArea.value = highlight;
    highlightArea.classList.remove("textarea-show");

    document.getElementById("control-" + id).classList.remove("display");
  }

  /**
   * If user hit Cancel, call the parent's addToDB function and close the edit view.
   */
  function handleSave() {
    const noteArea = document.getElementById("my-note-" + id);
    setNote(noteArea.value);
    noteArea.classList.remove("textarea-show");

    const highlightArea = document.getElementById("highlight-" + id);
    setHighlight(highlightArea.value);
    highlightArea.classList.remove("textarea-show");

    document.getElementById("control-" + id).classList.remove("display");

    let allQuotes = [...quotes];
    allQuotes[id].note = noteArea.value;
    allQuotes[id].highlight = highlightArea.value;

    add(allQuotes);
  }

  /**
   * If user hit Delete, call the parent's removeFromDB function and close the edit view.
   */
  function handleRemove() {
    remove(id);
  }

  /**
   * If user hit on the highlight or note textarea, mimic an "edit view".
   */
  function showTextArea() {
    const textarea = document.getElementById("my-note-" + id);
    textarea.classList.add("textarea-show");
    document.getElementById("control-" + id).classList.add("display");
  }

  return (
    <div className="quote-comment-block">
      <div className="quotes">
        <span className="emoji">💡</span>
        <br></br>
        <textarea
          placeholder="Add New Highlight"
          id={"highlight-" + quote.id}
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

      {/* Control Buttons */}
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
        <hr class="solid d-block d-md-none"></hr>
        <Button
          variant="outline-danger"
          onClick={handleRemove}
          id={"delete-" + id}
        >
          Delete Highlight
        </Button>
      </div>
    </div>
  );
}
