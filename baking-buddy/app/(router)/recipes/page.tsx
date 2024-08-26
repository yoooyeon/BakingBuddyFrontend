"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/app/_components/badge";
import UserProfileSmall from "@/app/_components/user/user-profile-small";
import styles from "@/css/recipe-card.module.css";
import axios from "axios";
import { API_URL, EVENT_SERVER_URL } from "@/app/constants";
import MainRecipe from "@/app/_components/main/main-recipe";

interface Ingredient {
    name: string;
    amount: number | '';

}

interface RecipeStep {
    stepNumber: number;
    instruction: string;
}

interface Tag {
    name: string;
}

interface Writer {
    uuid: string;
    username: string;
    profileImageUrl: string;
}

interface Recipe {
    name: string;
    dirId: number;
    id: number;
    userId: string;
    description: string;
    username: string;
    profileImageUrl: string;
    openYn: boolean;
    ingredients: Ingredient[];
    recipeSteps: RecipeStep[];
    tags: Tag[];
    recipeImageUrl: string;
    time: number;
    level: string;
    likeCount: number;
    userLiked: boolean;
    writer: Writer;
}

const RecipePage = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [mainRecipes, setMainRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const recipesPerPage = 4;
    const blankHeartImgPath = "/image/blank-heart.png";

    useEffect(() => {
        const fetchMainRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/api/main/recipes`, {
                    withCredentials: true,
                });
                setMainRecipes(response.data.data || []);
            } catch (error) {
                console.error("Error fetching main recipes:", error);
                setError("Failed to load main recipes.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/api/recipes`, {
                    withCredentials: true,
                });
                setRecipes(response.data.data || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Failed to load recipes.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMainRecipes();
        fetchRecipes();
    }, []);

    const handleNextPage = () => {
        if ((currentPage + 1) * recipesPerPage < recipes.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const recordClick = async (id: number, clickType: string) => {
        console.log(`Sending click event: ${id}, ${clickType}`);
        try {
            await axios.post(
                `${EVENT_SERVER_URL}/api/click`,
                {
                    id: id,
                    clickType: clickType,
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.error("Error recording click:", error);
        }
    };

    const handleCardClick = (id: number) => {
        recordClick(id, "RECIPE");
        router.push(`/recipes/${id}`);
    };

    return (
        <div className="bg-gray-100 text-gray-900">
            <main className="container mx-auto py-8 md:py-12">
                <section>
                    {/* Main Recipe */}
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : mainRecipes.length > 0 ? (
                        <MainRecipe recipes={mainRecipes} />
                    ) : (
                        <div>No Main Recipes Available</div>
                    )}

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">최근 레시피</h2>
                        <div className="relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                    className="flex items-center"
                                    aria-label="Previous Page"
                                >
                                    <ArrowLeftIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {recipes
                                    .slice(
                                        currentPage * recipesPerPage,
                                        (currentPage + 1) * recipesPerPage
                                    )
                                    .map((recipe) => (
                                        <div key={recipe.id}>
                                            <Card
                                                className={styles.card}
                                                onClick={() => handleCardClick(recipe.id)}
                                            >
                                                <CardContent className={styles.cardContent}>
                                                    <div className="relative">
                                                        <img
                                                            src={recipe.recipeImageUrl}
                                                            alt={recipe.name}
                                                            className={styles.img}
                                                        />
                                                        <div className="absolute top-2 left-2 flex flex-inline space-y-1">
                                                            <Badge name={`${recipe.time} 분`} />
                                                            <Badge name={recipe.level} />
                                                        </div>
                                                        <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
                                                            <Badge
                                                                name={`${recipe.likeCount}`}
                                                                imageSrc={blankHeartImgPath}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {recipe.name}
                                            </h3>
                                            <p className={styles.description}>{recipe.description}</p>
                                            <UserProfileSmall
                                                img={recipe.writer.profileImageUrl}
                                                username={recipe.writer.username}
                                                uuid={recipe.writer.uuid}
                                            />
                                        </div>
                                    ))}
                            </div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <button
                                    onClick={handleNextPage}
                                    disabled={
                                        (currentPage + 1) * recipesPerPage >= recipes.length
                                    }
                                    className="flex items-center"
                                    aria-label="Next Page"
                                >
                                    <ArrowRightIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">인기 레시피</h2>
                        {/* Additional code for popular recipes */}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                            내가 팔로우 한 에디터의 레시피
                        </h2>
                        {/* Additional code for followed editor's recipes */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RecipePage;
