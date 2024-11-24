import React, { useState, useEffect } from 'react';

export default function Production() {
  const [productions, setProductions] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [searchType, setSearchType] = useState('itemCode');
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedProduction, setSelectedProduction] = useState(null); // Selected production for editing or deleting

  useEffect(() => {
    fetchProductions();
    fetchWarehouses();
    fetchItems();
  }, []);

  const fetchProductions = async () => {
    try {
      const response = await fetch('/api/productions/view');
      const data = await response.json();
      setProductions(data);
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await fetch('/api/warehouses/view');
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items/view/all");
      const data = await response.json();
      setItems(data);

    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }

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
      const response = await fetch(`/api/productions/view?${queryParams.toString()}`);
      const data = await response.json();
      setProductions(data);
    } catch (error) {
      console.error('Error fetching filtered productions:', error);
    }
  };

  const filteredData = productions.filter((record) => {
    if (searchType === 'itemCode') {
      return record.item_code.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'warehouse') {
      return record.warehouse_name.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (searchType === 'date') {
      const recordDate = new Date(record.date_produced);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Make end date inclusive
      return recordDate >= start && recordDate < end;
    }
    return true;
  });

  // Show Edit Modal
  const showEditModal = (production) => {
    setSelectedProduction(production);
    document.getElementById("editDialog").showModal();
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProduction((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Submit
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const productionData = {};
    data.forEach((value, key) => productionData[key] = value);
    try {
      const response = await fetch("/api/productions/modify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productionData),
      });
      if (response.ok) {
        alert("Production edited successfully!");
        document.getElementById("editDialog").close();
        fetchProductions();
      } else {
        console.error("Error editing production:", response);
      }
    } catch (error) {
      console.error("Error editing production:", error);
    }
  };

  // Show Delete Modal
  const showDeleteModal = (production) => {
    setSelectedProduction(production);
    document.getElementById("deleteDialog").showModal();
  };

  // Handle Delete Submit
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const productionData = {};
    data.forEach((value, key) => productionData[key] = value);
    try {
      const response = await fetch("/api/productions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productionData),
      });
      if (response.ok) {
        alert("Production deleted successfully!");
        fetchProductions();
      } else {
        console.error("Error deleting production:", response);
      }
    } catch (error) {
      console.error("Error deleting production:", error);
    } finally {
      document.getElementById("deleteDialog").close();
    }
  };

  const createProductionRecord = async (e) => {
    e.preventDefault();
    const itemCode = document.getElementById('item-code').value;
    const quantityProduced = document.getElementById('quantity-produced').value;
    const productionDate = document.getElementById('production-date').value;
    const warehouseLocation = document.getElementById('warehouse-location').value;

    try {
      await fetch('/api/productions/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_code: itemCode,
          qty_produced: quantityProduced,
          date_produced: productionDate,
          warehouse_id: warehouseLocation,
        }),
      });
      alert("successfully added production.");
      fetchProductions();
      document.getElementById('new-production-modal').style.display = 'none';
    } catch (error) {
      console.error('Error creating production record:', error);
    }
  };


  return (
    <>
      <link rel="stylesheet" href="styles/production.css" />
      {/* Search and Filter Section */}
      <div className="search-filter">
        <select id="search-type" onChange={(e) => setSearchType(e.target.value)}>
          <option value="itemCode">Item Code</option>
          <option value="date">Date</option>
          <option value="warehouse">Warehouse</option>
        </select>
        {(searchType === 'itemCode' || searchType === 'warehouse') && (
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        )}
        {searchType === 'date' && (
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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="6">No production records found</td>
            </tr>
          ) : (
            filteredData.map((record) => (
              <tr key={record.production_id}>
                <td>{record.production_id}</td>
                <td>{record.item_code}</td>
                <td>{record.qty_produced}</td>
                <td>{record.date_produced}</td>
                <td>{record.warehouse_name}</td>
                <td>
                  <button onClick={() => showEditModal(record)}>Edit</button>
                  <button onClick={() => showDeleteModal(record)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Create New Production Record Modal */}
      <button
        id="new-production-btn"
        onClick={() => (document.getElementById('new-production-modal').style.display = 'flex')}
      >
        New Production Record
      </button>
      <div id="new-production-modal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => (document.getElementById('new-production-modal').style.display = 'none')}
          >
            &times;
          </span>
          <h3>Create New Production Record</h3>
          <form onSubmit={createProductionRecord}>
            <label htmlFor="item-code">Item Code:</label>
            <select id="item-code">
              {items.map((item) => (
                <option key={item.item_code} value={item.item_code}>
                  {item.item_code + " - " + item.item_desc}
                </option>
              ))}
            </select>
            <label htmlFor="quantity-produced">Quantity Produced:</label>
            <input type="number" id="quantity-produced" required />
            <label htmlFor="production-date">Production Date:</label>
            <input type="date" id="production-date" />
            <label htmlFor="warehouse-location">Warehouse:</label>
            <select id="warehouse-location">
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name + " - " + warehouse.location}
                </option>
              ))}
            </select>
            <button type="submit">Submit Production</button>
          </form>
        </div>
      </div>

      { /* Edit Production Modal */}
      <dialog id="editDialog" className="dialog">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("editDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Edit Production</h3>
          <form onSubmit={handleEditSubmit}>
            <label htmlFor="production_id">Production ID:</label>
            <input type="text" name="production_id" value={selectedProduction?.production_id} readOnly />

            <label htmlFor="new_qty_produced">New Quantity Produced:</label>
            <input type="number" name="new_qty" onChange={handleInputChange} defaultValue={selectedProduction?.qty_produced} />

            <button type="submit">Edit</button>
          </form>
        </div>
      </dialog>

      { /* Delete Production Modal */}
      <dialog id="deleteDialog" className="dialog delete">
        <div className="dialog-content">
          <button
            className="close"
            onClick={() => document.getElementById("deleteDialog").close()}
            aria-label="Close"
          >
            &times;
          </button>
          <h3>Delete Production</h3>
          <form onSubmit={handleDeleteSubmit}>
            <input type="hidden" name="production_id" value={selectedProduction?.production_id} />
            <button type="submit" style={{ background: "red" }}>Yes</button>
          </form>
          <button onClick={() => document.getElementById("deleteDialog").close()}>Close</button>
        </div>
      </dialog>

    </>
  );
}
