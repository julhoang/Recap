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
          rating = (
            <Emoji
              symbol="🌟"
              label="star"
            />
          );
          break;
        case "2":
          rating = (
            <Emoji
              symbol="🌟🌟"
              label="star"
            />
          );
          break;
        case "3":
          rating = (
            <Emoji
              symbol="🌟🌟🌟"
              label="star"
            />
          );
          break;
        case "4":
          rating = (
            <Emoji
              symbol="🌟🌟🌟🌟"
              label="star"
            />
          );
          break;
        case "5":
          rating = (
            <Emoji
              symbol="🌟🌟🌟🌟🌟"
              label="star"
            />
          );
          break;
      }

      setMessage(
        <div>
          <h2 id="title">{book.title}</h2>
          <h4 id="author">by {book.author}</h4>

          <table>
            <tr>
              <td style={{ width: "5rem", height: "3rem" }}>Rating</td>
              <td style={{ width: "350px" }}>
                <span id="rating">{rating}</span>
              </td>
            </tr>
            <tr>
              <td>Tags</td>
              <td id="tagify-div">
                <Tagbar
                  data={book.tags}
                  id={id}
                />
              </td>
            </tr>
          </table>
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
            <img
              src={thumbnail}
              alt="book cover"
              style={{
                borderRadius: "10px",
                width: "80%",
                height: "240px",
                objectFit: "cover",
              }}
            ></img>
          </Col>
          <Col md={9}>{message}</Col>
        </Row>
      </Container>
    </div>
  );
}
