import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import NewCityAndOptions from "./components/NewCityAndOptions";
import GuessForm from "./components/GuessForm";
import MapAndOptions from "./components/MapAndOptions";
import { places } from "./modules/places";
import FetchWrapper from "./modules/fetchwrapper";
import Answer from "./components/Answer";

function App() {
  const [location, setLocation] = useState(["Loading...", ""]);
  const [answer, setAnswer] = useState("");
  const [weather, setWeather] = useState("");
  const [options, setOptions] = useState({
    temp: 1, // 1 - f, 0 - c
    tempDisplay: "℉",
    region: 0, // 0 - Global, 1 - North America, 2 - Europe, 3 - Asia
    difficulty: 0, // 0 - Easy, 1 - Medium, 2 - Hard
  });

  // Load the first city on page load
  useEffect(() => {
    handleNewCityClick();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // hide options when interacting with other buttons
  useEffect(() => {
    document.querySelector("#options-wrapper").classList.add("hide");
  }, [location, answer]);

  // Turns location data into a string for text display
  function cityString() {
    const [city, country] = location;
    const str = `${city
      .replace(/_/g, " ")
      .replace(/[,]%20\w+/, "")}, ${country}`;
    return str;
  }

  // Loads a new city and updates all the necessary data
  function handleNewCityClick() {
    setAnswer("");
    setWeather("");
    const getPlaces = () => {
      switch (options.region) {
        case 0:
          return places;
        case 1:
          return places.filter((city) => city[3] === "North America");
        case 2:
          return places.filter((city) => city[3] === "Europe");
        case 3:
          return places.filter((city) => city[3] === "Asia");
        default:
          return places;
      }
    };
    const placesList = getPlaces();
    setLocation(
      () => placesList[Math.floor(Math.random() * placesList.length)]
    );
  }

  // toggle options screen when clicking the options button
  function handleOptionsClick() {
    document.querySelector("#options-wrapper").classList.toggle("hide");
  }

  // update options when options form is changed
  function handleOptionsChange(e) {
    const { name, value: v } = e.target;
    const value = Number.parseInt(v);
    setOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "temp") {
      setOptions((prev) => ({
        ...prev,
        tempDisplay: value ? "℉" : "℃",
      }));
    }
  }

  // Fetch weather data for the current city and update the state based on user guess
  function handleAnswerSubmit(e) {
    e.preventDefault();
    const guess = Number.parseInt(e.target.guess.value, 10);

    const API = new FetchWrapper(
      "https://api.weatherapi.com/v1/current.json?key=72b4230dbcfc4df5b07205043212612&q="
    );

    API.get(location[0])
      .then((data) => {
        let tempF = Math.floor(data.current.temp_f);
        let tempC = Math.floor(data.current.temp_c);
        let script = `The current temp in ${cityString()} is ${
          options.temp ? tempF : tempC
        }${options.tempDisplay}.`;
        // Remove loader ?

        // Handles winning, losing, and displaying proper messages
        const runLogic = (temp) => {
          // Expand win conditions based on difficulty
          const tempRange = () => {
            switch (options.difficulty) {
              case 0:
                return 10;
              case 1:
                return 5;
              case 2:
                return 0;
              default:
                return 10;
            }
          };

          // Winning and losing messages
          if (guess > temp + tempRange()) {
            setAnswer(
              <>
                <span className="loseh-text">Too high!</span> {script}
              </>
            );
          } else if (guess < temp - tempRange()) {
            setAnswer(
              <>
                <span className="losel-text">Too low!</span> {script}
              </>
            );
          } else {
            setAnswer(
              <>
                <span className="win-text">YOU WIN!</span> {script}
              </>
            );
          }

          // Display current weather
          setWeather(
            <>
              <p>Current weather: {data.current.condition.text}</p>
              <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
              />
            </>
          );
        };

        // Run logic using Fahrenheit or Celsius
        if (options.temp) {
          runLogic(tempF);
        } else {
          runLogic(tempC);
        }
      })
      .catch((error) => {
        console.error(error);
        // remove loader ?
        // answer message
        //answer.textContent = "The weather is unavailable right now :/";
      })
      .finally(() => {
        //enable submit button
        //guessButton.removeAttribute("disabled");
      });
  }

  return (
    <>
      <div className="App">
        <Header />
        <section id="main-content">
          <NewCityAndOptions
            onNewCityClick={handleNewCityClick}
            onOptionsClick={handleOptionsClick}
          />
          <GuessForm
            currentCity={cityString()}
            onFormSubmit={handleAnswerSubmit}
            tempDisplay={options.tempDisplay}
          />
          <p>
            <sub>
              You win if your guess is{" "}
              <span id="win-condition">within 10°</span>
            </sub>
          </p>
          <Answer answer={answer} weather={weather} />
          <MapAndOptions
            location={location}
            onOptionsChange={handleOptionsChange}
          />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
