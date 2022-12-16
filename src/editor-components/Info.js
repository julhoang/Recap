import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tagbar from "./Tagbar";
import RatingBar from "./RatingBar";

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
      setMessage(
        <div>
          <h2 id="title">{book.title}</h2>
          <h4 id="author">by {book.author}</h4>

          <table>
            <tbody>
              <tr>
                <td style={{ width: "5rem", height: "3rem" }}>Rating</td>
                <td style={{ width: "350px" }}>
                  <RatingBar data={book} />
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
            </tbody>
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
