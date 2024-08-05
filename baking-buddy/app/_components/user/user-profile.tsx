"use client";
import { useState, useEffect } from "react";
import styles from "@/css/form.module.css";
import { API_URL } from "@/app/constants";
import AlarmPopup from "@/app/_components/popup/alarm-popup";

interface UserProfileProps {
  username: string;
  profileImageUrl: string;
  nickname: string;
  introduction?: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfileProps>({
    username: "",
    profileImageUrl: "",
    nickname: "",
    introduction: "",
  });

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // Control visibility of the popup
  const [popupMessage, setPopupMessage] = useState(""); // Popup message

  useEffect(() => {
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
          setPreview(data.profileImageUrl);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("nickname", profile.nickname);
      formData.append("introduction", profile.introduction || "");
      if (file) {
        formData.append("profileImage", file);
      }

      const response = await fetch(`${API_URL}/api/users`, {
        method: "PUT",
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        setPopupMessage("프로필이 저장되었습니다.");
        setShowPopup(true);
      } else {
        setPopupMessage("Failed to update profile");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setPopupMessage("An error occurred while updating profile");
      setShowPopup(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div className={styles.imageContainer}>
            <img
                src={preview || profile.profileImageUrl || "/placeholder-user.jpg"}
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
          <div className={styles.inputGroup}>
            <label htmlFor="introduction" className={styles.label}>
              자기 소개
            </label>
            <textarea
                id="introduction"
                name="introduction"
                value={profile.introduction || ""}
                onChange={handleChange}
                className={styles.input}
                placeholder="내 소개 입력하기"
            />
          </div>
          <button
              type="submit"
              className={styles.submitButton}
          >
            프로필 수정
          </button>
        </form>
        {showPopup && <AlarmPopup msg={popupMessage} onClose={() => setShowPopup(false)} />}
      </>
  );
}

export default UserProfile;
