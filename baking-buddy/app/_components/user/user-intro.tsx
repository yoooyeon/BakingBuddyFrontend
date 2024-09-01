import { useEffect, useState } from 'react';
import { API_URL } from "@/app/constants";
import { useParams } from "next/navigation";

interface UserProfileProps {
    username: string;
    nickname?: string;
    profileImageUrl?: string;
    introduction?: string;
    uuid: string;
}

const UserIntro = ({ userProfile }: { userProfile: UserProfileProps }) => {
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
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-start gap-4">
                <img
                    src={userProfile.profileImageUrl || "/placeholder-user.jpg"}
                    alt={userProfile.username}
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex flex-col flex-1">
                    <h1 className="text-2xl font-bold mb-2">{userProfile.nickname || userProfile.username}</h1>
                    <div className="flex flex-col">
                        <p className="text-lg mb-4">
                            {userProfile.introduction || "소개글이 아직 없습니다."}
                        </p>
                        <div className="flex justify-end">
                            <button
                                className={`px-4 py-2 rounded text-lg transition-colors duration-300 ${isFollowing ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={handleFollowClick}
                                disabled={loading}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserIntro;
