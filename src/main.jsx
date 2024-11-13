import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "./service/keepalive.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Pages/DashBoard.jsx";
import EditResume from "./Pages/EditResume.jsx";
import ViewResume from "./Pages/ViewResume.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "my-resume/:resumeId/view",
    element: <ViewResume />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
