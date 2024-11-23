import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inventory from "./routes/inventory";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Home from "./routes/home";
import Records from "./routes/records";
import Requests from "./routes/requests";
import Transfers from "./routes/transfers";
import Production from "./routes/production";
import Adjustments from "./routes/adjustments";

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
        path: "records",
        element: <Records />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
