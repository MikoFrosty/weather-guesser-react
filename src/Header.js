import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ onDailyClick }) {
  return (
    <header className="App-header">
      <h1>Weather Guesser!</h1>
      <div>
        <Link id="about-link" to="/about">
          About
        </Link>
        <button id="daily-button" className="button" onClick={onDailyClick}>
          Daily Challenge
        </button>
      </div>
    </header>
  );
}