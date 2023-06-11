import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  // return new URL(request.url).searchParams.get("message");
  return null;
}

/**
 * Challenge: Code the sad path 🙁
 * 3. Add a `status` state and default it to "idle". When the
 *    login form begins submitting, set it to "submitting". When
 *    it's done submitting (whether successful or not), set it
 *    to "idle" again.
 * 4. Disable the button when the `status` state is "submitting"
 *    (this may require some Googling if you haven't done this
 *    before).
 * 5. Add an `error` state and default it to `null`. When the
 *    form is submitted, reset the errors to `null`. If there's
 *    an error from `loginUser` (add a .catch(err => {...}) in
 *    the promise chain), set the error to the error that
 *    comes back.
 * 6. Display the error.message below the `h1` if there's ever
 *    an error in state
 */

export default function Login() {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const message = useLoaderData();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setState(() => "submitting");
    setError(null);
    loginUser(loginFormData)
      .then((data) => navigate("/host"))
      .catch((e) => setError(() => e))
      .finally(() => setState("idle"));
  }
  console.log(message, state);
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={state !== "idle" ? true : false}>
          {state != "idle" ? "Loading" : " Log in"}
        </button>
      </form>
    </div>
  );
}
