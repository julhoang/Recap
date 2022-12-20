import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { updateDB } from "../firebase-config";

export default function ModifyModal({ book, bookID, onChangeDB, setShow }) {
  const [author, setAuthor] = useState(book.author);
  const [title, setTitle] = useState(book.title);
  const [img, setImg] = useState(book.image);
  function handleModifyInfo(e) {
    e.preventDefault();
    console.log(bookID, author, title, img);
    updateDB(bookID, {
      author: author,
      title: title,
      image: img,
    });

    setTimeout(setShow(false), 2000);
    onChangeDB({ author: author, title: title, image: img });
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modify Book Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleModifyInfo}>
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
                defaultValue={book.title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
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
                type="text"
                defaultValue={book.author}
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Image URL */}
          <Form.Group
            as={Row}
            className="mb-2"
            controlId="formImageURL"
          >
            <Form.Label
              column
              sm={3}
            >
              IMAGE URL
            </Form.Label>

            <Col sm={8}>
              <Form.Control
                type="text"
                defaultValue={book.image}
                onChange={(event) => {
                  setImg(event.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            onClick={handleModifyInfo}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
