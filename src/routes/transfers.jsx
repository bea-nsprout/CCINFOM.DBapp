import React, { useState, useEffect } from "react";

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [searchType, setSearchType] = useState("itemCode"); // Default search type
  const [searchInput, setSearchInput] = useState(""); // Search input for text-based filters
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range
  const [selectedTransfer, setSelectedTransfer] = useState(null); // Selected transfer for editing or deleting

  // Fetch initial data
  useEffect(() => {
    fetchTransfers();
    fetchWarehouses();
  }, []);

  // Fetch all transfers
  const fetchTransfers = async () => {
    try {
      const response = await fetch("/api/transfers/view");
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
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
      if (searchType === "srcWarehouse" && searchInput) {
        queryParams.append("warehouse_from_id", searchInput);
      }
      if (searchType === "desWarehouse" && searchInput) {
        queryParams.append("warehouse_to_id", searchInput);
      }
      if (searchType === "date" && startDate && endDate) {
        queryParams.append("date_transferred", startDate);
        queryParams.append("end_date", endDate);
      }

      const response = await fetch(`/api/transfers/view?${queryParams.toString()}`);
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching filtered transfers:", error);
    }
  };

  // Filter data based on the search query
  const filteredData = transfers.filter((record) => {
    let matchesSearch = true;

    if (searchType === 'itemCode') {
        matchesSearch = record.item_code.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'srcWarehouse') {
        matchesSearch = record.warehouse_from.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'desWarehouse') {
        matchesSearch = record.warehouse_to.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'date') {
        const recordDate = new Date(record.date_transferred);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1); // Make end date inclusive
        matchesSearch = recordDate >= start && recordDate < end;
    }

    return matchesSearch;
  });

  // Show Edit Modal
  const showEditModal = (transfer) => {
    setSelectedTransfer(transfer);
    document.getElementById("editDialog").showModal();
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedTransfer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Submit
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const transferData = {};
    data.forEach((value, key) => transferData[key] = value);
    try {
      const response = await fetch("/api/transfers/modify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });
      if (response.ok) {
        alert("Transfer edited successfully!");
        document.getElementById("editDialog").close();
        fetchTransfers();
      } else {
        console.error("Error editing transfer:", response);
      }
    } catch (error) {
      console.error("Error editing transfer:", error);
    }
  };

  // Show Delete Modal
  const showDeleteModal = (transfer) => {
    setSelectedTransfer(transfer);
    document.getElementById("deleteDialog").showModal();
  };

  // Handle Delete Submit
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const transferData = {};
    data.forEach((value, key) => transferData[key] = value);
    try {
      const response = await fetch("/api/transfers/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });
      if (response.ok) {
        alert("Transfer deleted successfully!");
        fetchTransfers();
      } else {
        console.error("Error deleting transfer:", response);
      }
    } catch (error) {
      console.error("Error deleting transfer:", error);
    } finally {
      document.getElementById("deleteDialog").close();
    }
  };

  // Create a new transfer
  const createTransfer = async (event) => {
    event.preventDefault();
    const transferData = {
      request_id: 1, // Replace with the actual request ID
      personnel_id: 1, // Replace with actual personnel ID
      truck_id: document.getElementById("truck-id").value,
      quantity: parseInt(document.getElementById("quantity").value),
    };

    try {
      const response = await fetch("/api/transfers/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });
      if (response.ok) {
        alert("Transfer created successfully!");
        fetchTransfers();
      } else {
        console.error("Error creating transfer:", response);
      }
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="styles/transfers.css"></link>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="itemCode">Item Code</option>
          <option value="srcWarehouse">Source Warehouse</option>
          <option value="desWarehouse">Destination Warehouse</option>
          <option value="date">Date</option>
        </select>

        {(searchType === "itemCode" || searchType === "srcWarehouse" || searchType === "desWarehouse") && (
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

        <button id="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Transfers Table */}
      <table className="transfers-table">
        <thead>
          <tr>
            <th>Transfer ID</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Transfer Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8">No transfers found</td>
            </tr>
          ) : (
            filteredData.map((transfer) => (
              <tr key={transfer.transfer_id}>
                <td>{transfer.transfer_id}</td>
                <td>{transfer.item_code}</td>
                <td>{transfer.quantity}</td>
                <td>{transfer.warehouse_from}</td>
                <td>{transfer.warehouse_to}</td>
                <td>{transfer.date_transferred}</td>
                <td>
                  <button onClick={() => showEditModal(transfer)}>Edit</button>
                  <button onClick={() => showDeleteModal(transfer)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div id="new-transfer-modal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => document.getElementById("new-transfer-modal").style.display = "none"}
          >
            &times;
          </span>
          <h3>Create New Transfer</h3>
          <form onSubmit={createTransfer}>
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

            <button type="submit">Submit Transfer</button>
          </form>
        </div>
      </div>

      { /* Edit Transfer Modal */}
        <dialog id="editDialog" className="dialog">
          <div className="dialog-content">
            <button
              className="close"
              onClick={() => document.getElementById("editDialog").close()}
              aria-label="Close"
            >
              &times;
            </button>
            <h3>Edit Transfer</h3>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="transfer_id">Transfer ID:</label>
              <input type="text" name="transfer_id" value={selectedTransfer?.transfer_id} readOnly />

              <label htmlFor="new_quantity">New Quantity:</label>
              <input type="number" name="new_qty" onChange={handleInputChange} defaultValue={selectedTransfer?.quantity} />

              <button type="submit">Edit</button>
            </form>
          </div>
        </dialog>

        { /* Delete Transfer Modal */ }
          <dialog id="deleteDialog" className="dialog delete">
            <div className="dialog-content">
              <button
                className="close"
                onClick={() => document.getElementById("deleteDialog").close()}
                aria-label="Close"
              >
                &times;
              </button>
              <h3>Delete Transfer</h3>
              <form onSubmit={handleDeleteSubmit}>
                <input type="hidden" name="transfer_id" value={selectedTransfer?.transfer_id} />
                <button type="submit" style={{ background: "red" }}>Yes</button>
              </form>
              <button onClick={() => document.getElementById("deleteDialog").close()}>Close</button>
            </div>
          </dialog>

    </>
  );
}
