import React, { useState } from "react";

export default function transferReports() {
  const [transferData, setTransferData] = useState(null);
  const [daysQuery, setDaysQuery] = useState(0);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("ndays", daysQuery);
    console.log(queryParams.toString());
    const response = await fetch(`api/reports/transfers-report?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      setTransferData(data);
    } else {
      alert("something went wrong.");
    }
  }

  return (<>

    <link rel="stylesheet" href="styles/transferReports.css"></link>

    <div className="warehouse-transfers-report-container">
      <h1>Warehouse Transfers Report</h1>
      <div className="search-container">

        <input
          type="number"
          placeholder="Number of Days..."
          className="search-bar"
          onChange={(e) => setDaysQuery(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      {
        transferData == null ? <></> :
          <table className="warehouse-transfers-table">
            <thead>
              <tr>
                <th>Warehouse Name</th>
                <th>Location</th>
                <th>Transfers Out</th>
                <th>Transfers In</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((warehouse, index) => (
                <tr key={index}>
                  <td>{warehouse.warehouse_name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.transfers_out}</td>
                  <td>{warehouse.transfers_in}</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </div>

  </>
  );
}
