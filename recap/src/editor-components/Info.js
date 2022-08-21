import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Info() {
  return (
    <div>
      <h2 id="title">Atomic Habit</h2>
      <h3 id="author">James Clear</h3>
      <div>
        Rating: <span id="rating">⭐⭐⭐⭐⭐</span>
      </div>
      <div>
        Date Range: <span id="date-from">Mar 1, 22</span> <FiArrowRight />{" "}
        <span id="date-to">Apr 15, 22</span>
      </div>
      <div>Tags:</div>
      Hello test
    </div>
  );
}
