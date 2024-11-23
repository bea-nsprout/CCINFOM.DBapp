import React, { useEffect, useState } from "react";

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

// function showDeleteModal() {
//     document.getElementById("deleteModal").style.display = "flex";
// }

// function closeDeleteModal() {
//     document.getElementById("deleteModal").style.display = "none";
// }

// function confirmDelete() {
//     alert("Item deleted successfully!");
//     closeDeleteModal();
// }

export default function Inventory() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const exitModal = (event) => {
            if (event.target === document.getElementById("editModal")) {
                closeEditModal();
            }
        };

        window.addEventListener("click", exitModal);

        return () => {
            window.removeEventListener("click", exitModal);
        };
    }, []);

    useEffect(() => {
        fetch("api/inventories/view/all")
            .then(response => response.json())
            .then(d => setData(d));
    }, [])

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
                        <select className="search-dropdown">
                            <option value="item_code">Item Code</option>
                            <option value="item_name">Item Name</option>
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
                        {
                            data == null ? "LOADING" :
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.item_code}</td>
                                        <td>{item.item_desc}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.warehouse_name}</td>
                                        <td>
                                            <button className="edit" onClick={showEditModal}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </section>

            {/* Edit Modal */}
            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeEditModal}>&times;</span>
                    <h3>Edit Quantity</h3>
                    <form>
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" required />

                        <button type="submit" onClick={confirmEdit}>Edit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
