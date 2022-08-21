import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.css";

function Bar() {
  const now = 60;
  return <ProgressBar now={now} label={`${now}%`} />;
}

export default Bar;

//TODO: bar progress not showing
