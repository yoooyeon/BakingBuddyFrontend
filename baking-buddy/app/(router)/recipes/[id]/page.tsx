"use client";
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'next/navigation';

const RecipeDetails = lazy(() => import('@/app/_components/recipe/RecipeDetail'));
const IngredientsTable = lazy(() => import('@/app/_components/recipe/IngredientsTable'));
const RecipeSteps = lazy(() => import('@/app/_components/recipe/RecipeSteps'));
// const Reviews = lazy(() => import('@/app/_components/recipe/Reviews'));

interface Recipe {
  name: string;
  username: string;
  // views: number;
  likeCount: number;
  level: string;
  userLiked: boolean;
  // comments: number;
  time: number;
  recipeImageUrl: string;
  ingredients: { name: string; amount: string }[];
  recipeSteps: { step: string; imageUrl: string }[];
  // reviews: { username: string; avatarUrl: string; rating: number; comment: string; timeAgo: string }[];
}

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) return;

    async function fetchRecipe() {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // 쿠키를 요청에 포함시킴
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const data = json.data;
        console.log(data);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]); // recipeId가 변경될 때만 실행

  useEffect(() => {
    console.log("recipeId:", recipeId);
  }, [recipeId]); // recipeId가 제대로 설정되는지 확인

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe data available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Suspense fallback={<h1>Loading recipe details...</h1>}>
        <RecipeDetails recipe={recipe} />
      </Suspense>
      <Suspense fallback={<h1>Loading ingredients...</h1>}>
        <IngredientsTable ingredients={recipe.ingredients || []} />
      </Suspense>
      <Suspense fallback={<h1>Loading steps...</h1>}>
        <RecipeSteps steps={recipe.recipeSteps || []} />
      </Suspense>
      {/* <Suspense fallback={<h1>Loading reviews...</h1>}>
        <Reviews reviews={recipe.reviews || []} />
      </Suspense> */}
    </div>
  );
}
