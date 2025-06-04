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

export default function App() {
  const [location, setLocation] = useState(["Loading...", ""]);
  const [answer, setAnswer] = useState([0, ""]);
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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


  // Turns location data into a string for text display
  function cityString() {
    const [city, country] = location;
    const str = `${city
      .replace(/_/g, " ")
      .replace(/[,]%20\w+/, "")}, ${country}`;
    return str;
  }

  // returns text related to the current difficulty setting
  function difficultyString() {
    switch (options.difficulty) {
      case 0:
        return "within 10°";
      case 1:
        return "within 5°";
      case 2:
        return "an exact match";
      default:
        return "ERROR";
    }
  }

  // Loads a new city and updates all the necessary data
  function handleNewCityClick() {
    setAnswer([0, ""]);
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
    setIsLoading(true);
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

          // Package up the data for the answer component
          if (guess > temp + tempRange()) {
            setAnswer([1, script]);
          } else if (guess < temp - tempRange()) {
            setAnswer([2, script]);
          } else {
            setAnswer([3, script]);
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
        setAnswer([4, "The weather is unavailable right now :/"]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="App">
        <Header />
        <section id="main-content">
          <NewCityAndOptions onNewCityClick={handleNewCityClick} />
          <GuessForm
            currentCity={cityString()}
            onFormSubmit={handleAnswerSubmit}
            tempDisplay={options.tempDisplay}
            difficultyString={difficultyString()}
          />
          <Answer answer={answer} weather={weather} isLoading={isLoading} />
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
