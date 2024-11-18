import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inventory, { loader as inventoryLoader } from "./routes/inventory";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Home from "./routes/home";
import Requests from "./routes/requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "inventory",
        element: <Inventory />,
        loader: inventoryLoader
      },
      {
        path: "requests",
        element: <Requests />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);