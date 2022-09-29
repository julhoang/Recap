import React, { useState, useCallback, useEffect } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Tagbar({ data, id }) {
  const [tags, setTags] = useState(data);

  const onChange = useCallback((e) => {
    var currentTags = e.detail.tagify.getCleanValue();

    const ref = doc(db, "books", id);
    updateDoc(ref, {
      tags: currentTags,
    });
  }, []);

  const tagifySettings = {
    blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 6,
    backspace: "edit",
    addTagOnBlur: false,
    placeholder: "type something",
    dropdown: {
      enabled: 0, // always show suggestions dropdown
    },
  };
  return <Tags settings={tagifySettings} onChange={onChange} value={tags} />;
}
