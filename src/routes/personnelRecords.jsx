import React, { useEffect, useState } from "react";

export default function PersonnelRecords() {

  const [searchQuery, setSearchQuery] = useState("");
  const [dataPersonnel, setPersonnel] = useState([]); // For personnel
  const [deleteIdSelection, setdeleteIdSelection] = useState(null);


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

  useEffect(() => {
    fetchPersonnel();
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
    setdeleteIdSelection(id);
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
  }


  // item
  function showNewPersonnel() {
    document.getElementById('new-personnel-modal').style.display = 'flex';
  }

  function closeNewPersonnel() {
    document.getElementById('new-personnel-modal').style.display = 'none';
  }

  /*
  HANDLERS
  */

  async function handleEditSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    let sql = `http://localhost:3000/api/personnel/modify/`

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
        fetchPersonnel();
      }
    } catch (error) {
      console.log(error);
    }

    closeEditModal();

  }


  async function confirmDelete() {

    const sqlQuery = "http://localhost:3000/api/personnel/delete/";
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
        fetchPersonnel();
        alert(json.message)
      }
      else alert(json.error)


    } catch (error) {
      console.log(error);
    }

    closeDeleteModal();
  }


  async function handleNewPersonnelRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    const sqlQuery = "http://localhost:3000/api/personnel/new"

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
      })
      const json = await response.json();

      if (json.success) {
        fetchPersonnel();
        alert(json.message)
      }
      else alert(json.error)

    } catch (error) {
      console.log(error);
    }

    closeNewPersonnel();
  }

  // Filter data based on the search query
  const filteredData = dataPersonnel?.filter((item) =>
    item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <link rel="stylesheet" href="styles/personnelRecords.css"></link>

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

      <table className="personnel-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData == null ? "LOADING" :
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.position}</td>
                  <td>
                    <button className="edit" onClick={() => showEditModal(item)}>
                      Edit
                    </button>
                    <span className="vertical-line">|</span>
                    <button className="delete" onClick={() => showDeleteModal(item.personnel_id)}>
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
            <h3>Edit Personnel</h3>
            <form onSubmit={handleEditSubmit}>
              <input type="hidden" name="personnel_id" />

              <label htmlFor="first_name">First Name:</label>
              <input type="text" name="first_name" required />

              <label htmlFor="last_name">Last Name:</label>
              <input type="text" name="last_name" required />

              <label htmlFor="position">Position:</label>
              <input type="text" name="position" required />

              <button type="submit">Edit</button>
            </form>
          </div>
        </div>

      </table>

      <button id="new-personnel-btn" onClick={showNewPersonnel}>New Personnel</button>

      {/* Delete Modal */}
      <div id="deleteModal" className="modal" >
        <div className="modal-content">
          <span className="close" onClick={closeDeleteModal}>
            &times;
          </span>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={confirmDelete} id="confirmDelete">Yes</button>
          <button onClick={closeDeleteModal}>No</button>
        </div>
      </div >

      <div id="new-personnel-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewPersonnel}>&times;</span>
          <h3>Create New Personnel</h3>
          <form onSubmit={handleNewPersonnelRequest}>

            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name" required />

            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name" required />

            <label htmlFor="position">Position:</label>
            <input type="text" name="position" required />

            <button type="submit">Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
