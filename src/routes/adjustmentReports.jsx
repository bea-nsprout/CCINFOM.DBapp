import React, { useState } from "react";

export default function AdjustmentsReports() {
  const [adjustmentData, setAdjustmentData] = useState([]);
  const [daysQuery, setDaysQuery] = useState(0);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("ndays", daysQuery);
    console.log(queryParams.toString());
    const response = await fetch(`/api/reports/adjustments-report?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      setAdjustmentData(data);
    } else {
      alert("something went wrong.");
    }
  }


  return (<>

    <link rel="stylesheet" href="styles/adjustmentReports.css"></link>
    <div className="warehouse-adjustments-report-container">
      <h1>Warehouse Adjustments Report</h1>
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
        adjustmentData == null ? <></> :
          <table className="warehouse-adjustments-table">
            <thead>
              <tr>
                <th>Warehouse Name</th>
                <th>Location</th>
                <th>Times Adjusted</th>
                <th>Total Adjusted</th>
              </tr>
            </thead>
            <tbody>
              {adjustmentData.map((warehouse, index) => (
                <tr key={index}>
                  <td>{warehouse.warehouse_name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.times_adjusted}</td>
                  <td>{warehouse.total_adjusted}</td>
                </tr>
              ))}
            </tbody>
          </table>}
    </div>

  </>
  );
}
