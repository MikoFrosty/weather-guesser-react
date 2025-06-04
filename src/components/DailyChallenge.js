import { useState, useEffect } from "react";
import FetchWrapper from "../modules/fetchwrapper";
import { places } from "../modules/places";
import Answer from "./Answer";
import "./GuessForm.css";

export default function DailyChallenge({ onExit }) {
  const today = new Date().toISOString().slice(0, 10);

  function getDailyLocation() {
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash * 31 + today.charCodeAt(i)) % places.length;
    }
    return places[hash];
  }

  const [location] = useState(getDailyLocation());
  const [answer, setAnswer] = useState([0, ""]);
  const [weather, setWeather] = useState("");
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const API = new FetchWrapper(
      "https://crudcrud.com/api/9b79841d3e6b499fb25730d2bd5fff09/"
    );
    API.get("scores")
      .then((data) => {
        if (Array.isArray(data)) {
          setScores(data.filter((s) => s.date === today));
        } else {
          setScores([]);
        }
      })
      .catch(() => {
        setScores([]);
      });
  }, [today]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const guess = parseInt(e.target.guess.value, 10);
    const user = e.target.username.value || "anon";
    const weatherAPI = new FetchWrapper(
      "https://api.weatherapi.com/v1/current.json?key=72b4230dbcfc4df5b07205043212612&q="
    );

    weatherAPI
      .get(location[0])
      .then((data) => {
        const tempF = Math.floor(data.current.temp_f);
        const diff = Math.abs(tempF - guess);
        const script = `Today's temp in ${location[0].replace(/_/g, " ")} is ${tempF}℉.`;

        if (guess > tempF) {
          setAnswer([1, script]);
        } else if (guess < tempF) {
          setAnswer([2, script]);
        } else {
          setAnswer([3, script]);
        }

        setWeather(
          <>
            <p>Current weather: {data.current.condition.text}</p>
            <img src={data.current.condition.icon} alt={data.current.condition.text} />
          </>
        );

        const API = new FetchWrapper(
          "https://crudcrud.com/api/9b79841d3e6b499fb25730d2bd5fff09/"
        );
        API.post("scores", { date: today, user, diff })
          .then(() => {
            return API.get("scores");
          })
          .then((data) => {
            if (Array.isArray(data)) {
              setScores(data.filter((s) => s.date === today));
            } else {
              setScores([]);
            }
          })
          .catch(() => {
            // ignore errors
          });
      })
      .catch(() => {
        setAnswer([4, "The weather is unavailable right now :/"]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div id="daily-challenge">
      <h2>Daily Challenge</h2>
      <p>
        Guess the temperature in {location[0].replace(/_/g, " ")} ({location[1]})
        .
      </p>
      <form id="daily-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="guess">Enter Guess ℉</label>
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
        <input type="submit" className="button" value="Submit" />
      </form>
      <Answer answer={answer} weather={weather} isLoading={isLoading} />
      <h3>Leaderboard</h3>
      <ol id="leaderboard">
        {scores
          .sort((a, b) => a.diff - b.diff)
          .map((s, idx) => (
            <li key={idx}>
              {s.user}: {s.diff}° off
            </li>
          ))}
      </ol>
      <button className="button" onClick={onExit}>
        Back to Game
      </button>
    </div>
  );
}
