import React, { useContext } from "react";
import { AuthContext } from "../../../../context/authcontext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { loginData }: any = useContext(AuthContext);
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
}
