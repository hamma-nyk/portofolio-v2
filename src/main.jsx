import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./css/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/project/:slug",
    element: (
      <Suspense
        fallback={
          <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-gray-400 text-sm">
            Loading project...
          </div>
        }
      >
        <ProjectDetail />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
