import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { FiChevronLeft } from "react-icons/fi";

export default function Navbar() {
  return (
    <div id="editor-navbar">
      <span id="home-btn">
        <NavLink to="/">
          <FiChevronLeft /> Back to My Summaries
        </NavLink>
      </span>

      <span>
        <Button variant="dark">Mark As Completed</Button> <Button variant="light">More</Button>
      </span>
    </div>
  );
}
