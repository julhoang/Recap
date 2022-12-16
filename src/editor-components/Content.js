import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import TextEditor from "./TextEditor";
import { useIsMount } from "./react-mounting";

export default function Content({ data, api }) {
  const isMount = useIsMount();
  const [book, setBook] = useState(data);
  const [quotes, setQuotes] = useState([]);

  const loadQuotes = async () => {
    try {
      setQuotes(book.quotes);
    } catch (err) {
      console.log("book still loading");
    }
  };

  useEffect(() => {
    setBook(data);
  });

  useEffect(() => {
    loadQuotes();
  }, [book]);

  function addNewHighlight() {
    const quote = {
      highlight: "",
      note: "",
    };

    setQuotes([...quotes, quote]);
  }

  // function removeHighlight(id, newQuotes) {
  //   console.log("removed " + id);
  //   setQuotes(newQuotes);
  // }

  // useEffect(() => {
  //   if (!isMount) {
  //     updateBookInfo();
  //   }
  // }, [quotes]);

  // function updateBookInfo() {
  //   console.log(quotes);
  //   setQuotes(quotes);
  //   // const id = window.location.search.replace("?id=", "");
  //   // const ref = doc(db, "books", id);
  //   // updateDoc(ref, {
  //   //   quotes: quotes,
  //   // });
  //   // console.log(quotes);
  // }

  return (
    <div id="quotes-section">
      <Button onClick={addNewHighlight}>Add New Highlight</Button>
      {quotes.map((quote, id) => {
        return (
          <TextEditor
            quotes={quotes}
            quote={quote}
            id={id}
          />
        );
      })}
    </div>
  );
}
