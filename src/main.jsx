import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inventory from "./routes/inventory";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Home from "./routes/home";
import Requests from "./routes/requests";
import Transfers from "./routes/transfers";
import Production from "./routes/production";
import Adjustments from "./routes/adjustments";
import ItemRecords from "./routes/itemRecords";
import WarehouseRecords from "./routes/warehouseRecords";
import TruckRecords from "./routes/truckRecords";
import PersonnelRecords from "./routes/personnelRecords";
import InventoryReports from "./routes/inventoryReports";
import ProductionReports from "./routes/productionReports";
import RequestReports from "./routes/requestReports";
import TransferReports from "./routes/transferReports";
import AdjustmentReports from "./routes/adjustmentReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "transfers",
        element: <Transfers />,
      },
      {
        path: "production",
        element: <Production />,
      },
      {
        path: "adjustments",
        element: <Adjustments />,
      },
      {
        path: "itemRecords",
        element: <ItemRecords />
      },
      {
        path: "warehouseRecords",
        element: <WarehouseRecords />
      },
      {
        path: "truckRecords",
        element: <TruckRecords />
      },
      {
        path: "personnelRecords",
        element: <PersonnelRecords />
      },
      {
        path: "inventoryReports",
        element: <InventoryReports />,
      },
      {
        path: "productionReports",
        element: <ProductionReports />,
      },
      {
        path: "requestReports",
        element: <RequestReports />,
      },
      {
        path: "transferReports",
        element: <TransferReports />,
      },
      {
        path: "adjustmentReports",
        element: <AdjustmentReports />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
