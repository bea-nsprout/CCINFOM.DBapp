import React, { useState } from "react";

export default function ProductionReports() {
  const [productionData, setProductionData] = useState(null);
  const [daysQuery, setDaysQuery] = useState(0);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("ndays", daysQuery);
    console.log(queryParams.toString());
    const response = await fetch(`/api/reports/total-produced?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      setProductionData(data);
    } else {
      alert("something went wrong.");
    }
  }

  return (<>
    <link rel="stylesheet" href="styles/productionReports.css"></link>
    <div className="warehouse-production-container">
      <h1>Warehouse Production Report</h1>

      <input
        type="number"
        placeholder="Number of Days..."
        className="search-bar"
        onChange={(e) => setDaysQuery(e.target.value)}
      />
      <button type="submit" onClick={handleSearch}>Search</button>

      {productionData == null ? <></> :

        <table className="warehouse-production-table">
          <thead>
            <tr>
              <th>Warehouse Name</th>
              <th>Location</th>
              <th>Total Produced (Past 30 Days)</th>
            </tr>
          </thead>
          <tbody>
            {
              productionData.map((warehouse, index) => (
                <tr key={index}>
                  <td>{warehouse.warehouse_name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.total_produced == null ? 0 : warehouse.total_produced}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  </>
  );
}
