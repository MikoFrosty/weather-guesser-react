import "./Onboarding.css";

export default function Onboarding({ onClose }) {
  return (
    <div id="onboarding-overlay">
      <div id="onboarding-card">
        <h2>Getting Started</h2>
        <ol>
          <li>
            Select <strong>New City</strong> to pick a location.
          </li>
          <li>Enter your temperature guess and submit.</li>
          <li>
            Use <strong>Options</strong> to adjust units, region and difficulty.
          </li>
        </ol>
        <button id="onboarding-close" className="button" onClick={onClose}>
          Start Playing
        </button>
      </div>
    </div>
  );
}
