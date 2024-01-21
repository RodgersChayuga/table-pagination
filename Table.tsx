import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

const Table = () => {
  const [data, setData] = useState({ count: 0, results: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${USERS_URL}?page=${page}`);
      const result = await response.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  // const lastPage = Math.floor((data.count - 1) / 10);
  const lastPage = data.count > 0 ? Math.floor((data.count - 1) / 10) : 0;

  const handleFirstPageClick = () => {
    if (currentPage !== 0 && !loading) {
      setCurrentPage(0);
    }
  };

  const handlePreviousPageClick = () => {
    if (currentPage > 0 && !loading) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < lastPage && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPageClick = () => {
    if (currentPage !== lastPage && !loading) {
      setCurrentPage(lastPage);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          onClick={handleFirstPageClick}
          disabled={currentPage === 0 || loading}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          onClick={handlePreviousPageClick}
          disabled={currentPage === 0 || loading}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          onClick={handleNextPageClick}
          disabled={currentPage === lastPage || loading}
        >
          next
        </button>
        <button
          className="last-page-btn"
          onClick={handleLastPageClick}
          disabled={currentPage === lastPage || loading}
        >
          last
        </button>
      </section>
    </div>
  );
};

export default Table;
