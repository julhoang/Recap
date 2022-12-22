import React from "react";
import { Routes, Route } from "react-router-dom";
import Editor from "./pages/editor.js";

import Home from "./components/Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/editor"
          element={<Editor />}
        />
      </Routes>
    </>
  );
}
