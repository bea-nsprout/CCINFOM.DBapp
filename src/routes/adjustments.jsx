import React, { useState, useEffect } from 'react';

export default function Adjustments() {
  const [adjustments, setAdjustments] = useState([]);
  const [searchType, setSearchType] = useState('itemCode'); // Default search type
  const [searchInput, setSearchInput] = useState(''); // Search input for itemCode or warehouse
  const [startDate, setStartDate] = useState(''); // Start date for date range
  const [endDate, setEndDate] = useState(''); // End date for date range
  const [selectedAdjustment, setSelectedAdjustment] = useState(null); // Selected adjustment for editing or deleting

  useEffect(() => {
    fetchAdjustments(); // Fetch all adjustment records on component load
  }, []);

  // Fetch adjustment records
  const fetchAdjustments = async () => {
    try {
      const response = await fetch('/api/adjustments/view');
      const data = await response.json();
      setAdjustments(data);
    } catch (error) {
      console.error('Error fetching adjustments:', error);
    }
  };

  // Search adjustment records based on filters
  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchType === 'itemCode' && searchInput) {
        queryParams.append('item_code', searchInput);
      }
      if (searchType === 'warehouse' && searchInput) {
        queryParams.append('warehouse_name', searchInput);
      }
      if (searchType === 'date' && startDate && endDate) {
        queryParams.append('start_date', startDate);
        queryParams.append('end_date', endDate);
      }
      const response = await fetch(`/api/adjustments/view?${queryParams.toString()}`);
      const data = await response.json();
      setAdjustments(data);
    } catch (error) {
      console.error('Error searching adjustments:', error);
    }
  };

  // Filter data based on the search query
  const filteredData = adjustments.filter((record) => {
    if (searchType === 'itemCode') {
      return record.item_code.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'warehouse') {
      return record.warehouse_name.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'date') {
      const recordDate = new Date(record.time_log_php);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // to make it inclusive
      return recordDate >= start && recordDate <= end;
    }
    return true;
  });

  // Show Edit Modal
  const showEditModal = (adjustment) => {
    setSelectedAdjustment(adjustment);
    document.getElementById("editDialog").showModal();
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedAdjustment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Submit
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const adjustmentData = {};
    data.forEach((value, key) => adjustmentData[key] = value);
    try {
      const response = await fetch("/api/adjustments/modify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adjustmentData),
      });
      if (response.ok) {
        alert("Adjustment edited successfully!");
        document.getElementById("editDialog").close();
        fetchAdjustments();
      } else {
        console.error("Error editing adjustment:", response);
      }
    } catch (error) {
      console.error("Error editing adjustment:", error);
    }
  };

  // Show Delete Modal
  const showDeleteModal = (adjustment) => {
    setSelectedAdjustment(adjustment);
    document.getElementById("deleteDialog").showModal();
  };

  // Handle Delete Submit
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const adjustmentData = {};
    data.forEach((value, key) => adjustmentData[key] = value);
    try {
      const response = await fetch("/api/adjustments/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adjustmentData),
      });
      if (response.ok) {
        alert("Adjustment deleted successfully!");
        fetchAdjustments();
      } else {
        console.error("Error deleting adjustment:", response);
      }
    } catch (error) {
      console.error("Error deleting adjustment:", error);
    } finally {
      document.getElementById("deleteDialog").close();
    }
  };



  return (
    <>
      <link rel="stylesheet" href="styles/adjustments.css"></link>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="itemCode">Item Code</option>
          <option value="warehouse">Warehouse</option>
          <option value="date">Given Date</option>
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
            filteredData.map((record) => (
              <tr key={record.time_log}>
                <td>{record.time_log_php}</td>
                <td>{record.warehouse_name}</td>
                <td>{record.item_code}</td>
                <td>{record.qty_adjusted}</td>
                <td>
                  <button onClick={() => showEditModal(record)}>Edit</button> 
                  <button onClick={() => showDeleteModal(record)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      


      { /* Edit Adjustments Modal */}
      <dialog id="editDialog" className="dialog">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("editDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Edit Adjustment</h3>
          <form onSubmit={handleEditSubmit}>
            <label htmlFor="time_log">Time Log:</label>
            <input type="text" name="time_log" value={selectedAdjustment?.time_log_php} readOnly />

            <label htmlFor="new_quantity">New Quantity:</label>
            <input type="number" name="new_qty" onChange={handleInputChange} defaultValue={selectedAdjustment?.quantity} />

            <button type="submit">Edit</button>
          </form>
        </div>
      </dialog>



      
      { /* Delete Adjustments Modal */ }
      <dialog id="deleteDialog" className="dialog delete">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("deleteDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Delete Adjustment</h3>
          <form onSubmit={handleDeleteSubmit}>
            <input type="hidden" name="time_log" value={selectedAdjustment?.adjustment_id} />
            <button type="submit" style={{ background: "red" }}>Yes</button>
          </form>
          <button onClick={() => document.getElementById("deleteDialog").close()}>Close</button>
        </div>
      </dialog>




    </>
  );
}
