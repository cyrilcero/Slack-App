import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage/MainPage";
import Sidebar from "./pages/MainPage/components/Sidebar.jsx";
import AllUsers from "./pages/MainPage/components/AllUsers";
import CreateChannel from "./pages/MainPage/components/CreateChannel.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Sidebar />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "create-channel",
        element: <CreateChannel />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={routes} />
    <ToastContainer />
  </>
);
