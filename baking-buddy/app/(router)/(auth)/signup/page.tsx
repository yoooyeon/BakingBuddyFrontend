"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/app/_components/auth/signup-form";
import { API_URL } from "@/app/constants";

// Define the shape of formData
interface FormData {
  username: string;
  password: string;
  nickname: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    nickname: ""
  });
  const [error, setError] = useState<string>(""); // To handle any errors during signup
  const router = useRouter();

  // Handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, { // Ensure protocol is included
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // If the response is OK, redirect to login page
        router.push("/login");
      } else {
        // Handle errors if the response is not OK
        const result = await response.json();
        setError(result.message || "An error occurred during signup.");
      }
    } catch (error) {
      // Handle network or other errors
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SignupForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
