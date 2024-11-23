import React, { useEffect, useState } from "react";

function showEditModal() {
    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function confirmEdit() {
    alert("Quantity updated successfully!");
    closeEditModal();
}

export default function Reports() {
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
        // Fetch API data for warehouses
        fetch("api/warehouses/view")
            .then((response) => response.json())
            .then((d) => setData(d));
    }, []);

    return (
        <>
            <link
                rel="stylesheet"
                href="/styles/reports.css"
                type="text/css"
            />
            <section className="hero report-hero">
                <div className="hero-content">
                    <h1>Warehouse Transfers</h1>
                    <p>Monitor transfers and quantities per warehouse.</p>
                </div>
            </section>

            <section className="warehouse-table-section">
                <table className="warehouse-table">
                    <thead>
                        <tr>
                            <th>Warehouse Name</th>
                            <th>Location</th>
                            <th>Transfers Out</th>
                            <th>Transfers In</th>
                            <th>Edit Transfers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data == null ? (
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                        ) : (
                            data.map((warehouse, index) => (
                                <tr key={index}>
                                    <td>{warehouse.warehouse_name}</td>
                                    <td>{warehouse.location}</td>
                                    <td>{warehouse.transfers_out}</td>
                                    <td>{warehouse.transfers_in}</td>
                                    <td>
                                        <button
                                            className="edit"
                                            onClick={showEditModal}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
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
                    <h3>Edit Transfers</h3>
                    <form>
                        <label htmlFor="transfers-out">Transfers Out:</label>
                        <input type="number" id="transfers-out" required />

                        <label htmlFor="transfers-in">Transfers In:</label>
                        <input type="number" id="transfers-in" required />

                        <button
                            type="submit"
                            className="submit-button"
                            onClick={confirmEdit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
