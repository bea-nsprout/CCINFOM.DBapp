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
    const [data, setData] = useState([]); // Data for transfers
    const [selectedWarehouse, setSelectedWarehouse] = useState(null); // Selected warehouse for editing
    const [transfersOut, setTransfersOut] = useState(0); // Transfers out for editing
    const [transfersIn, setTransfersIn] = useState(0); // Transfers in for editing

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

    // Fetch data for transfers
    const fetchData = async () => {
        try {
            const response = await fetch("/api/reports/transfers-report?ndays=30"); // Adjust ndays as needed
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setTransfersOut(warehouse.transfers_out || 0);
        setTransfersIn(warehouse.transfers_in || 0);
        showEditModal();
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        // Call your API to update the data (adjustment functionality is currently a placeholder)
        alert(
            `Saving changes for ${selectedWarehouse.warehouse_name}: Transfers Out - ${transfersOut}, Transfers In - ${transfersIn}`
        );

        closeEditModal();
        fetchData(); // Refresh the table data after saving
    };

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
                    <p>Monitor transfers and quantities per warehouse for the past 30 days.</p>
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
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5">No data available</td>
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
                                            className="edit-button"
                                            onClick={() => handleEdit(warehouse)}
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
                    <h3>Edit Transfers for {selectedWarehouse?.warehouse_name}</h3>
                    <form onSubmit={handleSaveChanges}>
                        <label htmlFor="transfers-out">Transfers Out:</label>
                        <input
                            type="number"
                            id="transfers-out"
                            value={transfersOut}
                            onChange={(e) => setTransfersOut(e.target.value)}
                            required
                        />

                        <label htmlFor="transfers-in">Transfers In:</label>
                        <input
                            type="number"
                            id="transfers-in"
                            value={transfersIn}
                            onChange={(e) => setTransfersIn(e.target.value)}
                            required
                        />

                        <button type="submit" className="submit-button">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
