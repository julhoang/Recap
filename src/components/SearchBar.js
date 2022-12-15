import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SearchBar() {
  return (
    <Form className="d-flex search-bar">
      <Form.Control
        type="search"
        placeholder="Search my books, highlights, etc"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
