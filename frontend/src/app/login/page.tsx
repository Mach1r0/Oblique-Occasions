"use client";
import React, { useState } from "react";
import style from "@/app/style/Login.module.css";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { GiConsoleController } from "react-icons/gi";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await login(username, password);
      if (result && result.ok) {
        router.push("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  return (
    <div className={style["container-login-all"]}>
      <div className={style["container-login-content"]}>
        <h1 className={style["title"]}>Log In</h1>
        <form onSubmit={handleLogin}>
          <div className={style["form-group"]}>
            <label htmlFor="username" className={style["label-text"]} >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={style["input-field"]}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={style["form-group"]}>
            <label htmlFor="password" className={style["label-text"]}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={style["input-field"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={style["submit-button"]}>
            Log In
          </button>
        </form>

        <small className={style["footer-text"]}>
          Don't have an account? <a href="/sign-in">Sign In</a>
        </small>
      </div>
    </div>
  );
}
