"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Badge from "@/app/_components/badge";
import UserProfileSmall from "@/app/_components/user/user-profile-small";
import styles from "@/css/recipe-card.module.css";
import axios from "axios";
import {API_URL} from "@/app/constants";
import {parseCookies} from "nookies";

interface Ingredient {
    name: string;
    amount: string;
}

interface RecipeStep {
    stepNumber: number;
    instruction: string;
}

interface Tag {
    name: string;
}
interface Writer{
    uuid: string,
    username:string,
    profileImageUrl:string,
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
const RecipePage=()=>{
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const recipesPerPage = 4;
    const blankHeartImgPath = "/image/blank-heart.png";

    // useEffect(() => {
    //     const cookies = parseCookies();
    //     const token = cookies.accessToken;
    //     if (!token) {
    //         router.push('/login');
    //     }
    // }, [router]);

    useEffect(() => {
        axios.get(`${API_URL}/api/recipes`, {
            withCredentials: true
        })
            .then((response) => {
                const fetchedRecipes: Recipe[] = response.data.data;
                setRecipes(Array.isArray(fetchedRecipes) ? fetchedRecipes : []);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
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


    return (
        <div className="bg-gray-100 text-gray-900">
            <main className="container mx-auto py-8 md:py-12">
                <section>
                    {/* Main Recipe */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <img
                                src="/image/kimbab.png"
                                alt="Main Recipe"
                                className="w-full h-auto max-h-96 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start p-4">
                            <h2 className="text-2xl font-bold mb-4">Main Recipe Title</h2>
                            <p className="text-lg mb-6">This is a brief description of the main recipe. It includes key highlights and features of the dish.</p>
                            <div className="text-gray-700">
                                <p className="mb-2">Ingredients: Lorem ipsum, dolor sit amet, consectetur adipiscing elit.</p>
                                <p className="mb-2">Tags: #tag1, #tag2, #tag3</p>
                                <p className="mb-2">Time: 30분</p>
                                <p className="mb-2">Level: 중급</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Latest Recipes</h2>

                        {/* Other Recipes */}
                        <div className="relative">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <button onClick={handlePreviousPage} disabled={currentPage === 0} className="flex items-center">
                                    <ArrowLeftIcon className="h-6 w-6"/>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {recipes.slice(currentPage * recipesPerPage, (currentPage + 1) * recipesPerPage).map((recipe) => (
                                    <div key={recipe.id}>
                                        <Card className={styles.card}>
                                            <Link href={`/recipes/${recipe.id}`} prefetch={false}>
                                                <CardContent className={styles.cardContent}>
                                                    <div className="relative">
                                                        <img
                                                            src={recipe.recipeImageUrl}
                                                            alt={recipe.name}
                                                            className={styles.img}
                                                        />
                                                        <div
                                                            className="absolute top-2 left-2 flex flex-inline space-y-1">
                                                            <Badge name={`${recipe.time} 분`}/>
                                                            <Badge name={recipe.level}/>

                                                        </div>
                                                        <div
                                                            className="absolute bottom-2 right-2 flex flex-col space-y-1">
                                                            <Badge name={`${recipe.likeCount}`}
                                                                   imageSrc={blankHeartImgPath}/>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Link>
                                        </Card>
                                        <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                                        <p className={styles.description}>{recipe.description}</p>
                                        <UserProfileSmall img={recipe.writer.profileImageUrl} username={recipe.writer.username} uuid = {recipe.writer.uuid}/>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <button onClick={handleNextPage} disabled={(currentPage + 1) * recipesPerPage >= recipes.length} className="flex items-center">
                                    <ArrowRightIcon className="h-6 w-6"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
export default RecipePage;