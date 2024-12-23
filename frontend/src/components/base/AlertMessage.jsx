//AlertMessage.jsx
export default function AlertMessage({ classes, message }) {
  return <div className={`p-4 rounded-lg ${classes}`}>{message}</div>;
}
