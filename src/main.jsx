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
import { ProtectedRoute, LoggedInRoute } from "./utils";
import MessageArea, {
  NoSelectedChat,
} from "./pages/MainPage/components/MessageArea.jsx";
import ChannelMessageArea from "./pages/MainPage/components/ChannelMessageArea.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoggedInRoute>
        <App />
      </LoggedInRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Sidebar />,
        children: [
          {
            index: true,
            element: <NoSelectedChat />,
            errorElement: <ErrorPage />,
          },
          {
            path: "t/:id",
            element: <MessageArea />,
            errorElement: <ErrorPage />,
          },
          {
            path: "c/:id",
            element: <ChannelMessageArea />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "create-channel",
        element: <CreateChannel />,
        errorElement: <ErrorPage />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
        errorElement: <ErrorPage />,
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
