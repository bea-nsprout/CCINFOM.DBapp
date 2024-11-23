import React, { useState } from "react";

export default function Requests() {

  function showNewRequest() {
    document.getElementById('new-request-modal').style.display = 'flex';
  }

  function closeNewRequest() {
    document.getElementById('new-request-modal').style.display = 'none';
  }

  function confirmNewRequest() {
    alert("Request Submitted");
    closeNewRequest();
  }

  const [searchType, setSearchType] = useState("itemCode"); // Default search type is "itemCode"

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value); // Update the search type based on the dropdown selection
  };

  return (
    <>
      <link rel="stylesheet" href="styles/requests.css"></link>

      <div className="search-filter">
        <select id="search-type" onChange={handleSearchTypeChange}>
          <option value="itemCode">Item Code</option>
          <option value="date">Date</option>
        </select>

        {searchType === "itemCode" && (
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


        <select id="status-filter">
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button>Search</button>
      </div>

      <table class="requests-table">
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
          {

          }
        </tbody>
      </table>

      <button id="new-request-btn" onClick={showNewRequest}>New Request</button>

      <div id="new-request-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewRequest}>&times;</span>
          <h3>Create New Request</h3>
          <form>
            <label for="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" required />

            <label htmlFor="from-warehouse">From Warehouse:</label>
            <select id="from-warehouse">
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
            </select>

            <label htmlFor="to-warehouse">To Warehouse:</label>
            <select id="to-warehouse">
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
            </select>

            <button type="submit" onClick={confirmNewRequest}>Submit Request</button>
          </form>
        </div>
      </div>
    </>
  )
}
