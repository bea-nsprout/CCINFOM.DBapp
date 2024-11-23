import React, { useState } from "react";

export default function Records() {
  const [masterlistTab, setMasterlistTab] = useState("items");

  const handleTabChange = (tab) => {
    setMasterlistTab(tab);
  };

  function showEditModal() {
    document.getElementById("editModal").style.display = "flex";
  }

  function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
  }

  function confirmEdit() {
    alert("Item edited successfully!");
    closeEditModal();
  }

  function showDeleteModal() {
    document.getElementById("deleteModal").style.display = "flex";
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
  }

  function confirmDelete() {
    alert("Item deleted successfully!");
    closeDeleteModal();
  }



  // item
  function showNewItem() {
    document.getElementById('new-item-modal').style.display = 'flex';
  }

  function closeNewItem() {
    document.getElementById('new-item-modal').style.display = 'none';
  }

  // warehouse
  function showNewWarehouse() {
    document.getElementById('new-warehouse-modal').style.display = 'flex';
  }

  function closeNewWarehouse() {
    document.getElementById('new-warehouse-modal').style.display = 'none';
  }

  // trucks
  function showNewTrucks() {
    document.getElementById('new-trucks-modal').style.display = 'flex';
  }

  function closeNewTrucks() {
    document.getElementById('new-trucks-modal').style.display = 'none';
  }

  // personnel
  function showNewPersonnel() {
    document.getElementById('new-personnel-modal').style.display = 'flex';
  }

  function closeNewPersonnel() {
    document.getElementById('new-personnel-modal').style.display = 'none';
  }






  function confirmNewRequest() {
    alert("Request Submitted");
    closeNewRequest();
  }

  return (
    <>
      <link rel="stylesheet" href="styles/requests.css"></link>

      {/* Masterlist Section */}
      <section className="masterlist-section">
        <div className="masterlist-tabs">
          <button
            className={masterlistTab === "items" ? "active" : ""}
            onClick={() => handleTabChange("items")}
          >
            Items
          </button>
          <button
            className={masterlistTab === "warehouses" ? "active" : ""}
            onClick={() => handleTabChange("warehouses")}
          >
            Warehouses
          </button>
          <button
            className={masterlistTab === "trucks" ? "active" : ""}
            onClick={() => handleTabChange("trucks")}
          >
            Trucks
          </button>
          <button
            className={masterlistTab === "personnel" ? "active" : ""}
            onClick={() => handleTabChange("personnel")}
          >
            Personnel
          </button>
        </div>

        <div className="masterlist-content">
          {/* Items Tab */}
          {masterlistTab === "items" && (
            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Description</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Item A</td>
                  <td>100</td>
                  <td>pcs</td>
                  <td>
                    <button className="edit" onClick={showEditModal}>
                      Edit
                    </button>
                    <span className="vertical-line">|</span>
                    <button className="delete" onClick={showDeleteModal}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Item B</td>
                  <td>200</td>
                  <td>kgs</td>
                  <td>
                    <button className="edit" onClick={showEditModal}>
                      Edit
                    </button>
                    <span className="vertical-line">|</span>
                    <button className="delete" onClick={showDeleteModal}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>

              <button id="new-item-btn" onClick={showNewItem}>New Item</button>
            </table>
          )}



          {/* Warehouses Tab */}
          {masterlistTab === "warehouses" && (
            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Warehouse ID</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>W001</td>
                  <td>Manila</td>
                  <td>5000 pcs</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
                <tr>
                  <td>W002</td>
                  <td>Cebu</td>
                  <td>3000 pcs</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
              </tbody>

              <button id="new-warehouse-btn" onClick={showNewWarehouse}>New Warehouse</button>
            </table>
          )}



          {/* Trucks Tab */}
          {masterlistTab === "trucks" && (
            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Truck ID</th>
                  <th>Model</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>T001</td>
                  <td>Ford F-150</td>
                  <td>2000 kgs</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
                <tr>
                  <td>T002</td>
                  <td>Isuzu NPR</td>
                  <td>3000 kgs</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
              </tbody>

              <button id="new-truck-btn" onClick={showNewTrucks}>New Truck</button>
            </table>
          )}

          {/* Personnel Tab */}
          {masterlistTab === "personnel" && (
            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Personnel ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P001</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>+639123456789</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
                <tr>
                  <td>P002</td>
                  <td>Jane Smith</td>
                  <td>Driver</td>
                  <td>+639987654321</td>
                  <button className="edit" onClick={showEditModal}>
                    Edit
                  </button>
                  <span className="vertical-line">|</span>
                  <button className="delete" onClick={showDeleteModal}>
                    Delete
                  </button>
                </tr>
              </tbody>

              <button id="new-personnel-btn" onClick={showNewPersonnel}>New Personnel</button>
            </table>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeEditModal}>
            &times;
          </span>
          <p>Are you sure you want to edit this item?</p>
          <button onClick={confirmEdit}>Yes</button>
          <button onClick={closeEditModal}>No</button>
        </div>
      </div>

      {/* Delete Modal */}
      <div id="deleteModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeDeleteModal}>
            &times;
          </span>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={closeDeleteModal}>No</button>
        </div>
      </div>



      <div id="new-item-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewItem}>&times;</span>
          <h3>Create New Item</h3>
          <form>
            <label for="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label for="item-name">Item Name:</label>
            <input type="text" id="item-name" required />

            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" required />

            <label for="unit">Unit:</label>
            <input type="text" id="unit" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-warehouse-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewWarehouse}>&times;</span>
          <h3>Create New Warehouse</h3>
          <form>
            <label for="warehouse-id">Warehouse ID:</label>
            <input type="text" id="warehouse-id" required />

            <label for="location">Location:</label>
            <input type="text" id="location" required />

            <label for="capacity">Capacity:</label>
            <input type="number" id="capacity" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-trucks-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewTrucks}>&times;</span>
          <h3>Create New Trucks</h3>
          <form>
            <label for="truck-id">Truck ID:</label>
            <input type="text" id="truck-id" required />

            <label for="model">Model:</label>
            <input type="text" id="model" required />

            <label for="capacity">Capacity:</label>
            <input type="number" id="capacity" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-personnel-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewPersonnel}>&times;</span>
          <h3>Create New Personnel</h3>
          <form>
            <label for="personnel-id">Personnel ID:</label>
            <input type="text" id="personnel-id" required />

            <label for="name">Name:</label>
            <input type="text" id="name" required />

            <label for="role">Role:</label>
            <input type="text" id="role" required />

            <label for="contact">Contact:</label>
            <input type="text" id="contact" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
