import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { deleteBook } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ bookID, setShow }) => {
  const navigate = useNavigate();
  const handleModifyInfo = (e) => {
    e.preventDefault();
    deleteBook(bookID);
    setTimeout(setShow(false), 1000);
    setTimeout(navigate("/"), 2000);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Permanently Delete Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete this book?
          <br></br>
          This action cannot be undone.
        </p>
      </Modal.Body>

      <Modal.Footer style={{ gap: "5px" }}>
        <Button
          type="submit"
          variant="danger"
          onClick={handleModifyInfo}
        >
          Delete Book
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteModal;
