import React, { useEffect, useState } from "react";

export default function TruckRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataTrucks, setTrucks] = useState(null); // For trucks
  const [dataWarehouse, setWarehouses] = useState([]); // For warehouses
  const [deleteIdSelection, setDeleteIdSelection] = useState(null);

  const fetchTrucks = async () => {
    try {
      const response = await fetch("/api/trucks/view");
      const data = await response.json();
      setTrucks(data);

    } catch (error) {
      console.error("Error fetching trucks: ", error);
    }
  }

  const fetchWarehouses = async () => {
    try {
      const response = await fetch("/api/warehouses/view");
      const data = await response.json();

      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    fetchTrucks();
    fetchWarehouses();
  }, []);

  function showEditModal(item) {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "flex";

    const fields = editModal.querySelector("form").querySelectorAll("input, select");
    for (let i = 0; i < fields.length; i++) {
      fields[i].value = item[fields[i].name] || "";
    }
  }

  function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
  }

  function showDeleteModal(id) {
    document.getElementById("deleteModal").style.display = "flex";
    setDeleteIdSelection(id);
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
  }


  // item
  function showNewTrucks() {
    document.getElementById('new-trucks-modal').style.display = 'flex';
  }

  /*
  HANDLERS
  */

  async function handleEditSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    let sql = `http://localhost:3000/api/trucks/modify/`


    try {
      const response = await fetch(sql, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
      })
      console.log(response);
      if (response.ok) {
        alert("successfully edited item!");
        fetchTrucks();
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeEditModal();
    }

  }


  async function confirmDelete() {

    const sqlQuery = "http://localhost:3000/api/trucks/delete/";
    const body = { id: deleteIdSelection }

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const json = await response.json();

      if (json.success) {
        fetchTrucks();
        alert(json.message)
      }
      else alert(json.error)


    } catch (error) {
      console.log(error);
    }

    closeDeleteModal();
  }


  async function handleNewTruckRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    const sqlQuery = "http://localhost:3000/api/trucks/new"

    console.log("HI BRO", object);

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
      })
      const json = await response.json();

      if (json.success) {
        fetchTrucks();
        alert(json.message)
      }
      else alert(json.error)

    } catch (error) {
      console.log(error);
    }
  }

  // Filter data based on the search query
  const filteredData = dataTrucks?.filter((item) =>
    item.truck_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <link rel="stylesheet" href="styles/truckRecords.css"></link>

      <section className="hero inventory-hero">
        <div className="hero-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <table className="truck-table">
        <thead>
          <tr>
            <th>Truck ID</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataTrucks === null ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.truck_id}</td>
                <td>{item.warehouse_name}</td>
                <td>
                  <button className="edit" onClick={() => showEditModal(item)}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={() => showDeleteModal(item.truck_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button id="new-truck-btn" onClick={showNewTrucks}>New Truck</button>

      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeEditModal}>
            &times;
          </span>
          <h3>Edit Truck</h3>
          <form onSubmit={handleEditSubmit}>
            <label htmlFor="truck_id">Truck ID:</label>
            <input type="text" name="truck_id" readOnly />

            <label htmlFor="warehouse_id">Warehouse:</label>
            <select id="warehouse_id" name="warehouse_id" required>
              {dataWarehouse.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name + " - " + warehouse.location}
                </option>
              ))}
            </select>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      <div id="deleteModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeDeleteModal}>
            &times;
          </span>
          <p>Are you sure you want to delete this truck?</p>
          <button id="confirmDelete" onClick={confirmDelete}>
            Yes
          </button>
          <button onClick={closeDeleteModal}>No</button>
        </div>
      </div>

      {/* New Truck Modal */}
      <div id="new-trucks-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById("new-trucks-modal").style.display = "none"}>
            &times;
          </span>
          <h3>Create New Truck</h3>
          <form onSubmit={handleNewTruckRequest}>
            <label htmlFor="truck_id">Truck ID:</label>
            <input type="text" name="truck_id" required />

            <label htmlFor="warehouse_id">Warehouse:</label>
            <select id="warehouse_id" name="warehouse_id" required>
              {dataWarehouse.map((warehouse) => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name + " - " + warehouse.location}
                </option>
              ))}
            </select>

            <button type="submit">Add Truck</button>
          </form>
        </div>
      </div>
    </>
  );
}
