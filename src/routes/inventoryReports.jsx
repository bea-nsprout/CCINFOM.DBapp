import React, { useEffect, useState } from "react";

export default function InventoryReports() {
  const [items, setItems] = useState(null);
  const [warehouseId1, setwarehouseID1] = useState(1);
  const [warehouseId2, setwarehouseID2] = useState(1);
  const [warehouses, setWarehouses] = useState(null);

  // Fetch data (mocking API for now)
  useEffect(() => {

    const fetchWarehouses = async () => {
      try {
        const response = await fetch('/api/warehouses/view');
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };
    fetchWarehouses();
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("warehouse1_id", warehouseId1);
    queryParams.append("warehouse2_id", warehouseId2);
    console.log(queryParams.toString());
    const response = await fetch(`/api/reports/compare-warehouses?${queryParams.toString()}`);

    if (response.ok) {
      const data = await response.json();
      setItems(data);
    } else {
      alert("something went wrong.");
    }
  }


  return (<>

    <link rel="stylesheet" href="styles/inventoryReports.css"></link>
    <div className="inventory-reports-container">
      <h1>Inventory Items</h1>
      <div className="search-container">
        <select id="warehouse_id" name="warehouse_id" onChange={async (e) => { setwarehouseID1(e.target.value); await handleSearch() }}>
          {warehouses?.map((warehouse) => (
            <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
              {warehouse.warehouse_name + " - " + warehouse.location}
            </option>
          ))}
        </select>
        <select id="warehouse_id" name="warehouse_id" onChange={async (e) => { setwarehouseID2(e.target.value); await handleSearch() }}>
          {warehouses?.map((warehouse) => (
            <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
              {warehouse.warehouse_name + " - " + warehouse.location}
            </option>
          ))}
        </select>

      </div>
      {items == null ? <></> :
        <table className="inventory-reports-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Description</th>
              <th>{warehouses.find((({ warehouse_id }) => warehouse_id == warehouseId1)).warehouse_name}</th>
              <th>{warehouses.find((({ warehouse_id }) => warehouse_id == warehouseId2)).warehouse_name}</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_code}</td>
                  <td>{item.item_desc}</td>
                  <td>{item.warehouse1}</td>
                  <td>{item.warehouse2}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items found</td>
              </tr>
            )}
          </tbody>
        </table>}
    </div>

  </>
  );
}
