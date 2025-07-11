import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

import { useState } from "react";
import { API_URL } from "../auth/constants";

import type { AuthResponseError } from "../types/types";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        console.log("Usuario creado");
        setErrorResponse("");
        goTo("/");
      } else {
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
        <h1 className="login-form-title">Signup</h1>
        {!!errorResponse && (
          <div className="login-form-error">{errorResponse}</div>
        )}

        <label className="login-form-label">Name</label>
        <input
          className="login-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="login-form-button">Create User</button>
      </form>
    </DefaultLayout>
  );
}
