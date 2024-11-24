import React, { useEffect, useState } from "react";

export default function ItemRecords() {

  const [searchQuery, setSearchQuery] = useState("");
  const [dataItem, setItems] = useState(null); // For items
  const [deleteIdSelection, setdeleteIdSelection] = useState(null);


  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items/view/all");
      const data = await response.json();
      setItems(data);

    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }

  useEffect(() => {
    fetchItems();
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
  function showNewItem() {
    document.getElementById('new-item-modal').style.display = 'flex';
  }

  function closeNewItem() {
    document.getElementById('new-item-modal').style.display = 'none';
  }

  /*
  HANDLERS
  */

  async function handleEditSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    let sql = `http://localhost:3000/api/items/modify/`

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
        fetchItems();
      }
    } catch (error) {
      console.log(error);
    }

  }


  async function confirmDelete() {

    const sqlQuery = "http://localhost:3000/api/items/delete/";
    const body = { item_code: deleteIdSelection }

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const json = await response.json();

      if (json.success) {
        fetchItems();
        alert(json.message)
      }
      else alert(json.error)


    } catch (error) {
      console.log(error);
    }

    closeDeleteModal();
  }


  async function handleNewItemRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    const sqlQuery = "http://localhost:3000/api/items/new"

    try {
      const response = await fetch(sqlQuery, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
      })
      const json = await response.json();

      if (json.success) {
        fetchItems();
        alert(json.message)
      }
      else alert(json.error)

    } catch (error) {
      console.log(error);
    }
  }

  // Filter data based on the search query
  const filteredData = dataItem?.filter((item) =>
    item.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.item_desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <link rel="stylesheet" href="styles/itemRecords.css"></link>

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

      <table className="item-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            filteredData == null ? "LOADING" :
              filteredData.map((item, index) => (
                <tr key={index} id={`row${index}`}>
                  <td>{item.item_code}</td>
                  <td>{item.item_desc}</td>
                  <td>{item.unit}</td>
                  <td>
                    <button className="edit" onClick={() => showEditModal(item)}>
                      Edit
                    </button>
                    <span className="vertical-line">|</span>
                    <button className="delete" onClick={() => showDeleteModal(item.item_code)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>

        <div id="editModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h3>Edit Item</h3>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="item_code">Item Code:</label>
              <input type="text" name="item_code" readOnly />

              <label htmlFor="item_desc">Item Description:</label>
              <input type="text" name="item_desc" required />

              <label htmlFor="unit">Unit:</label>
              <input type="text" name="unit" required />

              <input type="hidden" name="index" />

              <button type="submit" onClick={closeEditModal}>Edit</button>
            </form>
          </div>
        </div>


      </table>

      <button id="new-item-btn" onClick={showNewItem}>New Item</button>

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

      <div id="new-item-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewItem}>&times;</span>
          <h3>Create New Item</h3>
          <form onSubmit={handleNewItemRequest}>
            <label htmlFor="item_code">Item Code:</label>
            <input type="text" name="item_code" required />

            <label htmlFor="item_desc">Item Description:</label>
            <input type="text" name="item_desc" required />

            <label htmlFor="unit">Unit:</label>
            <input type="text" name="unit" required />

            <button type="submit">Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
