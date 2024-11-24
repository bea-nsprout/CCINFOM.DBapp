import React, { useEffect, useState } from "react";

export default function Inventory() {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null); // Holds the item to be edited
    const [editQuantity, setEditQuantity] = useState(""); // Holds the new quantity value

    // Fetch inventory data on load
    useEffect(() => {
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch("/api/inventories/view");
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    // Show the edit modal and set the selected item
    const showEditModal = (item) => {
        setSelectedItem(item);
        setEditQuantity(item.quantity); // Pre-fill the input with the current quantity
        document.getElementById("editModal").style.display = "flex";
    };

    const closeEditModal = () => {
        document.getElementById("editModal").style.display = "none";
    };

    // Handle the edit quantity submission
    const confirmEdit = async (e) => {
        e.preventDefault();

        if (!selectedItem || editQuantity === "") {
            alert("Please provide a valid quantity.");
            return;
        }

        try {
            const response = await fetch("/api/inventories/modify", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    item_code: selectedItem.item_code,
                    warehouse_id: selectedItem.warehouse_id,
                    qty_new: parseInt(editQuantity),
                }),
            });

            if (response.ok) {
                alert("Quantity updated successfully!");
                closeEditModal();
                fetchInventoryData(); // Refresh the data
            } else {
                alert("Failed to update quantity.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Filter data based on the search query
    const filteredData = data?.filter((item) =>
        item.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <link
                rel="stylesheet"
                href="/public/styles/inventory.css"
                type="text/css"
            />
            <section className="hero inventory-hero">
                <div className="hero-content">
                    <h1>Inventory Management</h1>
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

            <section className="inventory-table-section">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Warehouse</th>
                            <th>Edit Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data == null ? (
                            <tr>
                                <td colSpan="6">LOADING...</td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item_code}</td>
                                    <td>{item.item_desc}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.warehouse_name}</td>
                                    <td>
                                        <button className="edit" onClick={() => showEditModal(item)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No matching records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Edit Modal */}
            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeEditModal}>
                        &times;
                    </span>
                    <h3>Edit Quantity</h3>
                    {selectedItem && (
                        <form onSubmit={confirmEdit}>
                            <label htmlFor="itemcode">Item Code:</label>
                            <p>{selectedItem.item_code}</p>

                            <label htmlFor="item-name">Item Name:</label>
                            <p>{selectedItem.item_desc}</p>

                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                required
                            />

                            <button type="submit" className="submit-button">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
