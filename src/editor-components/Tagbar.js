import React, { useCallback } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { updateDB } from "../firebase-config";

/**
 * Tagbar is the implemetation of Tagify
 */
export default function Tagbar({ data, bookID }) {
  /**
   * Update database as user modifies the tag bar.
   */
  function onChange(e) {
    var currentTags = e.detail.tagify.getCleanValue();
    updateDB(bookID, "tags", currentTags);
  }

  const tagifySettings = {
    blacklist: [],
    maxTags: 6,
    backspace: "edit",
    addTagOnBlur: false,
    placeholder: "type to add tags",
    dropdown: {
      enabled: 0, // always show suggestions dropdown
    },
  };
  return (
    <Tags
      settings={tagifySettings}
      onChange={onChange}
      value={data}
    />
  );
}
