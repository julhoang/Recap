import React from "react";
import { useEffect } from "react";
import { updateDB } from "../firebase-config";
import Form from "react-bootstrap/Form";

export default function RatingBar({ rating, bookID }) {
  useEffect(() => {
    document.getElementById("rating").value = rating;
  }, []);

  /**
   * Update database as user modifies rating
   */
  function updateRating(e) {
    updateDB(bookID, "rating", e.target.value);
  }

  return (
    <Form.Select
      aria-label="Floating label select example"
      id="rating"
      onChange={updateRating}
    >
      <option value="0">No Rating 🤔</option>
      <option value="1">🌟</option>
      <option value="2">🌟🌟</option>
      <option value="3">🌟🌟🌟</option>
      <option value="4">🌟🌟🌟🌟</option>
      <option value="5">🌟🌟🌟🌟🌟</option>
    </Form.Select>
  );
}
