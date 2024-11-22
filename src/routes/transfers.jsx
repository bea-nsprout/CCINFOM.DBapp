import { useState } from "react";

export default function Transfers() {

  function showNewTransfer() {
    document.getElementById('new-transfer-modal').style.display = 'flex';
  }

  function closeNewTransfer() {
    document.getElementById('new-transfer-modal').style.display = 'none';
  }

  function confirmNewTransfer() {
    alert("Transfer Created");
    closeNewRequest();
  }

  const [searchType, setSearchType] = useState("itemCode"); // Default search type is "itemCode"

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value); // Update the search type based on the dropdown selection
  };


  return (
    <>
      <link rel="stylesheet" href="styles/transfers.css"></link>

      <div className="search-filter">
        <select id="search-type" onChange={handleSearchTypeChange}>
          <option value="itemCode">Item Code</option>
          <option value="srcWarehouse">Source Warehouse</option>
          <option value="desWarehouse">Destination Warehouse</option>
          <option value="date">Date</option>
        </select>

        {(searchType === "itemCode" || searchType == "srcWarehouse" || searchType == "desWarehouse") && (
        <div id="search-box" style={{ display: "block" }}>
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
          />
        </div>  )
        }

        {searchType === "date" && (
        <div id="search-date" style={{ display: "show" }}>
          <div className="date-range">
            <input type="date" id="start-date" />
            <span>to</span>
            <input type="date" id="end-date" />
          </div>
        </div> )
        }

        <select id="status-filter">
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button id="search-button">Search</button>
      </div>

      <table className="transfers-table">
        <thead>
          <tr>
            <th>Transfer ID</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Transfer Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // Table rows would be dynamically generated here
          }
        </tbody>
      </table>

      <button id="new-transfer-btn" onClick={showNewTransfer}>New Transfer</button>

      <div id="new-transfer-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewTransfer}>&times;</span>
          <h3>Create New Transfer</h3>
          <form>
            <label htmlFor="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label htmlFor="quantity">Quantity:</label>
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

            <button type="submit" onClick={confirmNewTransfer}>Submit Transfer</button>
          </form>
        </div>
      </div>
    </>
  )
}
