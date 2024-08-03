"use client";
import { useState, useEffect } from "react";
import styles from "../../../css/form.module.css";
import { API_URL } from "@/app/constants";
import UesrCountPopup from "@/app/_components/popup/uesr-count-popup";
import AlarmPopup from "@/app/_components/popup/alarm-popup";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/mypage`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.data;
          setProfile(data);
          setPreview(data.profileImageUrl); // Set initial preview image
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
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("nickname", profile.nickname);
      if (file) {
        formData.append("profileImage", file);
      }

      const response = await fetch(`${API_URL}/api/users`, {
        method: "PUT",
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        <AlarmPopup msg={"프로필이 저장되었습니다."} onClose={() => setShowPopup(false)}/>
        alert("프로필이 저장되었습니다.");
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
    <form onSubmit={handleSubmit}>
      <div className={styles.imageContainer}>
        <img
          src={preview || profile.profileImageUrl || "/placeholder-user.jpg"} // Use preview image or fallback to profileImageUrl or placeholder
          alt="Profile"
          className={styles.profileImageBig}
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
