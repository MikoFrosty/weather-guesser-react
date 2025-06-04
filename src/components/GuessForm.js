import { useEffect, useState } from "react";
import "./GuessForm.css";

export default function GuessForm({
  currentCity,
  onFormSubmit,
  tempDisplay,
  difficultyString,
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    onFormSubmit(e);
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  return (
    <>
      <h2>
        How hot is <span id="current-city">{currentCity}</span> right now?
      </h2>
      <form
        id="weather-guesser"
        onSubmit={handleSubmit}
        className={submitted ? "submitted" : undefined}
      >
        <label htmlFor="guess">Enter Guess {tempDisplay}</label>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          id="guess"
          name="guess"
          placeholder="0"
          min="-150"
          max="150"
          required
        />
        <input type="submit" id="submit" className="button" value="Submit" />
      </form>
      <p>
        <sub>You win if your guess is {difficultyString}</sub>
      </p>
    </>
  );
}
