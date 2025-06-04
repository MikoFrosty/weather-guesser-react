import { useState } from "react";
import { places } from "../modules/places";
import "./CitySelector.css";

export default function CitySelector({ onSelect }) {
  const [value, setValue] = useState("");
  const cityNames = places.map((p) => p[0]);

  function handleChange(e) {
    const city = e.target.value;
    setValue(city);
    if (onSelect) {
      onSelect(city);
    }
  }

  return (
    <div id="city-selector-wrapper">
      <input
        id="city-selector"
        list="city-list"
        value={value}
        onChange={handleChange}
        placeholder="Select city"
      />
      <datalist id="city-list">
        {cityNames.map((c) => (
          <option key={c} value={c}>
            {c.replace(/_/g, " ")}
          </option>
        ))}
      </datalist>
    </div>
  );
}
