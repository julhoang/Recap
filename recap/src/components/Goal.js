import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Bar from "./Bar";
import Emoji from "../editor-components/Emoji";

export default function Goal({ progress, completed }) {
  let bookCount = 0;
  let message = "Finish your first book!";
  const [link, setLink] = useState("");

  useEffect(() => {
    try {
      setLink("/editor?id=" + progress[0].id);
    } catch (err) {}
  }, [progress]);

  try {
    bookCount = completed.length;
    console.log(progress[0]);
    message = (
      <span>
        Continue: <span id="glance-title">{progress[0].title}</span>
      </span>
    );
  } catch (err) {
    console.error();
  }

  const visitBook = () => {};

  return (
    <div>
      <h2>Yearly Summary Goal</h2>
      <div>
        <Bar />
      </div>
      <div>
        <Emoji symbol={"📚"} /> You have written <b id="total">{bookCount} summaries</b> this year.
        <br></br>
        <Emoji symbol={"🎯"} /> Write <b id="left">{15 - bookCount} more summaries </b> to reach
        your goal!
      </div>

      <NavLink to={link}>
        <Button variant="dark" onClick={visitBook}>
          {message}
        </Button>
      </NavLink>
    </div>
  );
}
