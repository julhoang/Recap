import React from "react";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Form from "react-bootstrap/Form";
import Emoji from "./Emoji";

export default function RatingBar(data) {
  const [book, setBook] = useState(data.data);

  useEffect(() => {
    setBook(data.data);
  });

  useEffect(() => {
    try {
      if (book.rating) {
        console.log(book.rating);
        document.getElementById("rating").value = book.rating;
      }
    } catch (err) {
      document.getElementById("rating").value = 0;
    }
  }, [book]);

  function updateRating(e) {
    const id = window.location.search.replace("?id=", "");
    const ref = doc(db, "books", id);

    updateDoc(ref, {
      rating: document.getElementById("rating").value,
    });
  }

  return (
    <Form.Select
      aria-label="Floating label select example"
      id="rating"
      onChange={updateRating}
    >
      <option value="0">No Rating 🤔</option>
      <option value="1">
        <Emoji
          symbol="🌟"
          label="1 star"
        />
      </option>
      <option value="2">
        <Emoji
          symbol="🌟🌟"
          label="2 stars"
        />
      </option>
      <option value="3">
        <Emoji
          symbol="🌟🌟🌟"
          label="3 stars"
        />
      </option>
      <option value="4">
        <Emoji
          symbol="🌟🌟🌟🌟"
          label="4 stars"
        />
      </option>
      <option value="5">
        <Emoji
          symbol="🌟🌟🌟🌟🌟"
          label="5 stars"
        />
      </option>
    </Form.Select>
  );
}
