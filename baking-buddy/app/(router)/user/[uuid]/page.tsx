"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants";
import UserIntro from "@/app/_components/user/user-intro";

interface UserProfileProps {
    nickname?: string;
    profileImageUrl?: string;
    introduction?: string;
    username: string;
}

const IntroPage = () => {
    const params = useParams();
    const uuid = params.uuid as string;
    const [userIntro, setUserIntro] = useState<UserProfileProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("useEffect called with uuid:", uuid);
        if (!uuid) return;

        async function fetchIntro() {
            console.log("fetchIntro called");
            setLoading(true);  // Ensure loading state is true at the beginning of fetch
            setError(null);    // Clear previous errors
            try {
                const response = await fetch(`${API_URL}/api/users/intro/${uuid}`, {
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
                console.log("fetchIntro data:", data);
                setUserIntro(data);
            } catch (err) {
                console.log("fetchIntro error:", err);
                setError((err as Error).message);
            } finally {
                console.log("fetchIntro finally");
                setLoading(false); // Ensure loading state is false after fetch is complete
            }
        }

        fetchIntro();
    }, [uuid]);

    console.log("Component rendered with loading:", loading, "error:", error, "userIntro:", userIntro);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {userIntro && <UserIntro userProfile={userIntro} />}
        </div>
    );
};

export default IntroPage;
