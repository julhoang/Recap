import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Emoji from "./Emoji";
import Tagbar from "./Tagbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Info({ data, api }) {
  const [book, setBook] = useState(data);
  const [info, setinfo] = useState(api);
  const [message, setMessage] = useState(<div>Loading...</div>);
  const [thumbnail, setThumbnail] = useState(undefined);
  const logo = require("./cover.jpeg");

  useEffect(() => {
    setBook(data);
  });

  useEffect(() => {
    //  console.log(book);

    try {
      let rating = "🤔";
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
          {/* <div>
              Date Range: <span id="date-from">Mar 1, 22</span> <FiArrowRight />{" "}
              <span id="date-to">Apr 15, 22</span>
            </div> */}
          <div id="tagify-div">
            Tags: <Tagbar />
          </div>
        </div>
      );
    } catch (err) {
      //  console.log("book still loading");
    }
  }, [book]);

  // TODO: fix thumbnail not showing
  const getThumbnail = async () => {
    try {
      console.log(api.items[0].volumeInfo.imageLinks.smallThumbnail + "/");
      const response = await fetch(api.items[0].volumeInfo.imageLinks.smallThumbnail + "/");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const image = new Image();

      setThumbnail(image);
    } catch (err) {
      // console.log("api still loading");
    }
  };

  useEffect(() => {
    getThumbnail();
  }, [api]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            {/* <img src={thumbnail} alt="icon"></img> */}
            <img src={logo}></img>
          </Col>
          <Col md={9}>{message}</Col>
        </Row>
      </Container>
    </div>
  );
}
