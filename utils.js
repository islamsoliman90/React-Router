import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedin");
  const redirectTo = new URL(request.url).pathname || "/";
  if (!isLoggedIn) {
    throw redirect(`/login?message=You must log in first.&&url=${redirectTo}`);
  }
}
