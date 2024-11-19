export default function Production() {

    function showNewProductionRecord () {
        document.getElementById('new-production-modal').style.display = 'flex';
    }

    function closeNewProductionRecord() {
        document.getElementById('new-production-modal').style.display = 'none';
    }

    function confirmNewProductionRecord() {
        alert("Production Record Added");
        closeNewRequest();
    }

    return (
        <>
        <link rel="stylesheet" href="styles/production.css"></link>
            <div className="search-filter">
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" placeholder="Enter production ID or item code..." />
                <select id="status-filter">
                    <option value="">Filter by Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <select id="warehouse-filter">
                    <option value="">Filter by Warehouse</option>
                    <option value="warehouse1">Warehouse 1</option>
                    <option value="warehouse2">Warehouse 2</option>
                </select>
                <button>Apply Filters</button>
            </div>

            <table className="production-table">
                <thead>
                    <tr>
                        <th>Production ID</th>
                        <th>Item Code</th>
                        <th>Quantity Produced</th>
                        <th>Production Date</th>
                        <th>Warehouse</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dynamically render table rows here */}
                </tbody>
            </table>

            <button id="new-production-btn" onClick={showNewProductionRecord}>New Production Record</button>

            <div id="new-production-modal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeNewProductionRecord}>&times;</span>
                    <h3>Create New Production Record</h3>
                    <form>
                        <label htmlFor="item-code">Item Code:</label>
                        <input type="text" id="item-code" required />

                        <label htmlFor="quantity-produced">Quantity Produced:</label>
                        <input type="number" id="quantity-produced" required />

                        <label htmlFor="production-date">Production Date:</label>
                        <input type="date" id="production-date" required />

                        <label htmlFor="warehouse-location">Warehouse Location:</label>
                        <select id="warehouse-location">
                            <option value="warehouse1">Warehouse 1</option>
                            <option value="warehouse2">Warehouse 2</option>
                        </select>

                        <button type="submit" onClick={confirmNewProductionRecord}>Submit Production</button>
                    </form>
                </div>
            </div>
        </>
    );
}
