import React from "react";
import { useSelector } from "react-redux";

export default function ShowOnLogin({ children }) {
  const { isLoggedIn } = useSelector((s) => s.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
}
export function ShowOnLogOut({ children }) {
  const { isLoggedIn } = useSelector((s) => s.auth);
  if (!isLoggedIn) {
    return children;
  }
  return null;
}
