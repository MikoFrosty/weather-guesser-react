import "./NewCityAndOptions.css";
import CitySelector from "./CitySelector";

export default function NewCityAndOptions({ onNewCityClick, onOptionsClick }) {
  return (
    <div id="button-wrapper">
      <button
        id="new-city-button"
        className="button"
        onClick={() => onNewCityClick()}
      >
        New City
      </button>
      <CitySelector onSelect={onNewCityClick} />
      <button
        id="option-button"
        className="button"
        onClick={onOptionsClick}
      >
        Options
      </button>
    </div>
  );
}