import React from "react";

import Button from "react-bootstrap/esm/Button";
import Bar from "./Bar";

export default function Goal({ books }) {
  let bookCount = 0;
  let message = "Finish your first book!";

  try {
    bookCount = books.length;
    message = (
      <span>
        Continue: <span id="glance-title">{books[0].title}</span>
      </span>
    );
  } catch (err) {
    console.error();
  }

  return (
    <div>
      <h2>Yearly Summary Goal</h2>
      <div>
        <Bar />
      </div>
      <div>
        You have written <span id="total">{bookCount}</span> summaries this year.<br></br>
        <span id="left">Write {15 - bookCount}</span> more summaries to reach your goal!
      </div>
      <Button variant="dark">{message}</Button>
    </div>
  );
}
