import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "text-gray-500" : "text-blue-600"
            }`}
          >
            {index === items.length - 1 ? (
              <span>/&nbsp;{item.label}</span>
            ) : (
              <Link to={item.path}>/&nbsp;{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
