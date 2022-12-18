import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "../editor.css";
import "@yaireo/tagify/dist/tagify.css";
import Navbar from "../editor-components/Navbar";
import Info from "../editor-components/Info";
import Content from "../editor-components/Content";

/**
 * @constructor
 * @returns the entire Editor page
 */

export default function Editor() {
  const [book, setBook] = useState(undefined);
  const bookID = window.location.search.replace("?id=", "");

  // Purpose: retrieve book entry from Firebase
  const getBook = async () => {
    const docRef = doc(db, "books", bookID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("found book from Firebase");
      setBook(docSnap.data());
    }
  };

  useEffect(() => {
    getBook();
  }, []); // the [] will help this runs only once - after the page renders

  return (
    <div id="editor-main">
      {/* Navbar containing Back, Mark as Completed and More buttons */}
      {book && (
        <Navbar
          data={book}
          id={bookID}
        />
      )}

      {/* Book Info (cover img, title, author, rating, tags) Section */}
      {book && (
        <Info
          book={book}
          bookID={bookID}
        />
      )}

      {/* Summary Content section (highlights + notes) */}
      {book && (
        <div id="text-editor-section">
          <Content
            book={book}
            bookID={bookID}
          />
        </div>
      )}
    </div>
  );
}
