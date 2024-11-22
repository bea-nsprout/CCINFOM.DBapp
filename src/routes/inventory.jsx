import { useEffect, useState } from "react";

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

export default function Inventory() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const exitModal = (event) => {
            if (event.target === document.getElementById("editModal")) {
                closeEditModal();
            } else if (event.target === document.getElementById("deleteModal")) {
                closeDeleteModal();
            }
        };

        window.addEventListener("click", exitModal);

        return () => {
            window.removeEventListener("click", exitModal);
        };
    }, []);

    useEffect(() => {
        fetch("/api/items/all")
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
                    <label htmlFor="search-bar">Search: </label>
                    <input
                        type="text"
                        id="search-bar"
                        placeholder="Enter item name or code..."
                    />
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
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data == null ? "LOADING" :
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.item_code}</td>
                                        <td>{item.item_desc}</td>
                                        <td></td>
                                        <td>{item.unit}</td>
                                        <td></td>
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
                </table>
            </section>

            {/* Edit Modal */}
            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeEditModal}>
                        &times;
                    </span>
                    <p>Are you sure you want to edit this item?</p>
                    <button onClick={confirmEdit}>Yes</button>
                    <button onClick={closeEditModal}>No</button>
                </div>
            </div>

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
        </>
    );
}
