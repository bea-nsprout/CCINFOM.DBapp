import React, { useState } from "react";

export default function Adjustments() {

  function showNewProductionRecord() {
    document.getElementById('new-production-modal').style.display = 'flex';
  }

  function closeNewProductionRecord() {
    document.getElementById('new-production-modal').style.display = 'none';
  }

  function confirmNewProductionRecord() {
    alert("Production Record Added");
    closeNewRequest();
  }

  const [searchType, setSearchType] = useState("itemCode"); // Default search type is "itemCode"

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value); // Update the search type based on the dropdown selection
  };

  return (
    <>
      <link rel="stylesheet" href="styles/adjustments.css"></link>

      <div className="search-filter">
        <select id="search-type" onChange={handleSearchTypeChange}>
          <option value="givenDate">Given Date</option>
          <option value="itemCode">Item Code</option>
          <option value="warehouse">Warehouse</option>

        </select>

        {(searchType === "itemCode" || searchType == "warehouse") && (
          <div id="search-box" style={{ display: "block" }}>
            <input
              type="text"
              id="search-input"
              placeholder="Search..."
            />
          </div>)
        }

        {searchType === "date" && (
          <div id="search-date" style={{ display: "show" }}>
            <div className="date-range">
              <input type="date" id="start-date" />
              <span>to</span>
              <input type="date" id="end-date" />
            </div>
          </div>)
        }

        <button id="search-button">Search</button>
      </div>

      <table className="production-table">
        <thead>
          <tr>
            <th>Time Log</th>
            <th>Warehouse</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{/* Dynamically render table rows here */}</tbody>
      </table>
    </>
  );
}
