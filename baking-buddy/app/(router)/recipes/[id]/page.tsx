"use client";
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'next/navigation';
import Tag from '@/app/_components/recipe/tag';
import { API_URL } from '@/app/constants';

const RecipeDetails = lazy(() => import('@/app/_components/recipe/recipe-detail'));
const IngredientsTable = lazy(() => import('@/app/_components/recipe/ingredients-table'));
const RecipeSteps = lazy(() => import('@/app/_components/recipe/recipe-steps'));
interface Recipe {
  id: string;
  name: string;
  username: string;
  likeCount: number;
  level: string;
  userLiked: boolean;
  time: number;
  recipeImageUrl: string;
  profileImageUrl: string;
  ingredients: { name: string; amount: string; unitDisplayName:string }[];
  recipeSteps: { stepNumber: string; stepImage: string; description: string }[];
  tags: { name: string }[];
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
        const response = await fetch(`${API_URL}/api/recipes/${recipeId}`, {
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
      <Suspense fallback={<h1>Loading tags...</h1>}>
        {recipe.tags.map((tag, index) => (
          <Tag key={index} name={tag.name} />
        ))}
      </Suspense>
    </div>
  );
}
