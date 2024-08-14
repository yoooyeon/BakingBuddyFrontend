"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/css/form.module.css';
import { API_URL } from '@/app/constants';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.data;
        const accessToken = data.accessToken;

        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken",accessToken)
        localStorage.setItem("refreshToken",refreshToken)
        // alert(result.data)
        const token = localStorage.getItem("accessToken");
        localStorage.setItem("username",username)
       // alert(username+" 환영합니다")

        // 로그인 성공 후 쿠키가 서버에 의해 설정됩니다
        router.push('/'); // 로그인 후 메인 페이지로 이동
        window.location.reload(); // 페이지 리로드 추가
      } else {
        const result = await response.json();
        setError(result.message || 'Invalid login credentials.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
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
        <a href="/signup" className={styles.link}>Don&apos;t have an account? Sign up</a>
      </div>
    </form>
  );
}
