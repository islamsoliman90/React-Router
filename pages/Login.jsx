import React from "react";
import { useLoaderData, useNavigate, redirect, Form } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  console.log("Action function");
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let data = await loginUser({ email, password });
  localStorage.setItem("isLoginUser", true);
  throw redirect("/host");

  return null;
}

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const message = useLoaderData();
  const navigate = useNavigate();

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setStatus("submitting");
  //     setError(null);
  //     loginUser(loginFormData)
  //       .then((data) => {
  //         navigate("/host", { replace: true });
  //       })
  //       .catch((err) => setError(err))
  //       .finally(() => setStatus("idle"));
  //   }

  //   function handleChange(e) {
  //     const { name, value } = e.target;
  //     setLoginFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
