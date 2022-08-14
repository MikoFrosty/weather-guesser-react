import "./GuessForm.css";

export default function GuessForm({ currentCity }) {
  return (
    <>
      <h2>
        How hot is <span id="current-city">{currentCity}</span> right now?
      </h2>
      <form id="weather-guesser">
        <label htmlFor="guess">
          Enter Guess (<span id="temp-setting">℉</span>)
        </label>
        <input
          type="number"
          inputmode="numeric"
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
    </>
  );
}
