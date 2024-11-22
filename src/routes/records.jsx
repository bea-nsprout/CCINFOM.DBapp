import { useState } from "react";

export default function Requests() {
  const [masterlistTab, setMasterlistTab] = useState("items");

  const handleTabChange = (tab) => {
    setMasterlistTab(tab);
  };

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
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Item A</td>
                  <td>100</td>
                  <td>pcs</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Item B</td>
                  <td>200</td>
                  <td>kgs</td>
                </tr>
              </tbody>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>W001</td>
                  <td>Manila</td>
                  <td>5000 pcs</td>
                </tr>
                <tr>
                  <td>W002</td>
                  <td>Cebu</td>
                  <td>3000 pcs</td>
                </tr>
              </tbody>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>T001</td>
                  <td>Ford F-150</td>
                  <td>2000 kgs</td>
                </tr>
                <tr>
                  <td>T002</td>
                  <td>Isuzu NPR</td>
                  <td>3000 kgs</td>
                </tr>
              </tbody>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P001</td>
                  <td>John Doe</td>
                  <td>Manager</td>
                  <td>+639123456789</td>
                </tr>
                <tr>
                  <td>P002</td>
                  <td>Jane Smith</td>
                  <td>Driver</td>
                  <td>+639987654321</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
