import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate} from "react-router-dom";
import "../App.css";
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
        // const data = await response.json();
        console.log("Usuario creado");
        setErrorResponse("");
        goTo("/");
      } else {
        // const errorData = await response.json();
        console.error("Error del servidor:");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard"></Navigate>;
  }
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Create User</button>
      </form>
    </DefaultLayout>
  );
}
