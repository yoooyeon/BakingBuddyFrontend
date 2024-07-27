"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../css/form.module.css";
export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // To handle any errors during login
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/login`, { // Ensure protocol is included
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // If the response is OK, redirect to home page
        router.push("/");
      } else {
        // Handle errors if the response is not OK
        const result = await response.json();
        setError(result.message || "Invalid login credentials.");
      }
    } catch (error) {
      // Handle network or other errors
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Login
      </button>
      <div className={styles.linkContainer}>
        <a href="/signup" className={styles.link}>Don't have an account? Sign up</a>
      </div>
    </form>
  );
}
