import "./Answer.css";

export default function Answer({ answer, weather }) {
  return (
    <>
      <p id="answer">{answer}</p>
      <div id="current-weather" style={{ borderTop: weather ? "1px solid black" : "none" }}>{weather}</div>
    </>
  );
}
