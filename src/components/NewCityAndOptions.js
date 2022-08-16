import "./NewCityAndOptions.css";

export default function NewCityAndOptions({ onNewCityClick, onOptionsClick }) {
    return (
        <div id="button-wrapper">
          <button id="new-city-button" className="button" onClick={onNewCityClick}>New City</button>
          <button id="option-button" className="button" onClick={onOptionsClick}>Options</button>
        </div>
    );
}