export default function Transfers() {
  return (
    <>
      <link rel="stylesheet" href="styles/transfers.css"></link>
      <div className="search-filter">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter transfer ID or item code..."
        />
        <select id="status-filter">
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button>Apply Filters</button>
      </div>

      <table className="transfers-table">
        <thead>
          <tr>
            <th>Transfer ID</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Transfer Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // Table rows would be dynamically generated here
          }
        </tbody>
      </table>

      <button id="new-transfer-btn">New Transfer</button>

      <div id="new-transfer-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h3>Create New Transfer</h3>
          <form>
            <label htmlFor="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" required />

            <label htmlFor="from-warehouse">From Warehouse:</label>
            <select id="from-warehouse">
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
            </select>

            <label htmlFor="to-warehouse">To Warehouse:</label>
            <select id="to-warehouse">
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
            </select>

            <button type="submit">Submit Transfer</button>
          </form>
        </div>
      </div>
    </>
  );
}
