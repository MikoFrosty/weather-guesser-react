import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import NewCityAndOptions from "./components/NewCityAndOptions";
import GuessForm from "./components/GuessForm";
import MapAndOptions from "./components/MapAndOptions";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <section id="main-content">
          <NewCityAndOptions />
          <h2>
            How hot is <span id="current-city"></span> right now?
          </h2>
          <GuessForm />
          <p>
            <sub>
              You win if your guess is{" "}
              <span id="win-condition">within 10°</span>
            </sub>
          </p>
          {/*<!-- Answer -->*/}
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
