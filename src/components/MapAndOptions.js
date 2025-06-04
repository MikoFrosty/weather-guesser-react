import "./MapAndOptions.css";
import Options from "./Options";

export default function MapAndOptions({ location, onOptionsChange }) {
  function loadMap() {
    const cityQuery = encodeURIComponent(location[0]);
    return (
      <iframe
        title="map"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${cityQuery}&t=k&z=3&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
      />
    );
  }

  return (
    <div id="map-and-options-wrapper">
      <div id="map-wrapper">{loadMap()}</div>
      <Options onOptionsChange={onOptionsChange} />
    </div>
  );
}
