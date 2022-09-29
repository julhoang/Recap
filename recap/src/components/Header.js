import React from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function handleSubmit(event) {
  event.preventDefault();
}

export default function Header({ onChangeDB }) {
  const [show, setShow] = useState(false);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(Number(0));

  const booksCollectionRef = collection(db, "books");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBookToDb = async () => {
    await addDoc(booksCollectionRef, {
      title: title,
      author: author,
      rating: rating,
      quotes: [],
      tags: [],
      date: new Date(),
      completed: false,
    })
      .then(setTimeout(setShow(false), 2000))
      .then(() => {
        onChangeDB("new book!");
      });
  };

  return (
    <div id="header">
      <h1>My Summaries</h1>
      <Button variant="dark" id="createBooks" onClick={handleShow}>
        Add New Books
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add New Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group as={Row} className="mb-2" controlId="formTitle">
              <Form.Label column sm={3}>
                TITLE
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            {/* Author */}
            <Form.Group as={Row} className="mb-2" controlId="formAuthor">
              <Form.Label column sm={3}>
                AUTHOR
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            {/* Rating */}

            <Form.Group as={Row} className="mb-2" controlId="formRating">
              <Form.Label column sm={3}>
                RATING (1-5)
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  aria-label="formRating"
                  onChange={(event) => {
                    setRating(event.target.value);
                  }}
                >
                  <option>Select</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Button type="submit" variant="dark" onClick={addBookToDb}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
