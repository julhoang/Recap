import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "../editor.css";
import "@yaireo/tagify/dist/tagify.css";
import Navbar from "../editor-components/Navbar";
import Info from "../editor-components/Info";
import Content from "../editor-components/Content";
import TextEditor from "../editor-components/TextEditor";

/**
 * @constructor
 * @param: none
 * @returns the entire Editor page
 */

export default function Editor() {
  const [book, setBook] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const id = window.location.search.replace("?id=", "");

  // Purpose: retrieve book entry from Firebase
  const getBook = async () => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBook(docSnap.data());
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  // TODO: implement TextEditor using SlateJS

  return (
    <div id="editor-main">
      {/* Navbar containing Back, Mark as Completed and More buttons */}
      <Navbar
        data={book}
        id={id}
      />

      {/* Book Info (cover img, title, author, rating, tags) Section */}
      <Info
        data={book}
        id={id}
        api={info}
      />

      {/* Text/Quotes Editor */}
      <div id="text-editor-section">
        <Content
          data={book}
          api={info}
        />
      </div>
    </div>
  );
}
