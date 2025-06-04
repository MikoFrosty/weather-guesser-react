import "./DarkModeToggle.css";

export default function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button className="dark-toggle button" onClick={onToggle}>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
