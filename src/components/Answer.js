import "./Answer.css";

function Spinner({ active }) {
  return <div className="spinner" style={{ opacity: active ? 1 : 0 }} />;
}

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
    <div className="answer-wrapper">
      <Spinner active={isLoading} />
      <p id="answer" className="fade" style={{ opacity: isLoading ? 0 : 1 }}>
        {getAnswer()}
      </p>
      <div
        id="current-weather"
        className="fade"
        style={{
          opacity: isLoading ? 0 : 1,
          borderTop: weather ? "1px solid black" : "none",
        }}
      >
        {weather}
      </div>
    </div>
  );
}
