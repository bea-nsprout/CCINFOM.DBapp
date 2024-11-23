import React, {useEffect, useState } from "react";

export default function Records() {
  // const [data, setData] = useState(null);
  


  const [dataItem, setItems] = useState(null); // For items
  const [dataWarehouse, setWarehouses] = useState(null); // For warehouses
  const [dataTrucks, setTrucks] = useState(null); // For trucks
  const [dataPersonnel, setPersonnel] = useState(null); // For personnel


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

  // useEffect(() => {

  //   Promise.all([

  //   ])
  //   fetch("api/items/view/all")
  //       .then(response => response.json())
  //       .then(d => setData(d));
  //   }, [])



  // useEffect(() => {
  //   fetch("api/warehouses/view")
  //     .then(response => response.json())
  //     .then(d => setData(d));
  //   }, [])

  useEffect(() => {
    Promise.all([
      fetch("api/items/view/all").then((response) => response.json()),
      fetch("api/warehouses/view").then((response) => response.json()),
      fetch("api/trucks/view").then((response) => response.json()),
      fetch("api/personnel/view").then((response) => response.json()),
    ])
      .then(([itemsData, warehousesData, trucksData, personnelData]) => {
        setItems(itemsData);
        setWarehouses(warehousesData);
        setTrucks(trucksData);
        setPersonnel(personnelData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  



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
          {masterlistTab === "items" && ( <>

          {/* Search Section */}
          <section className="hero inventory-hero">
            <div className="hero-content">
              <div className="search-container">
                <select className="search-dropdown">
                  <option value="item_code">Item Code</option>
                  <option value="item_name">Item Description</option>
                </select>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-bar"
                />
                <button className="search-button">Search</button>
              </div>
            </div>
          </section>

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

              {
              dataItem == null ? "LOADING" :
                  dataItem.map((item, index) => (
                      <tr key={index}>
                          <td>{item.item_code}</td>
                          <td>{item.item_desc}</td>
                          <td>{item.unit}</td>
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
                  ))}
              </tbody>

                   {/* Edit Item Modal */}
              <div id="editModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeEditModal}>
                    &times;
                  </span>
                  <h3>Edit Item</h3>
                  <form>
                    <label for="item-code">Item Code:</label>
                    <input type="text" id="item-code" required />

                    <label for="item-name">Item Description:</label>
                    <input type="text" id="item-name" required />

                    <label for="quantity">Unit:</label>
                    <input type="text" id="quantity" required />

                    <button type="submit" onClick={confirmEdit}>Edit</button>
                  </form>
                </div>
              </div>

              <button id="new-item-btn" onClick={showNewItem}>New Item</button>
            </table>

            </>

            
          )}



          {/* Warehouses Tab */}
          {masterlistTab === "warehouses" && ( <>

            {/* Search Section */}
            <section className="hero inventory-hero">
            <div className="hero-content">
            <div className="search-container">
            <select className="search-dropdown">
              <option value="item_code">Warehouse</option>
              <option value="item_name">Location</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
            />
            <button className="search-button">Search</button>
            </div>
            </div>
            </section>

            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Warehouse ID</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                dataWarehouse == null ? "LOADING" :
                    dataWarehouse.map((item, index) => (
                        <tr key={index}>
                            <td>{item.warehouse_name}</td>
                            <td>{item.location}</td>
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
                    ))}
              </tbody>

              {/* Edit Item Modal */}
              <div id="editModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeEditModal}>
                    &times;
                  </span>
                  <h3>Edit Warehouse</h3>
                  <form>
                    <label for="warehouse_id">Warehouse ID:</label>
                    <input type="text" id="warehouse_id" required />

                    <label for="location">Location:</label>
                    <input type="text" id="location" required />

                    <button type="submit" onClick={confirmEdit}>Edit</button>
                  </form>
                </div>
              </div>

              <button id="new-warehouse-btn" onClick={showNewWarehouse}>New Warehouse</button>
            </table>

            </>
          )}



          {/* Trucks Tab */}
          {masterlistTab === "trucks" && ( <>

            {/* Search Section */}
            <section className="hero inventory-hero">
            <div className="hero-content">
            <div className="search-container">
            <select className="search-dropdown">
              <option value="item_code">Truck</option>
              <option value="item_name">Warehouse</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
            />
            <button className="search-button">Search</button>
            </div>
            </div>
            </section>


            <table className="masterlist-table">
              <thead>
                <tr>
                  <th>Truck ID</th>
                  <th>Warehouse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                dataTrucks == null ? "LOADING" :
                    dataTrucks.map((item, index) => (
                        <tr key={index}>
                            <td>{item.truck_id}</td>
                            <td>{item.warehouse_name}</td>
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
                    ))}
              </tbody>

              {/* Edit Item Modal */}
              <div id="editModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeEditModal}>
                    &times;
                  </span>
                  <h3>Edit Truck</h3>
                  <form>
                    <label for="truck_id">Truck ID:</label>
                    <input type="text" id="truck_id" required />

                    <label for="location">Location:</label>
                    <input type="text" id="location" required />

                    <button type="submit" onClick={confirmEdit}>Edit</button>
                  </form>
                </div>
              </div>

              <button id="new-truck-btn" onClick={showNewTrucks}>New Truck</button>
            </table>

            </>
          )}

          {/* Personnel Tab */}
          {masterlistTab === "personnel" && (
            <table className="masterlist-table">
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
                dataPersonnel == null ? "LOADING" :
                    dataPersonnel.map((item, index) => (
                        <tr key={index}>
                            <td>{item.truck_id}</td>
                            <td>{item.warehouse_name}</td>
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
                    ))}
              </tbody>

              {/* Edit Item Modal */}
              <div id="editModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeEditModal}>
                    &times;
                  </span>
                  <h3>Edit Personnel</h3>
                  <form>
                    <label for="first_name_id">First Name:</label>
                    <input type="text" id="first_name_id" required />

                    <label for="last_name_id">Last Name:</label>
                    <input type="text" id="last_name_id" required />

                    <label for="position">Position:</label>
                    <input type="text" id="Position" required />

                    <button type="submit" onClick={confirmEdit}>Edit</button>
                  </form>
                </div>
              </div>

              <button id="new-personnel-btn" onClick={showNewPersonnel}>New Personnel</button>
            </table>
          )}
        </div>
      </section>

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
