import ProgressBar from "react-bootstrap/ProgressBar";

export default function Bar() {
  const now = 60;
  return (
    <ProgressBar
      now={now}
      label={`${now}%`}
    />
  );
}
