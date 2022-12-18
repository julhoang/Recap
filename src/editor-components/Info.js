import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tagbar from "./Tagbar";
import RatingBar from "./RatingBar";

/**
 * Info is the container at the top of the page.
 * It contains the book covers, book title, author, rating bar and tag bar.
 */
export default function Info({ book, bookID }) {
  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <img
              src={book.image}
              alt="book cover"
              style={{
                borderRadius: "10px",
                width: "80%",
                height: "240px",
                objectFit: "cover",
              }}
            ></img>
          </Col>
          <Col md={9}>
            <div>
              <h2 id="title">{book.title}</h2>
              <h4 id="author">by {book.author}</h4>

              <table>
                <tbody>
                  <tr>
                    <td style={{ width: "5rem", height: "3rem" }}>Rating</td>
                    <td style={{ width: "350px" }}>
                      <RatingBar
                        rating={book.rating}
                        bookID={bookID}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <td id="tagify-div">
                      <Tagbar
                        data={book.tags}
                        bookID={bookID}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
