import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Emoji from "./Emoji";
import Tagbar from "./Tagbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Info({ data, api, id }) {
  const [book, setBook] = useState(data);
  const [info, setinfo] = useState(api);
  const [message, setMessage] = useState(<div>Loading...</div>);
  const [thumbnail, setThumbnail] = useState(undefined);

  useEffect(() => {
    setBook(data);
  });

  useEffect(() => {
    //  console.log(book);

    try {
      let rating = "No Rating 🤔";
      switch (book.rating.toString()) {
        case "1":
          rating = <Emoji symbol="🌟" label="star" />;
          break;
        case "2":
          rating = <Emoji symbol="🌟🌟" label="star" />;
          break;
        case "3":
          rating = <Emoji symbol="🌟🌟🌟" label="star" />;
          break;
        case "4":
          rating = <Emoji symbol="🌟🌟🌟🌟" label="star" />;
          break;
        case "5":
          rating = <Emoji symbol="🌟🌟🌟🌟🌟" label="star" />;
          break;
      }

      setMessage(
        <div>
          <h2 id="title">{book.title}</h2>
          <h3 id="author">{book.author}</h3>
          <div>
            Rating: <span id="rating">{rating}</span>
          </div>

          {/* Tag Bar */}
          <div id="tagify-div">
            Tags: <Tagbar data={book.tags} id={id} />
          </div>
        </div>
      );

      setThumbnail(book.image);
    } catch (err) {
      //  console.log("book still loading");
    }
  }, [book]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <img src={thumbnail} alt="book cover"></img>
          </Col>
          <Col md={9}>{message}</Col>
        </Row>
      </Container>
    </div>
  );
}
