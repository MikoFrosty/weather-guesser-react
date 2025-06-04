import "./Onboarding.css";

export default function Onboarding({ onClose }) {
  return (
    <div id="onboarding-wrapper">
      <div id="onboarding-box">
        <h2>Welcome to Weather Guesser!</h2>
        <p>1. Click <strong>New City</strong> to choose a location.</p>
        <p>2. Enter your temperature guess and submit.</p>
        <p>3. Use <strong>Options</strong> to change units, region, and difficulty.</p>
        <button id="onboarding-close" className="button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
