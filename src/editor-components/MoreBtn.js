import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Modal } from "react-bootstrap";
import ModifyModal from "./ModifyModal";
import DeleteModal from "./DeleteModal";

export default function MoreBtn({ book, bookID, onChangeDB }) {
  const [showModify, setShowModify] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => {
    setShowModify(false);
    setShowDelete(false);
  };
  const handleShowModify = () => setShowModify(true);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        variant="outline-dark"
        title="More"
        as={ButtonGroup}
      >
        <Dropdown.Item
          href="#/action-1"
          onClick={handleShowModify}
        >
          Modify Book Info
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="#/action-3"
          variant="danger"
          onClick={handleShowDelete}
        >
          Delete Book
        </Dropdown.Item>
      </DropdownButton>

      <Modal
        show={showModify || showDelete}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        size={showModify ? "lg" : "md"}
      >
        {showModify && (
          <ModifyModal
            bookID={bookID}
            book={book}
            onChangeDB={onChangeDB}
            setShow={setShowModify}
          ></ModifyModal>
        )}

        {showDelete && (
          <DeleteModal
            bookID={bookID}
            setShow={setShowDelete}
          ></DeleteModal>
        )}
      </Modal>
    </>
  );
}
