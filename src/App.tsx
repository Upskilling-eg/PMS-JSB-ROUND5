import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import VerifyAccount from "./modules/Auth/components/VerifyAccount/VerifyAccount";
import ForgetPass from "./modules/Auth/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Auth/components/ResetPass/ResetPass";
import ChangePass from "./modules/Auth/components/ChangePass/ChangePass";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import ProjectsList from "./modules/Projects/components/ProjectsList/ProjectsList";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import TasksList from "./modules/Tasks/components/TasksList/TasksList";
import TaskData from "./modules/Tasks/components/TaskData/TaskData";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-acoount", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "change-pass", element: <ChangePass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        { path: "", element: <Dashboard /> },
        { path: "projects", element: <ProjectsList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "tasks", element: <TasksList /> },
        { path: "task-data", element: <TaskData /> },
        { path: "task-data/:id", element: <TaskData /> },

        { path: "users", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>)
    </>
  );
}

export default App;
