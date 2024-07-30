"use client"
import { API_URL } from '@/app/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
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
  
  interface Recipe {
    name: string;
    dirId: number;
    id: number;
    userId: number;
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
  }
const SearchPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const term = searchParams.get('term') || '';
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (term) {
                try {
                    const response = await axios.get(`${API_URL}/api/search/recipes?term=${term}`, {
                        withCredentials: true,
                    });
                    // const data = response.data.data;
                    const recipes: Recipe[] = response.data.data;

                    setRecipes(Array.isArray(recipes) ? recipes : []);
                    
                    // setResults(recipes);
                } catch (err) {
                    console.error("Failed to fetch search results", err);
                }
            }
        };

        fetchResults();
    }, [term]);

    return (
        <div className="bg-gray-100 text-gray-900">
          <main className="container mx-auto py-8 md:py-12">
            <section>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <Link href={`/recipes/${recipe.id}`} prefetch={false}>
                      <CardContent>
                        <img
                          src={recipe.recipeImageUrl}
                          alt={recipe.name}
                          width={400}
                          height={300}
                          className="h-48 w-full object-cover rounded-t-lg"
                        />
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center space-x-4"> {/* 변경된 부분 */}
                            <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                            <div className="flex items-center space-x-1 text-red-500">
                              <img src="/image/red-heart.png" className="h-4 w-4" />
                              <span>{recipe.likeCount}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{recipe.description}</p>
                          <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
                            <div className="bg-gray-200 px-2 py-1 rounded">{recipe.level}</div>
                            <div className="bg-gray-200 px-2 py-1 rounded">{recipe.time}분</div>
                            <div className="bg-gray-200 px-2 py-1 rounded">작성자: {recipe.username}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          </main>
        </div>
      );
};

export default SearchPage;
