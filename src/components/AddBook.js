import React, { useEffect, useState } from "react";
import { db, updateDB } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

/**
 * AddBook is the Modal Component that allows user to input new book title, author and rating.
 * It retrieves book cover from google book API and create new book entry in the Firestore database.
 */

export default function AddBook({ onChangeDB }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(Number(0));
  const [needUpdateImage, setNeedUpdate] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    /**
     *  Once form is validated:
     *  Obtain image url from Google Book API first then getImageURL will can addToDB.
     */
    if (form.checkValidity() === true) {
      getImageURL(title);
    }

    setValidated(true);
  };

  const booksCollectionRef = collection(db, "books");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    resetForm();
    setShow(true);
  };
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
        if (needUpdateImage) {
          addImageLater(title, 0, result.id);
        }
      })
      .then(setTimeout(setShow(false), 2000))
      .then(() => {
        onChangeDB("new book!");
      });
  };

  const addImageLater = async (title, trial, id) => {
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + title;
    fetch(encodeURI(url))
      .then((res) => res.json())
      .then((result) => {
        if (needUpdateImage) {
          let imageURL = result.items[0].volumeInfo.imageLinks.smallThumbnail.replace(
            "http",
            "https"
          );
          updateDB(id, { image: imageURL });
        }
      })
      .then(setNeedUpdate(false))
      .catch((error) => {
        if (trial <= 2 && needUpdateImage) {
          addImageLater(title, trial + 1, id);
        }
      });
  };

  useEffect(() => {
    onChangeDB("new image url");
  }, [needUpdateImage]);

  function resetForm() {
    setTitle("");
    setAuthor("");
    setRating("");
    setValidated(false);
  }

  async function getImageURL(title) {
    console.log("check title", title);
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + title;
    fetch(encodeURI(url))
      .then((res) => res.json())
      .then((result) => {
        let imageURL = result.items[0].volumeInfo.imageLinks.smallThumbnail.replace(
          "http",
          "https"
        );
        setNeedUpdate(false);
        addBookToDb(imageURL);
      })
      .catch((error) => {
        setNeedUpdate(true);
        addBookToDb("");
      });
  }

  return (
    <div id="header">
      <h1>My Summaries</h1>

      <Button
        variant="dark"
        id="createBooks"
        onClick={handleShow}
        className="d-none d-sm-block"
      >
        Add New Books
      </Button>

      <Button
        variant="primary"
        id="createBooksFloating"
        onClick={handleShow}
        size="lg"
        className="d-block d-sm-none"
      >
        +
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

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Modal.Body>
            {/* Title */}

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formTitle"
            >
              <Form.Label
                column
                sm={3}
              >
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
                <Form.Control.Feedback type="invalid">
                  Please provide the book title.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Author */}
            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formAuthor"
            >
              <Form.Label
                column
                sm={3}
              >
                AUTHOR
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Author"
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the author's name.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Rating */}

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formRating"
            >
              <Form.Label
                column
                sm={3}
              >
                RATING (1-5)
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  aria-label="formRating"
                  onChange={(event) => {
                    setRating(event.target.value);
                  }}
                >
                  <option value="0">No Rating 🤔</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Button
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </Modal.Body>
        </Form>
      </Modal>
    </div>
  );
}
