import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <h1>Warehouse Logistics Database System</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/transfers">Transfers</Link>
          <Link to="/production">Production</Link>
          <Link to="/adjustments">Adjustments</Link>
          <div className="dropdown">
            <Link className="dropbtn">Records</Link>
            <div className="dropdown-content">
              <Link to="/itemRecords">Items</Link>
              <Link to="/warehouseRecords">Warehouses</Link>
              <Link to="/truckRecords">Trucks</Link>
              <Link to="/personnelRecords">Personnels</Link>
            </div>
          </div>

          <div className="dropdown">
            <Link className="dropbtn">Reports</Link>
            <div className="dropdown-content">
              <Link to="/inventoryReports">Inventory</Link>
              <Link to="/productionReports">Production</Link>
              <Link to="/requestReports">Request</Link>
              <Link to="/transferReports">Transfer</Link>
              <Link to="/adjustmentReports">Adjustment</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <section className="contact-section">
        <div className="content-container">
          <div className="contact-info">
            <h3>Efficient Solutions, Smarter Warehouses</h3>
            <p>Manage Inventory with Precision.</p>
            <p>
              Contact Us
              <br />
              (+63) 939-113-0006
              <br />
              ccinforms14@dlsu.edu.ph
              <br />
              5014 Taft Avenue, Malate, City of Manila
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <a href="#">Services</a>
              <a href="#">Careers</a>
              <a href="#">Events</a>
              <a href="#">Data Exchange Hub</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Labor Management</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>
          &copy; 2024 Warehouse Logistics Database System. All Rights Reserved.
          <br />
          Designed and Developed by CCINFOM
        </p>
      </footer>
    </>
  );
}
