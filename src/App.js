import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import NewCityAndOptions from "./components/NewCityAndOptions";
import GuessForm from "./components/GuessForm";
import MapAndOptions from "./components/MapAndOptions";
import { places } from "./modules/places";

function App() {
  const [location, setLocation] = useState(["Loading...", ""]);

  const [city, country] = location;
  const cityString = `${city
    .replace(/_/g, " ")
    .replace(/[,]%20\w+/, "")}, ${country}`;

  useEffect(() => {
    setLocation(() => places[Math.floor(Math.random() * places.length)]);
  }, []);

  function handleNewCityClick() {
    setLocation(() => places[Math.floor(Math.random() * places.length)]);
  }

  function handleOptionsClick() {
    // Toggle options screen
  }

  function handleFormSubmit() {
    // Handle form submission
  }

  return (
    <>
      <div className="App">
        <Header />
        <section id="main-content">
          <NewCityAndOptions onNewCityClick={handleNewCityClick} />
          <GuessForm currentCity={cityString} />
          <p>
            <sub>
              You win if your guess is{" "}
              <span id="win-condition">within 10°</span>
            </sub>
          </p>
          <p id="answer"></p>
          <div id="current-weather"></div>
          <MapAndOptions />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
