import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function handleSubmit(event) {
  event.preventDefault();
}

export default function AddBook({ onChangeDB }) {
  const [show, setShow] = useState(false);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(Number(0));
  const [addImage, setAddImage] = useState(false);

  const booksCollectionRef = collection(db, "books");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBookToDb = async (imageURL) => {
    await addDoc(booksCollectionRef, {
      title: title,
      author: author,
      rating: rating,
      quotes: [],
      tags: [],
      date: new Date(),
      completed: false,
      image: imageURL,
    })
      .then((result) => {
        if (addImage == false) {
          addImageLater(title, 0, result.id);
          setAddImage(true);
        }
      })
      .then(setTimeout(setShow(false), 2000))
      .then(() => {
        onChangeDB("new book!");
      });
  };

  const addImageLater = async (title, trial, id) => {
    try {
      const url = "https://www.googleapis.com/books/v1/volumes?q=" + title;
      fetch(encodeURI(url))
        .then((res) => res.json())
        .then((result) => {
          if (addImage == false) {
            updateBookInfo(result.items[0].volumeInfo.imageLinks.smallThumbnail, id);
          }
        })
        .then(setAddImage(true))
        .catch((error) => {
          if (trial <= 3) {
            addImageLater(title, trial + 1, id);
          }
        });
    } catch (err) {}
  };

  const updateBookInfo = async (url, id) => {
    const ref = doc(db, "books", id);
    updateDoc(ref, {
      image: url,
    });
  };

  useEffect(() => {
    onChangeDB("new image url");
  }, [addImage]);

  const getImageURL = async () => {
    try {
      const url = "https://www.googleapis.com/books/v1/volumes?q=" + title;
      fetch(encodeURI(url))
        .then((res) => res.json())
        .then((result) => {
          //  return result.items[0].volumeInfo.imageLinks.smallThumbnail;
          addBookToDb(result.items[0].volumeInfo.imageLinks.smallThumbnail);
        })
        .catch((error) => {
          addBookToDb("");
          addImageLater(title, 0);
        });
    } catch (err) {}
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

            <Button type="submit" variant="dark" onClick={getImageURL}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
