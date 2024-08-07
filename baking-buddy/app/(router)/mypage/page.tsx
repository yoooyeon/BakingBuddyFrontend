"use client"
import { useState, useEffect } from 'react';
import Modal from '@/app/_components/Modal';
import UserProfileSmall from '@/app/_components/user/user-profile-small';
import UserProfile from '@/app/_components/user/user-profile';
import { API_URL } from '@/app/constants';

interface User {
    username: string;
    profileImageUrl: string;
    uuid: string;
}

const UserProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [followedCount, setFollowedCount] = useState<number>(0);
    const [followerCount, setFollowerCount] = useState<number>(0);
    const [followed, setFollowed] = useState<User[]>([]);
    const [followers, setFollowers] = useState<User[]>([]);
    const [isFollowedModalOpen, setFollowedModalOpen] = useState(false);
    const [isFollowerModalOpen, setFollowerModalOpen] = useState(false);

    useEffect(() => {
        async function fetchFollow() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/api/follow/summary`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const data = json.data;
                setFollowedCount(data.followedCnt);
                setFollowerCount(data.followerCnt);
                setFollowed(data.followedUsers);
                setFollowers(data.followers);
            } catch (err) {
                console.error("fetchCounts error:", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchFollow();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="flex space-x-4 mt-4">
                <div className="flex cursor-pointer" onClick={() => setFollowedModalOpen(true)}>
                    <h2>팔로잉</h2>
                    <p>{followedCount}</p>
                </div>
                <div className="flex cursor-pointer" onClick={() => setFollowerModalOpen(true)}>
                    <h2>팔로워</h2>
                    <p>{followerCount}</p>
                </div>
            </div>

            <UserProfile />

            <Modal
                isOpen={isFollowedModalOpen}
                onClose={() => setFollowedModalOpen(false)}
                title="팔로잉"
            >
                {followed.map(user => (
                    <UserProfileSmall
                        key={user.uuid}
                        img={user.profileImageUrl}
                        username={user.username}
                        uuid={user.uuid}
                    />
                ))}
            </Modal>

            <Modal
                isOpen={isFollowerModalOpen}
                onClose={() => setFollowerModalOpen(false)}
                title="팔로워"
            >
                {followers.map(user => (
                    <UserProfileSmall
                        key={user.uuid}
                        img={user.profileImageUrl}
                        username={user.username}
                        uuid={user.uuid}
                    />
                ))}
            </Modal>
        </div>
    );
};

export default UserProfilePage;
