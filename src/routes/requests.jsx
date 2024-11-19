export default function Requests() {
  // java script

  return (
    <>
      <link rel="stylesheet" href="styles/requests.css"></link>
      <div class="search-filter">
        <label for="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter request ID or keywords..."
        />
        <select id="status-filter">
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button>Apply Filters</button>
      </div>

      <table class="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>

      <button id="new-request-btn">New Request</button>

      <div id="new-request-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h3>Create New Request</h3>
          <form>
            <label for="item-code">Item Code:</label>
            <input type="text" id="item-code" required />

            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" required />

            <label for="warehouse">Warehouse:</label>
            <select id="warehouse">
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
            </select>

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </>
  );
}
