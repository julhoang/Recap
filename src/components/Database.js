import React from "react";
import { NavLink } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CardGroup, Container } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

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
      <Col
        md={3}
        xs={4}
      >
        <Card className="rounded">
          <NavLink
            to={"/editor?id=" + book.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card.Header className="bg-light mt-0 d-flex align-items-center justify-content-center">
              <Card.Img
                src={book.image}
                className="mt-2 mb-2"
                style={{
                  borderRadius: "10px",
                  width: "80%",
                  height: "240px",
                  objectFit: "cover",
                }}
              />
            </Card.Header>

            <Card.Body className="mt-0 mb-0">
              <Card.Title>{book.title}</Card.Title>
              <Card.Text style={{ color: "grey" }}>By {book.author}</Card.Text>
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
          <Badge
            pill
            bg="primary"
          >
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
      <Cards
        id="progress-section"
        data={progress}
      />

      <Cards
        id="completed-section"
        data={completed}
      />
    </div>
  );
}
