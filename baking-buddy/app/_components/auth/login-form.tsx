"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../css/form.module.css";
import { API_URL } from "@/app/constants";
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // To handle any errors during login
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        setCookie(null, 'accessToken', data.accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          sameSite: 'None',
        });

        setCookie(null, 'refreshToken', data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          sameSite: 'None',
        });
        router.push("/"); // 로그인 후 메인 페이지로 이동
        window.location.reload(); // 페이지 리로드 추가
      } else {
        const result = await response.json();
        setError(result.message || "Invalid login credentials.");
      }
    } catch (error) {
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
