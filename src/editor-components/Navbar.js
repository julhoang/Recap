import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { updateDB } from "../firebase-config";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/esm/Button";
import MoreBtn from "./MoreBtn";

/**
 * Navbar is the navigation/utility bar at the top of the page.
 * It contains the Back to main page button, Completion button, and the More button.
 */
export default function Navbar({ book, bookID, onChangeDB }) {
  console.log("Navbar rendered");
  const [status, setStatus] = useState(book.completed);

  /**
   * Toggle the completion status and update the database to reflect changes.
   */
  function updateCompletion() {
    updateDB(bookID, { completed: !status });
    setStatus((prev) => !prev);
  }

  return (
    <div id="editor-navbar">
      <ButtonToolbar
        size="sm"
        className="justify-content-center justify-content-sm-between"
        aria-label="Navigation bar with control buttons"
      >
        {/* Back Button */}
        <Button
          variant="light"
          className="d-none d-sm-block"
        >
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: "grey" }}
          >
            <FiChevronLeft /> Back to My Summaries
          </NavLink>
        </Button>

        <ButtonGroup
          aria-label="Other book settings"
          className="align-self-end"
        >
          {/* Completion Button */}
          <Button
            type="submit"
            id="complete-btn"
            onClick={updateCompletion}
            variant="dark"
          >
            {status ? "Completed ✅" : "Mark As Completed"}
          </Button>

          {/* More Button */}
          <MoreBtn
            book={book}
            bookID={bookID}
            onChangeDB={onChangeDB}
          />
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}
