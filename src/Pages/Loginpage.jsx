


////new-code

import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../usercontext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      const res = await fetch("http://mindwolf.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password }),
        credentials: "include",
      });

      if (res.ok) {
        const userInfo = await res.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        const errorMsg = await res.text();
        alert("Invalid credentials: " + errorMsg);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button >Login</button>
      </form>
    );
  }

