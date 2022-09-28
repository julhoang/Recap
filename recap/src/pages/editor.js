import React, { useEffect } from "react";
import "../editor.css";
import "@yaireo/tagify/dist/tagify.css";

import Navbar from "../editor-components/Navbar";
import Info from "../editor-components/Info";
import Content from "../editor-components/Content";

import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function Editor() {
  const [book, setBook] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const id = window.location.search.replace("?id=", "");

  const getBook = async () => {
    console.log("getBook called");
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBook(docSnap.data());
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    try {
      const title = book.title;
      const url = "https://www.googleapis.com/books/v1/volumes?q=" + title;
      fetch(encodeURI(url))
        .then((res) => res.json())
        .then((result) => setInfo(result));
    } catch (err) {
      console.log("err: " + err);
    }
  }, [book]);

  // TODO: implement TextEditor using SlateJS

  return (
    <div id="editor-main">
      <Navbar data={book} id={id} />
      <Info data={book} api={info} />
      <div id="text-editor-section">
        <Content data={book} api={info} />
        {/* <TextEditor /> */}
      </div>
    </div>
  );
}
