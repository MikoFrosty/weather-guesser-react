import "./Message.css";

export default function Message({ text, type = "info" }) {
  if (!text) return null;
  return <p className={`message ${type}`}>{text}</p>;
}
