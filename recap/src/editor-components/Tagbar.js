import React from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

export default function Tagbar() {
  const tagifySettings = {
    blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 6,
    backspace: "edit",
    addTagOnBlur: false,
    placeholder: "type something",
    dropdown: {
      enabled: 0, // a;ways show suggestions dropdown
    },
  };
  return <Tags settings={tagifySettings} />;
}
