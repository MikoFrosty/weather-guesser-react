import "./NewCityAndOptions.css";

export default function NewCityAndOptions({ onNewCityClick }) {
  return (
    <div id="button-wrapper">
      <button
        id="new-city-button"
        className="button"
        onClick={onNewCityClick}
      >
        New City
      </button>
    </div>
  );
}