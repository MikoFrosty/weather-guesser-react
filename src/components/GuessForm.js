import "./GuessForm.css";

export default function GuessForm({ currentCity, onFormSubmit }) {
  return (
    <>
      <h2>
        How hot is <span id="current-city">{currentCity}</span> right now?
      </h2>
      <form id="weather-guesser" onSubmit={onFormSubmit}>
        <label htmlFor="guess">
          Enter Guess (<span id="temp-setting">℉</span>)
        </label>
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
    </>
  );
}
