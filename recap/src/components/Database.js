import React from "react";

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <Col>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  } catch (err) {
    //  console.log("empty data");
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

      <Row xs={1} md={2} className="g-4">
        {message}
      </Row>
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
