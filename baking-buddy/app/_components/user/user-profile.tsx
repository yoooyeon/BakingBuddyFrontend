"use client";
import { useState, useEffect } from "react";
import styles from "../../../css/form.module.css";

interface UserProfileProps {
  username: string;
  profileImageUrl: string;
  nickname: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfileProps>({
    username: "",
    profileImageUrl: "",
    nickname: "",
  });

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchUserProfile = async () => {
      try {
        // Get the user ID from context or authentication state
        const userId = "1"; // Replace this with the actual user ID retrieval logic
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.data;
          setProfile(data);
        } else {
          console.error("Error fetching user profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get the user ID from context or authentication state
      const userId = "1"; // Replace this with the actual user ID retrieval logic
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("nickname", profile.nickname);
      if (file) {
        formData.append("profileImage", file);
      }

      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imageContainer}>
        <img
          src={profile.profileImageUrl || "/placeholder-user.jpg"} // Fallback to a default image if no profile image URL
          alt="Profile"
          className={styles.profileImage}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          이름
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className={styles.input}
          readOnly
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="nickname" className={styles.label}>
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={profile.nickname}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
      >
        프로필 수정
      </button>
    </form>
  );
};

export default UserProfile;
