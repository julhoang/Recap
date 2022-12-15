import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { FiChevronLeft } from "react-icons/fi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function handleSubmit(event) {
  event.preventDefault();
}

export default function Navbar({ data, id }) {
  const ref = doc(db, "books", id);
  const [message, setMessage] = useState("...");
  const [status, setStatus] = useState(undefined);

  const updateCompletion = async () => {
    let newStatus = status ? false : true;
    await updateDoc(ref, {
      completed: newStatus,
    }).then(() => {
      setStatus(newStatus);
      //  console.log("successfully updated completion status");
    });
  };

  useEffect(() => {
    try {
      setStatus(data.completed);
    } catch (err) {}
  }, [data]);

  useEffect(() => {
    if (status) {
      setMessage("Completed ✅");
    } else {
      setMessage("Mark As Completed");
    }
  }, [status]);

  return (
    <div id="editor-navbar">
      <span id="home-btn">
        <NavLink to="/">
          <FiChevronLeft /> Back to My Summaries
        </NavLink>
      </span>

      <span>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" id="complete-btn" onClick={updateCompletion} variant="dark">
            {message}
          </Button>{" "}
          <Button type="submit" variant="light">
            More
          </Button>
        </Form>
      </span>
    </div>
  );
}
