import React, { useState, useEffect } from "react";

export default function Production() {
  const [productions, setProductions] = useState([]); // Production records
  const [warehouses, setWarehouses] = useState([]); // Warehouse options
  const [searchType, setSearchType] = useState("itemCode"); // Default search type
  const [searchInput, setSearchInput] = useState(""); // Search input
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range

  // Fetch production and warehouse data
  useEffect(() => {
    fetchProductions();
    fetchWarehouses();
  }, []);

  // Fetch production records
  const fetchProductions = async () => {
    try {
      const response = await fetch("/api/productions/view");
      const data = await response.json();
      setProductions(data);
    } catch (error) {
      console.error("Error fetching productions:", error);
    }
  };

  // Fetch warehouse data
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
      if (searchType === "warehouse" && searchInput) {
        queryParams.append("warehouse_name", searchInput);
      }
      if (searchType === "date" && startDate && endDate) {
        queryParams.append("start_date", startDate);
        queryParams.append("end_date", endDate);
      }

      const response = await fetch(`/api/productions/view?${queryParams.toString()}`);
      const data = await response.json();
      setProductions(data);
    } catch (error) {
      console.error("Error fetching filtered productions:", error);
    }
  };

  // Create a new production record
  const createProductionRecord = async (event) => {
    event.preventDefault();

    const productionData = {
      item_code: document.getElementById("item-code").value,
      qty_produced: parseInt(document.getElementById("quantity-produced").value),
      date_produced: document.getElementById("production-date").value,
      warehouse_id: parseInt(document.getElementById("warehouse-location").value),
    };

    try {
      const response = await fetch("/api/productions/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productionData),
      });
      if (response.ok) {
        alert("Production Record Created");
        fetchProductions(); // Refresh production records
      } else {
        console.error("Error creating production record:", response);
      }
    } catch (error) {
      console.error("Error creating production record:", error);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="styles/production.css"></link>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="itemCode">Item Code</option>
          <option value="date">Date</option>
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

      {/* Production Records Table */}
      <table className="production-table">
        <thead>
          <tr>
            <th>Production ID</th>
            <th>Item Code</th>
            <th>Quantity Produced</th>
            <th>Production Date</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productions.length === 0 ? (
            <tr>
              <td colSpan="6">No production records found</td>
            </tr>
          ) : (
            productions.map((record) => (
              <tr key={record.production_id}>
                <td>{record.production_id}</td>
                <td>{record.item_code}</td>
                <td>{record.qty_produced}</td>
                <td>{record.date_produced}</td>
                <td>{record.warehouse_name}</td>
                <td>
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

      {/* Create New Production Record Modal */}
      <button
        id="new-production-btn"
        onClick={() =>
          (document.getElementById("new-production-modal").style.display = "flex")
        }
      >
        New Production Record
      </button>

      <div id="new-production-modal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() =>
              (document.getElementById("new-production-modal").style.display =
                "none")
            }
          >
            &times;
          </span>
          <h3>Create New Production Record</h3>
          <form onSubmit={createProductionRecord}>
            <label htmlFor="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label htmlFor="quantity-produced">Quantity Produced:</label>
            <input type="number" id="quantity-produced" required />

            <label htmlFor="production-date">Production Date:</label>
            <input type="date" id="production-date" required />

            <label htmlFor="warehouse-location">Warehouse Location:</label>
            <select id="warehouse-location">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.location}
                </option>
              ))}
            </select>

            <button type="submit">Submit Production</button>
          </form>
        </div>
      </div>
    </>
  );
}
