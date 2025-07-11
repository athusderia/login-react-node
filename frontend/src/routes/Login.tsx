import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import type { AuthResponse, AuthResponseError } from "../types/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("Login correcto - redirigiendo");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        console.log("Access Token:", json.body.accessToken);
        console.log("Refresh Token:", json.body.refreshToken);
        // if (json.body.accessToken && json.body.refreshToken) {
        if (json.body.refreshToken) {
          auth.saveUser(json);
          <Navigate to="/dashboard" />;
          console.log("Redirigiendo...");
        }
      } else {
        console.log("Someting went wrong");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-logo"></div>
        <h1 className="login-form-title">Login</h1>
        {!!errorResponse && (
          <div className="login-form-error">{errorResponse}</div>
        )}

        <label className="login-form-label">Username</label>
        <input
          className="login-form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="login-form-label">Password</label>
        <input
          className="login-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-form-button">Login</button>
      </form>
    </DefaultLayout>
  );
}
