import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Bar from "./Bar";
import Emoji from "../editor-components/Emoji";

/**
 * @constructor
 * @param: {array} books in progress, {array} books completed
 * @returns the Yearly Summary Goal section
 */
export default function Goal({ progress, completed }) {
  let bookCount = 0;
  let message = "Finish your first book!";
  const [link, setLink] = useState("");

  try {
    bookCount = completed.length; // might be undefined
  } catch (err) {
    bookCount = 0;
  }

  try {
    // progress[0] might be undefined
    message = (
      <span>
        Continue: <span id="glance-title">{progress[0].title}</span>
      </span>
    );
  } catch (err) {
    message = "Finish your first book!";
  }

  // Purpose: update link to editor
  useEffect(() => {
    try {
      setLink("/editor?id=" + progress[0].id);
    } catch (err) {}
  }, [progress]);

  return (
    <div>
      {/* Section Heading */}
      <h2>Yearly Summary Goal</h2>

      {/* Progress Bar */}
      <div>
        <Bar />
      </div>

      {/* Summary Counts */}
      <div>
        <Emoji symbol={"📚"} /> You have written <b id="total">{bookCount} summaries</b> this year.
        <br></br>
        <Emoji symbol={"🎯"} /> Write <b id="left">{15 - bookCount} more summaries </b> to reach
        your goal!
      </div>

      {/* Button Link to Editor */}
      <NavLink to={link}>
        <Button variant="dark">{message}</Button>
      </NavLink>
    </div>
  );
}
