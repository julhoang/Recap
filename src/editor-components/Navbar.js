import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { FiChevronLeft } from "react-icons/fi";
import { updateDB } from "../firebase-config";

/**
 * Navbar is the navigation/utility bar at the top of the page.
 * It contains the Back to main page button, Completion button, and the More button.
 */
export default function Navbar({ data, id }) {
  const [status, setStatus] = useState(data.completed);

  function handleSubmit(event) {
    event.preventDefault();
  }

  /**
   * Toggle the completion status and update the database to reflect changes.
   */
  function updateCompletion() {
    updateDB(id, "completed", !status);
    setStatus((prev) => !prev);
  }

  return (
    <div id="editor-navbar">
      <span id="home-btn">
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "grey" }}
        >
          <FiChevronLeft /> Back to My Summaries
        </NavLink>
      </span>

      <span>
        <Form onSubmit={handleSubmit}>
          <Button
            type="submit"
            id="complete-btn"
            onClick={updateCompletion}
            variant="dark"
          >
            {status ? "Completed ✅" : "Mark As Completed"}
          </Button>
          {"   "}
          <Button
            type="submit"
            variant="light"
          >
            More
          </Button>
        </Form>
      </span>
    </div>
  );
}
