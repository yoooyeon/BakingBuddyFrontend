"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/app/constants";
import { Card, CardContent } from "@/components/ui/card";
import styles from "@/css/recipe-card.module.css";
import Link from "next/link";
import Badge from "@/app/_components/badge";
import UserProfileSmall from "@/app/_components/user/user-profile-small";

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

const HomePage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/feed?cursor=${recipes.length}`, {
                withCredentials: true,
            });
            const fetchedRecipes: Recipe[] = response.data.data;

            setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);

            if (fetchedRecipes.length === 0) {
                setHasMore(false);
            }
        } catch (error:any) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    const lastRecipeElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchRecipes();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <div className="bg-gray-100 text-gray-900">
            <main className="container mx-auto py-8 md:py-12">
                <section>
                    <div className="mt-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {recipes.map((recipe, index) => (
                                <div
                                    key={recipe.id}
                                    ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
                                >
                                    <Card className={styles.card}>
                                        <Link href={`/recipes/${recipe.id}`} prefetch={false}>
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
                                                            imageSrc="/image/blank-heart.png"
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                    <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                                    <p className={styles.description}>{recipe.description}</p>
                                    <UserProfileSmall
                                        img={recipe.writer.profileImageUrl}
                                        username={recipe.writer.username}
                                        uuid={recipe.writer.uuid}
                                    />
                                </div>
                            ))}
                        </div>
                        {loading && <p>Loading more recipes...</p>}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
