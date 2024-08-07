import {useEffect, useState} from 'react';
import styles from "@/css/user-profile.module.css";
import {API_URL} from "@/app/constants";
import {useParams} from "next/navigation";

interface UserProfileProps {
    username: string;
    nickname?: string;
    profileImageUrl?: string;
    introduction?: string;
    uuid: string;
}

const UserIntro = ({userProfile}: { userProfile: UserProfileProps }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const params = useParams();
    const uuid = params.uuid as string;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserIntro = async () => {
            try {
                const response = await fetch(`${API_URL}/api/follow/is-following?followedId=${uuid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    const result = await response.json();
                    setIsFollowing(result.message === 'Following');
                    console.log("json=", result.message);
                } else {
                    console.error("Error fetching user profile:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserIntro();
    }, [uuid]);

    const handleFollowClick = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/follow/${isFollowing ? 'unfollow' : 'follow'}?followedId=${uuid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });
            if (response.ok) {
                const result = await response.json();
                console.log(`${isFollowing ? 'unfollow' : 'follow'}=`, result.message);
                setIsFollowing(!isFollowing);
            } else {
                console.error(`Error ${isFollowing ? 'unfollowing' : 'following'}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error ${isFollowing ? 'unfollowing' : 'following'}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/*프로필 */}
            <div className={styles.profileHeader}>
                <img
                    src={userProfile.profileImageUrl || "/placeholder-user.jpg"}
                    alt={userProfile.username}
                    className={styles.profileImage}
                />
                <h1 className={styles.username}>{userProfile.nickname || userProfile.username}</h1>
                <p className={styles.introduction}>
                    {userProfile.introduction || "소개글이 아직 없습니다."}
                </p>
                <button
                    className={`${styles.followButton} ${isFollowing ? styles.following : styles.notFollowing}`}
                    onClick={handleFollowClick}
                    disabled={loading}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            {/*레시피*/}
            <div>

            </div>
        </div>
    );
};

export default UserIntro;
