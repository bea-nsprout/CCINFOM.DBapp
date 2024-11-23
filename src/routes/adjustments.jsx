import React, { useState, useEffect } from "react";

export default function Adjustments() {
  const [adjustments, setAdjustments] = useState([]); // Adjustment records
  const [searchType, setSearchType] = useState("date"); // Default search type
  const [searchInput, setSearchInput] = useState(""); // Search input for itemCode or warehouse
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range

  useEffect(() => {
    fetchAdjustments(); // Fetch all adjustment records on component load
  }, []);

  // Fetch adjustment records
  const fetchAdjustments = async () => {
    try {
      const response = await fetch("/api/adjustments/view");
      const data = await response.json();
      setAdjustments(data);
    } catch (error) {
      console.error("Error fetching adjustments:", error);
    }
  };

  // Search adjustment records based on filters
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchType === "itemCode" && searchInput) {
        queryParams.append("item_code", searchInput);
      }
      if (searchType === "warehouse" && searchInput) {
        queryParams.append("warehouse_name", searchInput);
      }
      if (searchType === "date" && startDate && endDate) {
        queryParams.append("start_date", startDate);
        queryParams.append("end_date", endDate);
      }

      const response = await fetch(`/api/adjustments/view?${queryParams.toString()}`);
      const data = await response.json();
      setAdjustments(data);
    } catch (error) {
      console.error("Error searching adjustments:", error);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="styles/adjustments.css"></link>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="date">Given Date</option>
          <option value="itemCode">Item Code</option>
          <option value="warehouse">Warehouse</option>
        </select>

        {(searchType === "itemCode" || searchType === "warehouse") && (
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

        <button id="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Adjustments Records Table */}
      <table className="adjustments-table">
        <thead>
          <tr>
            <th>Time Log</th>
            <th>Warehouse</th>
            <th>Item Code</th>
            <th>Quantity Adjusted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adjustments.length === 0 ? (
            <tr>
              <td colSpan="5">No adjustment records found</td>
            </tr>
          ) : (
            adjustments.map((record) => (
              <tr key={record.time_log}>
                <td>{record.time_log}</td>
                <td>{record.warehouse_name}</td>
                <td>{record.item_code}</td>
                <td>{record.qty_adjusted}</td>
                <td>
                  <button onClick={() => alert("Edit functionality not implemented!")}>
                    Edit
                  </button>
                  <button onClick={() => alert("Delete functionality not implemented!")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
