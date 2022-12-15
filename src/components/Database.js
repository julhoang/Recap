import React from "react";
import { NavLink } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CardGroup, Container } from "react-bootstrap";

const Cards = (props) => {
  const data = props.data;

  const id = "cards-" + props.id;
  let header = "";
  if (props.id == "progress-section") {
    header = "Summaries In Progress";
  } else {
    header = "Summaries Completed";
  }

  let message = "";

  try {
    message = data.map((book) => (
      <Col md={3} xs={4}>
        <Card className="justify-content-md-center">
          <NavLink to={"/editor?id=" + book.id}>
            <Card.Img variant="top" src={book.image} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
            </Card.Body>
          </NavLink>
        </Card>
      </Col>
    ));
  } catch (err) {
    message = <span>Empty Library</span>;
  }

  return (
    <div id={id}>
      <h2>
        {header}{" "}
        <span className="header-badge">
          <Badge pill bg="primary">
            {data.length}
          </Badge>
        </span>
      </h2>

      <Row>{message}</Row>
    </div>
  );
};

export default function Database({ progress, completed }) {
  return (
    <div>
      <Cards id="progress-section" data={progress} />

      <Cards id="completed-section" data={completed} />
    </div>
  );
}
