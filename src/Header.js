import "./Header.css";

export default function Header({ onDailyClick }) {
  return (
    <header className="App-header">
      <h1>Weather Guesser!</h1>
      <button id="daily-button" className="button" onClick={onDailyClick}>
        Daily Challenge
      </button>
    </header>
  );
}