import "./Answer.css";

export default function Answer({ answer, weather, isLoading }) {
  function getAnswer() {
    const [condition, script] = answer;

    switch (condition) {
      case 0:
        return "";
      case 1:
        return (
          <>
            <span className="loseh-text">Too high!</span> {script}
          </>
        );
      case 2:
        return (
          <>
            <span className="losel-text">Too low!</span> {script}
          </>
        );
      case 3:
        return (
          <>
            <span className="win-text">YOU WIN!</span> {script}
          </>
        );
      case 4:
        return <code>The weather is unavailable right now :/</code>;
      default:
        return "ERROR";
    }
  }

  return (
    <>
      <p id="answer" className={isLoading ? "loader" : undefined}>
        {getAnswer()}
      </p>
      <div
        id="current-weather"
        style={{ borderTop: weather ? "1px solid black" : "none" }}
      >
        {weather}
      </div>
    </>
  );
}
