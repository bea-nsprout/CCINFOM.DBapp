import React, { useEffect, useState } from "react";

export default function Records() {


  const [dataItem, setItems] = useState(null); // For items
  const [dataWarehouse, setWarehouses] = useState(null); // For warehouses
  const [dataTrucks, setTrucks] = useState([]); // For trucks
  const [dataPersonnel, setPersonnel] = useState([]); // For personnel
  const [deleteIdSelection, setdeleteIdSelection] = useState(null);

  const [masterlistTab, setMasterlistTab] = useState("items");



  const handleTabChange = (tab) => {
    setMasterlistTab(tab);
  };



  function showEditModal(item) {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "flex";

    const fields = editModal.querySelector("form").querySelectorAll("input");
    for (let i = 0; i < fields.length; i++) {
      fields[i].value = item[fields[i].name] || "";
    }
  }

  function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
  }

  function confirmEdit() {
    alert("Item edited successfully!");
    closeEditModal();
  }

  function showDeleteModal(id) {
    document.getElementById("deleteModal").style.display = "flex";
    setdeleteIdSelection(id);
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
  }

  function confirmDelete() {
    console.log(deleteIdSelection);

    let sqlQuery = "";
    let body = {};

    switch (masterlistTab) {
      case "items":
        sqlQuery = "http://localhost:3000/api/items/delete/";
        body = { item_code: deleteIdSelection }
        break;
      case "warehouses":
        sqlQuery = "http://localhost:3000/api/warehouses/delete/";
        body = { id: deleteIdSelection }
        break;
      case "trucks":
        sqlQuery = "http://localhost:3000/api/trucks/delete/";
        body = { id: deleteIdSelection }
        break;
      case "personnel":
        sqlQuery = "http://localhost:3000/api/personnel/delete/";
        body = { id: deleteIdSelection }
        break;
    }


    fetch(sqlQuery, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(x => x.json()).then(
      x => {
        if (x.success) alert(x.message)
        else alert(x.error)
      }
    )

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

  /*
  HANDLERS
  */

  function handleEditSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    fetch("http://localhost:3000/api/items/modify/", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    }).then(x => x.json()).then(
      window.location.reload(true)
    );

  }

  function handleNewItemRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    console.log(object);

    fetch("http://localhost:3000/api/items/new", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    }).then(x => x.json()).then(
      (x) => {
        if (x.success) alert(x.message);
        else alert(x.error);

      }

    )
  }

  function handleNewWarehouseRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    console.log(object);

    fetch("http://localhost:3000/api/warehouses/new", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    }).then(x => x.json()).then(
      (x) => {
        if (x.success) alert(x.message);
        else alert(x.error);

      }

    )
  }

  function handleNewTruckRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    console.log(object);

    fetch("http://localhost:3000/api/trucks/new", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    }).then(x => x.json()).then(
      (x) => {
        if (x.success) alert(x.message);
        else alert(x.error);

      }

    )
  }

  function handleNewPersonnelRequest(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    console.log(object);

    fetch("http://localhost:3000/api/personnels/new", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    }).then(x => x.json()).then(
      (x) => {
        if (x.success) alert(x.message);
        else alert(x.error);

      }

    )
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
      fetch("/api/items/view/all").then((response) => response.json()),
      fetch("/api/warehouses/view").then((response) => response.json()),
      fetch("/api/trucks/view").then((response) => response.json()),
      fetch("/api/personnel/view").then((response) => response.json()),
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
          {masterlistTab === "items" && (<>

            {/* Search Section */}
            <section className="hero inventory-hero">
              <div className="hero-content">
                <div className="search-container">
                  <select className="search-dropdown">
                    <option value="item_code">Item Code</option>
                    <option value="item_desc">Item Description</option>
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

              {/* Edit Item Modal */}
              <div id="editModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeEditModal}>
                    &times;
                  </span>
                  <h3>Edit Item</h3>
                  <form onSubmit={handleEditSubmit}>
                    <label for="item_code">Item Code:</label>
                    <input type="text" name="item_code" readOnly />

                    <label for="item_desc">Item Description:</label>
                    <input type="text" name="item_desc" required />

                    <label for="unit">Unit:</label>
                    <input type="text" name="unit" required />

                    <input type="hidden" name="index" />

                    <button type="submit" onClick={confirmEdit}>Edit</button>
                  </form>
                </div>
              </div>

              <button id="new-item-btn" onClick={showNewItem}>New Item</button>
            </table>

          </>


          )
          }



          {/* Warehouses Tab */}
          {
            masterlistTab === "warehouses" && (<>

              {/* Search Section */}
              <section className="hero inventory-hero">
                <div className="hero-content">
                  <div className="search-container">
                    <select className="search-dropdown">
                      <option value="warehouse">Warehouse</option>
                      <option value="location">Location</option>
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
                      <label for="warehouse_id">Warehouse ID</label>
                      <input type="text" name="warehouse_id" readOnly />

                      <label for="warehouse_name">Warehouse Name:</label>
                      <input type="text" name="warehouse_name" required />

                      <label for="location">Location:</label>
                      <input type="text" name="location" required />

                      <button type="submit" onClick={confirmEdit}>Edit</button>
                    </form>
                  </div>
                </div>

                <button id="new-warehouse-btn" onClick={showNewWarehouse}>New Warehouse</button>
              </table>

            </>
            )
          }



          {/* Trucks Tab */}
          {
            masterlistTab === "trucks" && (<>

              {/* Search Section */}
              <section className="hero inventory-hero">
                <div className="hero-content">
                  <div className="search-container">
                    <select className="search-dropdown">
                      <option value="truck">Truck</option>
                      <option value="warehouse">Warehouse</option>
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
                            <button className="edit" onClick={() => showEditModal(item)}>
                              Edit
                            </button>
                            <span className="vertical-line">|</span>
                            <button className="delete" onClick={() => showDeleteModal(item.truck_id)}>
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
                      <input type="text" name="truck_id" readOnly />

                      <label htmlFor="warehouse">Warehouse</label>
                      <select id="warehouse">
                        {dataWarehouse.map((warehouse) => (
                          <option key={dataWarehouse.warehouse_id} value={dataWarehouse.warehouse_id}>
                            {warehouse.location}
                          </option>
                        ))}
                      </select>

                      <button type="submit" onClick={confirmEdit}>Edit</button>
                    </form>
                  </div>
                </div>

                <button id="new-truck-btn" onClick={showNewTrucks}>New Truck</button>
              </table>

            </>
            )
          }

          {/* Personnel Tab */}
          {
            masterlistTab === "personnel" && (<>

              {/* Search Section */}
              <section className="hero inventory-hero">
                <div className="hero-content">
                  <div className="search-container">
                    <select className="search-dropdown">
                      <option value="first_name">First Name</option>
                      <option value="last_name">Last Name</option>
                      <option value="position">Position</option>
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
                    <form>
                      <label for="first_name">First Name:</label>
                      <input type="text" name="first_name" required />

                      <label for="last_name">Last Name:</label>
                      <input type="text" name="last_name" required />

                      <label for="position">Position:</label>
                      <input type="text" name="position" required />

                      <button type="submit" onClick={confirmEdit}>Edit</button>
                    </form>
                  </div>
                </div>

                <button id="new-personnel-btn" onClick={showNewPersonnel}>New Personnel</button>
              </table>
            </>
            )
          }
        </div >
      </section >

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

      <div id="new-item-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewItem}>&times;</span>
          <h3>Create New Item</h3>
          <form onSubmit={handleNewItemRequest}>
            <label for="item_code">Item Code:</label>
            <input type="text" name="item_code" required />

            <label for="item_desc">Item Description:</label>
            <input type="text" name="item_desc" required />

            <label for="unit">Unit:</label>
            <input type="text" name="unit" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-warehouse-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewWarehouse}>&times;</span>
          <h3>Create New Warehouse</h3>
          <form onSubmit={handleNewWarehouseRequest}>
            <label for="name">Warehouse Name:</label>
            <input type="text" name="name" required />

            <label for="location">Location:</label>
            <input type="text" name="location" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-trucks-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewTrucks}>&times;</span>
          <h3>Create New Trucks</h3>
          <form onSubmit={handleNewTruckRequest}>
            <label for="truckid">Truck ID:</label>
            <input type="text" name="truckid" required />

            <label for="warehouseid">Truck ID:</label>
            <input type="text" name="warehouseid" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>

      <div id="new-personnel-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeNewPersonnel}>&times;</span>
          <h3>Create New Personnel</h3>
          <form onSubmit={handleNewPersonnelRequest}>
            <label for="firstname">First Name:</label>
            <input type="text" name="firstname" required />

            <label for="lastname">Last Name:</label>
            <input type="text" name="lastname" required />

            <label for="position">Position:</label>
            <input type="text" name="position" required />

            <button type="submit" onClick={confirmNewRequest}>Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
