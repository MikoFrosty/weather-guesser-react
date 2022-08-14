import "./MapAndOptions.css";

export default function MapAndOptions() {
  return (
    <div id="map-and-options-wrapper">
      <div id="options-wrapper" className="hide">
        <form id="options-temperature-form" class="options-form">
          <p>
            <strong>Temperature:</strong>
          </p>
          <input type="radio" id="f" name="temp" value="1" checked />
          <label htmlFor="f">Fahrenheit</label>
          <br />
          <input type="radio" id="c" name="temp" value="0" />
          <label htmlFor="c">Celsius</label>
        </form>
        <form id="options-region-form" class="options-form">
          <p>
            <strong>Region:</strong>
          </p>
          <select name="region" id="region">
            <option value="0">Global</option>
            <option value="1">North America</option>
            <option value="2">Europe</option>
            <option value="3">Asia</option>
          </select>
        </form>
        <form id="options-difficulty-form" class="options-form">
          <p>
            <strong>Difficulty:</strong>
          </p>
          <input type="radio" id="easy" name="difficulty" value="0" checked />
          <label htmlFor="easy">Within 10°</label>
          <br />
          <input type="radio" id="medium" name="difficulty" value="1" />
          <label htmlFor="medium">Within 5°</label>
          <br />
          <input type="radio" id="hard" name="difficulty" value="2" />
          <label htmlFor="hard">Exact Match</label>
        </form>
      </div>
      <div id="map-wrapper"></div>
    </div>
  );
}
