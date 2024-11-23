import React, { useState, useEffect } from "react";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [searchType, setSearchType] = useState("itemCode"); // Default search type
  const [searchInput, setSearchInput] = useState(""); // Input for search box
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range
  const [warehouses, setWarehouses] = useState([]); // Available warehouses for dropdown

  // Fetch initial data (requests and warehouses)
  useEffect(() => {
    fetchRequests();
    fetchWarehouses();
  }, []);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/requests/view");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Fetch available warehouses
  const fetchWarehouses = async () => {
    try {
      const response = await fetch("/api/warehouses/view");
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchType === "itemCode" && searchInput) {
        queryParams.append("item_code", searchInput);
      }
      if (searchType === "date" && startDate && endDate) {
        queryParams.append("date_requested", startDate); // Adjust if API supports range
        queryParams.append("end_date", endDate);
      }
      if (statusFilter) {
        queryParams.append("status", statusFilter.toUpperCase());
      }

      const response = await fetch(`http://localhost:3000/api/requests/view?${queryParams.toString()}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching filtered requests:", error);
    }
  };

  // Create a new request
  const createRequest = async (event) => {
    event.preventDefault();

    const requestData = {
      personnel_id: 1, // Replace with actual personnel ID from user data
      item_code: document.getElementById("item-code").value,
      qty_balance: parseInt(document.getElementById("quantity").value),
      qty_total: parseInt(document.getElementById("quantity").value),
      warehouse_from_id: parseInt(document.getElementById("from-warehouse").value),
      warehouse_to_id: parseInt(document.getElementById("to-warehouse").value),
    };

    try {
      const response = await fetch("/api/requests/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Request created successfully!");
        fetchRequests();
      } else {
        console.error("Error creating request:", response);
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="styles/requests.css"></link>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="itemCode">Item Code</option>
          <option value="date">Date</option>
        </select>

        {searchType === "itemCode" && (
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        )}

        {searchType === "date" && (
          <div className="date-range">
            <input
              type="date"
              id="start-date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              id="end-date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}

        <select
          id="status-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Requests Table */}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="8">No requests found</td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                <td>{request.item_code}</td>
                <td>{request.qty_balance}</td>
                <td>{request.warehouse_from_id}</td>
                <td>{request.warehouse_to_id}</td>
                <td>{request.date_requested}</td>
                <td>{request.status}</td>
                <td>
                  {/* Actions */}
                  <button onClick={() => alert("Edit functionality not yet implemented!")}>
                    Edit
                  </button>
                  <button onClick={() => alert("Delete functionality not yet implemented!")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Create Request Modal */}
      <button id="new-request-btn" onClick={() => document.getElementById("new-request-modal").style.display = "flex"}>
        New Request
      </button>

      <div id="new-request-modal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => document.getElementById("new-request-modal").style.display = "none"}
          >
            &times;
          </span>
          <h3>Create New Request</h3>
          <form onSubmit={createRequest}>
            <label htmlFor="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" required />

            <label htmlFor="from-warehouse">From Warehouse:</label>
            <select id="from-warehouse">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.location}
                </option>
              ))}
            </select>

            <label htmlFor="to-warehouse">To Warehouse:</label>
            <select id="to-warehouse">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.location}
                </option>
              ))}
            </select>

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </>
  );
}
