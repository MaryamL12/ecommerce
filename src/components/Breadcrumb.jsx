import { Link } from "react-router-dom";
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb d-flex flex-wrap align-items-center gap-2">
      <Link to="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.label} className="crumb-group">
          <span className="sep">→</span>
          {i === items.length - 1
            ? <span className="crumb-active">{item.label}</span>
            : <Link to={item.to}>{item.label}</Link>}
        </span>
      ))}
    </nav>
  );
}
