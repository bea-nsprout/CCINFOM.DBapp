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
import Items from "./routes/items";

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
        path: "items",
        element: <Items />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
