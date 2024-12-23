// PageTitle.jsx
export default function PageTitle({ classes, title }) {
  return (
    <h2 className={`font-bold text-zinc-700 text-xl ${classes}`}>{title}</h2>
  );
}
