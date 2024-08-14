"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants";
import UserIntro from "@/app/_components/user/user-intro";
import IntroRecipes from "@/app/_components/user/intro-recipes";

interface DirectoryWithRecipesResponseDto {
    dirId: number;
    dirName: string;
    recipes: RecipeResponseDto[];
}

interface RecipeResponseDto {
    id: number;
    name: string;
    description: string;
    recipeImageUrl: string;
    time: number;
    level: string;
    likeCount: number;
}

interface UserProfileProps {
    nickname?: string;
    profileImageUrl?: string;
    introduction?: string;
    username: string;
    uuid: string;
}

const IntroPage = () => {
    const params = useParams();
    const uuid = params.uuid as string;
    const [userIntro, setUserIntro] = useState<UserProfileProps | null>(null);
    const [directories, setDirectories] = useState<DirectoryWithRecipesResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("IntroPage uuid=", uuid);

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
                setUserIntro(data);
                setDirectories(data.dirs);
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
            {directories&&<IntroRecipes dirs={directories} />}
        </div>
    );
};

export default IntroPage;
