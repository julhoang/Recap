import React from "react";
import "../editor.css";

import Navbar from "../editor-components/Navbar";
import Info from "../editor-components/Info";
import Content from "../editor-components/Content";

export default function Editor() {
  return (
    <div>
      <Navbar />
      <Info />
      <Content />
    </div>
  );
}
