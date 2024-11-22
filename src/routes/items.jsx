export default function Items() {

    return (
        <>

            <link
                rel="stylesheet"
                href="/styles/inventory.css"
                type="text/css"
            />
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
            <button id="new-production-btn">New Item</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Unit</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </>
    )
}