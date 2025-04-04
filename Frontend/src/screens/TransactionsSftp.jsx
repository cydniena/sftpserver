import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Transactions.css";

function TransactionsSftp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5002/api/transactions"
        );
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSearch = () => {
    const filtered = transactions.filter((txn) =>
      Object.values(txn).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleFetchFile = async () => {
    setFetchLoading(true);
    setError(null);
    setFetchStatus(null);
    try {
      const response = await axios.post(
        "http://18.140.63.244:5002/fetch-transactions"
      );
      console.log("Transactions fetched successfully", response.data);

      const updatedTransactions = await axios.get(
        "http://127.0.0.1:5002/api/transactions"
      );
      setTransactions(updatedTransactions.data);
      setFilteredTransactions(updatedTransactions.data);
      setFetchStatus({
        type: "success",
        message: "Transactions successfully uploaded to SQL!",
      });
      setFetchLoading(false);
    } catch (err) {
      console.error("Error fetching file:", err);
      setError("Failed to fetch transactions from SFTP. Please try again.");
      setFetchLoading(false);
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1 className="theader">View Transactions</h1>
        <div className="header-container">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search Transactions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleFetchFile}
          disabled={fetchLoading}
          className="fetch-button"
        >
          {fetchLoading ? "Fetching..." : "Fetch Transactions"}
        </button>
      </div>

      {loading && <p className="loading-text">Loading transactions...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <>
          {fetchStatus && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>
                  {fetchStatus.type === "success" ? "Success!" : "Error!"}
                </h2>
                <p>{fetchStatus.message}</p>
                <button
                  className="close-button"
                  onClick={() => setFetchStatus(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction ID</th>
                  <th>Client ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((txn, i) => (
                  <tr key={txn.transaction_id}>
                    <td>{indexOfFirstTransaction + i + 1}</td>
                    <td>{txn.transaction_id}</td>
                    <td>{txn.client_id}</td>
                    <td>${txn.amount}</td>
                    <td>
                      {new Date(txn.transaction_date).toLocaleDateString()}
                    </td>
                    <td>{txn.transaction_type}</td>
                    <td
                      className={`status ${
                        txn.transaction_status === "completed"
                          ? "status-completed"
                          : txn.transaction_status === "pending"
                          ? "status-pending"
                          : "status-failed"
                      }`}
                    >
                      {txn.transaction_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-footer">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionsSftp;