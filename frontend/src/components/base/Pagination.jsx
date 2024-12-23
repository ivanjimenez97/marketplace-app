// Pagination.jsx
import React from "react";

const Pagination = ({ meta, onPageChange }) => {
  const handlePageChange = (url) => {
    if (url) {
      onPageChange(url);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-4">
      <button
        className={`mx-1 px-3 py-1 rounded ${
          meta.current_page === 1
            ? "bg-indigo-500 text-white cursor-not-allowed"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
        }`}
        onClick={() =>
          handlePageChange(meta.links.find((link) => link.label === "1").url)
        }
        disabled={meta.current_page === 1}
      >
        First
      </button>
      {meta.links.map((link, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-1 rounded ${
            link.active
              ? "bg-indigo-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          onClick={() => handlePageChange(link.url)}
          disabled={!link.url}
        >
          {link.label
            ? link.label.replace("&laquo;", "«").replace("&raquo;", "»")
            : ""}
        </button>
      ))}
      <button
        className={`mx-1 px-3 py-1 rounded ${
          meta.current_page === meta.last_page
            ? "bg-indigo-500 text-white cursor-not-allowed"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
        }`}
        onClick={() =>
          handlePageChange(
            meta.links.find((link) => link.label === String(meta.last_page)).url
          )
        }
        disabled={meta.current_page === meta.last_page}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
