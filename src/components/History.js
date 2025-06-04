import { useState } from "react";
import "./History.css";

export default function History({ history, onClear }) {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => setHidden((prev) => !prev);

  return (
    <div id="history-wrapper">
      <div id="history-controls">
        <button className="button" onClick={toggleHidden}>
          {hidden ? "Show History" : "Hide History"}
        </button>
        <button className="button" onClick={onClear}>Clear</button>
      </div>
      {!hidden && (
        <ul id="history-list">
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
