import React from "react";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Cards = ({ data, id }) => {
  let header = "Summaries " + (id === "progress-section" ? "In Progress" : "Completed");
  let message = <span>Empty Library</span>;

  try {
    message = data.map((book, id) => (
      <Col
        md={3}
        xs={6}
        key={"col-" + id.toString()}
      >
        <Card
          className="rounded"
          key={"card-" + id.toString()}
        >
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
                  minWidth: 100,
                  objectFit: "cover",
                  objectPosition: "center",
                  aspectRatio: 2 / 3,
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
  } catch (err) {}

  return (
    <div id={"cards-" + id}>
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
