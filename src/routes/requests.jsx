import React, { useState, useEffect } from "react";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [searchType, setSearchType] = useState("itemCode"); // Default search type
  const [searchInput, setSearchInput] = useState(""); // Input for search box
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range
  const [warehouses, setWarehouses] = useState([]); // Available warehouses for dropdown
  const [personnel, setPersonnel] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch initial data (requests and warehouses)
  useEffect(() => {
    fetchRequests();
    fetchWarehouses();
    fetchPersonnel();
    fetchItems();
    fetchTrucks(selectedItem);
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

  // Fetch personnel
  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/api/personnel/view");
      const data = await response.json();
      data.sort((a, b) => a.last_name.localeCompare(b.last_name));
      setPersonnel(data);
    } catch (error) {
      console.error("Error fetching personnel:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items/view/all");
      const data = await response.json();
      console.log(data);
      setItems(data);

    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }

  const fetchTrucks = async (selectedItem) => {
    try {
      const queryParams = new URLSearchParams();
      console.log(selectedItem);
      queryParams.append("warehouse_id", selectedItem?.warehouse_from_id);
      console.log(queryParams.toString());
      const response = await fetch(`/api/trucks/view?${queryParams.toString()}`);
      const data = await response.json();
      console.log(data);
      setTrucks(data);

    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }


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
      if (statusFilter) {
        queryParams.append("status", statusFilter.toUpperCase());
      }

      const response = await fetch(`/api/requests/view?${queryParams.toString()}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching filtered transfers:", error);
    }
  };

  // Filter data based on the search query and status filter
  const filteredData = requests.filter((record) => {
    let matchesSearch = true;
    let matchesStatus = true;

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
      const recordDate = new Date(record.date_requested);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Make end date inclusive
      matchesSearch = recordDate >= start && recordDate < end;
    }

    if (statusFilter === 'pending') {
      matchesStatus = record.qty_balance > 0;
    }
    if (statusFilter === 'completed') {
      matchesStatus = record.qty_balance <= 0;
    }

    return matchesSearch && matchesStatus;
  });

  const showEditModal = (item) => {
    setSelectedItem(item);
    document.getElementById("editDialog").showModal();
  }

  const showDeleteModal = (item) => {
    setSelectedItem(item);
    document.getElementById("deleteDialog").showModal();
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const requestData = {};
    data.forEach((value, key) => requestData[key] = value);

    try {
      const response = await fetch("/api/requests/modify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Request edited successfully!");
        document.getElementById("editDialog").close();
        fetchRequests();
      } else {
        console.error("Error creating request:", response);
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }


  }

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const requestData = {};
    data.forEach((value, key) => requestData[key] = value);


    try {
      const response = await fetch("/api/requests/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Request deleted successfully!");
        fetchRequests();
      } else {
        alert("Could not delete request. Total not equal to balance.");
        console.error("Error deleting request:", response);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    } finally {
      document.getElementById("deleteDialog").close();
    }
  }

  // Create a new request
  const createRequest = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const requestData = {};
    data.forEach((value, key) => requestData[key] = value);

    console.log(requestData);

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

  const createTransfer = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const transferData = {};
    data.forEach((value, key) => transferData[key] = value);

    console.log(transferData);
    // const transferData = {
    //   request_id: 1, // Replace with the actual request ID
    //   personnel_id: 1, // Replace with actual personnel ID
    //   truck_id: document.getElementById("truck-id").value,
    //   quantity: parseInt(document.getElementById("quantity").value),
    // };

    try {
      const response = await fetch("/api/transfers/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });
      if (response.ok) {
        alert("Transfer created successfully!");
        fetchRequests();
      } else {
        console.error("Error creating transfer:", response);
      }
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
    document.getElementById("new-transfer-modal").style.display = "none"; // Open the modal
  };

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleNewTransfer = async (request) => {
    setSelectedRequest(request); // Store the selected row data
    document.getElementById("new-transfer-modal").style.display = "flex"; // Open the modal
    await fetchTrucks(request);
  };


  return (
    <>
      <link rel="stylesheet" href="styles/requests.css"></link>

      {/* Search and Filter Section */}

      <button id="new-request-btn" onClick={() => document.getElementById("new-request-modal").style.display = "flex"}>
        New Request
      </button>
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

        <select
          id="status-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Requests Table */}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Item Code</th>
            <th>Quantity Balance</th>
            <th>Quantity Total</th>
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
            filteredData.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                <td>{request.item_code}</td>
                <td>{request.qty_balance}</td>
                <td>{request.qty_total}</td>
                <td>{request.warehouse_from}</td>
                <td>{request.warehouse_to}</td>
                <td>{request.date_requested}</td>
                <td>{request.status}</td>
                <td>
                  {/* Actions */}
                  <button onClick={() => handleNewTransfer(request)}>
                    New Transfer
                  </button>
                  <button onClick={() => showEditModal(request)}>
                    Edit
                  </button>
                  <button onClick={() => showDeleteModal(request)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Create Request Modal */}

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
            <label htmlFor="item_code">Item Code:</label>
            <select id="item_code" name="item_code" required>
              {items?.map((item) => (
                <option key={item.item_code} value={item.item_code}>
                  {item.item_code + ", " + item.item_desc}
                </option>
              ))}
            </select>

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required />

            <label htmlFor="personnel_id">Request By:</label>
            <select id="personnel_id" name="personnel_id" required>
              {personnel?.map((person) => (
                <option key={person.personnel_id} value={person.personnel_id}>
                  {person.last_name + ", " + person.first_name}
                </option>
              ))}
            </select>

            <label htmlFor="from-warehouse">From Warehouse:</label>
            <select id="from-warehouse" name="warehouse_from_id">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name + " - " + warehouse.location}
                </option>
              ))}
            </select>

            <label htmlFor="to-warehouse">To Warehouse:</label>
            <select id="to-warehouse" name="warehouse_to_id">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name + " - " + warehouse.location}
                </option>
              ))}
            </select>

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>

      <dialog id="editDialog" className="dialog">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("editDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Edit Request</h3>
          <form onSubmit={handleEditSubmit}>
            <label htmlFor="request_id">Request ID:</label>
            <input type="text" name="request_id" value={selectedItem?.request_id} readOnly />

            <label htmlFor="new_qty_total">New Total:</label>
            <input type="number" name="new_qty_total" onChange={handleInputChange} defaultValue={selectedItem?.qty_total} />

            <button type="submit">Edit</button>
          </form>
        </div>
      </dialog>

      <dialog id="deleteDialog" className="dialog delete">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("deleteDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Delete Entry</h3>
          <form onSubmit={handleDeleteSubmit}>
            <input type="hidden" name="request_id" value={selectedItem?.request_id} />
            <button type="submit" style={{ background: "red" }}>Yes</button>
          </form>
          <button onClick={() => document.getElementById("deleteDialog").close()}>Close</button>
        </div>
      </dialog>

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

            <input type="hidden" name="request_id" value={selectedRequest?.request_id || ""} />
            <label htmlFor="personnel_id">Request By:</label>
            <select id="personnel_id" name="personnel_id" required>
              {personnel?.map((person) => (
                <option key={person.personnel_id} value={person.personnel_id}>
                  {person.last_name + ", " + person.first_name}
                </option>
              ))}
            </select>
            <label htmlFor="personnel_id">Truck:</label>
            <select id="truck_id" name="truck_id" required>
              {trucks?.map((truck) => (
                <option key={truck.truck_id} value={truck.truck_id}>
                  {truck.truck_id}
                </option>
              ))}
            </select>


            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required />

            <label htmlFor="item-code">Item Code:</label>
            <input
              type="text"
              id="item-code"
              name="item-code"
              value={selectedRequest?.item_code || ""}
              readOnly
            />


            <label htmlFor="from-warehouse">From Warehouse:</label>
            <input
              type="text"
              id="from-warehouse"
              name=""
              value={selectedRequest?.warehouse_from || ""}
              readOnly
            />

            <label htmlFor="to-warehouse">To Warehouse:</label>
            <input
              type="text"
              id="to-warehouse"
              value={selectedRequest?.warehouse_to || ""}
              readOnly
            />

            <button type="submit">Submit Transfer</button>
          </form>


        </div>
      </div>
    </>
  );
}
