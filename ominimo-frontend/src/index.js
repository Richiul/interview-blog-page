import "./index.css";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import App from "./App";
import CreatePost from "./views/CreatePost.jsx";
import Dashboard from "./views/Dashboard.jsx";
import EditPost from "./views/EditPost.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound";
import Post from "./views/Post.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./views/Register.jsx";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/posts" replace />,
  },
  {
    path: "/posts",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <ProtectedRoute element={CreatePost} />,
      },
      {
        path: ":postId",
        element: <Post />,
      },
      {
        path: ":postId/edit",
        element: <ProtectedRoute element={EditPost} />,
      },
    ],
  },
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <GuestRoute element={Login} />,
      },
      {
        path: "/register",
        element: <GuestRoute element={Register} />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
