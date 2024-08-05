import styles from "@/css/user-profile.module.css";

interface UserProfileProps {
    username: string;
    nickname?: string;
    profileImageUrl?: string;
    introduction?: string;
}

const UserIntro = ({ userProfile }: { userProfile: UserProfileProps }) => {
    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <img
                    src={userProfile.profileImageUrl || "/placeholder-user.jpg"}
                    alt={userProfile.username}
                    className={styles.profileImage}
                />
                <h1 className={styles.username}>{userProfile.nickname}</h1>
                <h1 className={styles.username}>{userProfile.username}</h1>
                <p className={styles.introduction}>
                    {userProfile.introduction || "소개글이 아직 없습니다."}
                </p>
                {/*<button className={styles.followButton}>Follow</button>*/}
            </div>
        </div>
    );
};

export default UserIntro;
