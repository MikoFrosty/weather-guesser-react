import "./MapAndOptions.css";
import Options from "./Options";

export default function MapAndOptions({ location }) {
  function loadMap() {
    return (
      <iframe
        title="map"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${location[0]}&t=k&z=3&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
      ></iframe>
    );
  }

  return (
    <div id="map-and-options-wrapper">
      <Options />
      <div id="map-wrapper">{loadMap()}</div>
    </div>
  );
}
