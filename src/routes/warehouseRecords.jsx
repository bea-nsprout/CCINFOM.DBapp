import React, { useEffect, useState } from "react";

export default function WarehouseRecords() {

  const [searchQuery, setSearchQuery] = useState("");
  const [dataWarehouse, setWarehouses] = useState(null); // For warehouses
  const [deleteIdSelection, setdeleteIdSelection] = useState(null);

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
    fetchWarehouses();
  },)



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

  function confirmEdit() {
    closeEditModal();
  }

  function showDeleteModal(id) {
    document.getElementById("deleteModal").style.display = "flex";
    setdeleteIdSelection(id);
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
  }


  // item
  function showNewWarehouse() {
    document.getElementById('new-warehouse-modal').style.display = 'flex';
  }

  function closeNewWarehouse() {
    document.getElementById('new-warehouse-modal').style.display = 'none';
  }

  /*
  HANDLERS
  */

  async function handleEditSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    let sql = `http://localhost:3000/api/warehouses/modify/`

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
        fetchWarehouses();
      }
    } catch (error) {
      console.log(error);
    }

  }


  async function confirmDelete() {

    const sqlQuery = "http://localhost:3000/api/warehouses/delete/";
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
        fetchWarehouses();
        alert(json.message)
      }
      else alert(json.error)


    } catch (error) {
      console.log(error);
    }

    closeDeleteModal();
  }


  async function handleNewWarehouseRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    const sqlQuery = "http://localhost:3000/api/warehouses/new"

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
      })
      const json = await response.json();

      if (json.success) {
        fetchWarehouses();
        alert(json.message)
      }
      else alert(json.error)

    } catch (error) {
      console.log(error);
    }
  }

  // Filter data based on the search query
  const filteredData = dataWarehouse?.filter((warehouse) =>
    warehouse.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <link rel="stylesheet" href="styles/warehouseRecords.css"></link>

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

      <table className="warehouse-table">
        <thead>
          <tr>
            <th>Warehouse Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData == null ? "LOADING" :
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.warehouse_name}</td>
                  <td>{item.location}</td>
                  <td>
                    <button className="edit" onClick={() => showEditModal(item)}>
                      Edit
                    </button>
                    <span className="vertical-line">|</span>
                    <button className="delete" onClick={() => showDeleteModal(item.warehouse_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>

        {/* Edit Item Modal */}
        <div id="editModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h3>Edit Warehouse</h3>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="warehouse_id">Warehouse ID</label>
              <input type="text" name="warehouse_id" readOnly />

              <label htmlFor="warehouse_name">Warehouse Name:</label>
              <input type="text" name="warehouse_name" required />

              <label htmlFor="location">Location:</label>
              <input type="text" name="location" required />

              <button type="submit" onClick={confirmEdit}>Edit</button>
            </form>
          </div>
        </div>

      </table>

      <button id="new-warehouse-btn" onClick={showNewWarehouse}>New Warehouse</button>

      {/* Edit Item Modal */}
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeEditModal}>
            &times;
          </span>
          <h3>Edit Personnel</h3>
          <form onSubmit={handleEditSubmit}>
            <input type="hidden" name="personnel_id" />

            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name" required />

            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name" required />

            <label htmlFor="position">Position:</label>
            <input type="text" name="position" required />

            <button type="submit" onClick={confirmEdit}>Edit</button>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      < div id="deleteModal" className="modal" >
        <div className="modal-content">
          <span className="close" onClick={closeDeleteModal}>
            &times;
          </span>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={confirmDelete} id="confirmDelete">Yes</button>
          <button onClick={closeDeleteModal}>No</button>
        </div>
      </div >

      <div id="new-warehouse-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewWarehouse}>&times;</span>
          <h3>Create New Warehouse</h3>
          <form onSubmit={handleNewWarehouseRequest}>
            <label htmlFor="name">Warehouse Name:</label>
            <input type="text" name="name" required />

            <label htmlFor="location">Location:</label>
            <input type="text" name="location" required />

            <button type="submit">Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
