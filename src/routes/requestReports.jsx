import React, { useState } from "react";

export default function RequestReports() {
  const [requestData, setRequestData] = useState(null);
  const [daysQuery, setDaysQuery] = useState(0);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("ndays", daysQuery);
    console.log(queryParams.toString());
    const response = await fetch(`/api/reports/requests-report?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      setRequestData(data);
    } else {
      alert("something went wrong.");
    }
  }

  return (<>

    <link rel="stylesheet" href="styles/requestReports.css"></link>
    <div className="warehouse-requests-report-container">
      <h1>Warehouse Requests Report</h1>
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
        requestData == null ? <></> :
          <table className="warehouse-requests-table">
            <thead>
              <tr>
                <th>Warehouse Name</th>
                <th>Location</th>
                <th>Requests Received</th>
                <th>Requests Sent</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((warehouse, index) => (
                <tr key={index}>
                  <td>{warehouse.warehouse_name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.reqs_received}</td>
                  <td>{warehouse.reqs_sent}</td>
                </tr>
              ))}
            </tbody>
          </table>
      }

    </div>

  </>
  );
}
