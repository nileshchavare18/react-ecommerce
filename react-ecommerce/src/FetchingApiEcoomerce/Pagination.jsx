import React from "react";

function Pagination({ pagePerPost, setCurrentPage, totalPost, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / pagePerPost); i++) {
    pages.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        {pages.map((page, index) => (
          <li key={index} className={`page-item ${page === currentPage ? "active" : ""}`}>
            <button
              onClick={() => setCurrentPage(page)}
              className="page-link"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
