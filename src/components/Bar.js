import ProgressBar from "react-bootstrap/ProgressBar";

export default function Bar({ done, goal }) {
  const now = Math.round((done / goal) * 100).toFixed(0);
  return (
    <ProgressBar
      now={now}
      label={`${now}%`}
    />
  );
}
