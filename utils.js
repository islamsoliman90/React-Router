import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("isLoginUser");

  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first.");
  }
}
