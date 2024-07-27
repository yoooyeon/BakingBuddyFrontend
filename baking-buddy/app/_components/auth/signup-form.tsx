import React, { ChangeEvent, FormEvent } from 'react';
import styles from "../../../css/form.module.css";

// Define the shape of formData prop
interface FormData {
  username: string;
  password: string;
  nickname: string;
}

// Define the props for SignupForm
interface SignupFormProps {
  formData: FormData;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            required
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={onChange}
            className={styles.input}
          />
        </label>
      </div>
      <button type="submit" className={styles.button}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
