"use client";
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Tag from '@/app/_components/recipe/tag';
import { API_URL } from '@/app/constants';
import styles from "../../../../css/form.module.css";

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
  ingredients: { name: string; amount: string; unitDisplayName: string }[];
  recipeSteps: { stepNumber: string; stepImage: string; description: string }[];
  tags: { name: string }[];
  servings: number;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!recipe) {
      console.error('No recipe data available for deletion');
      return;
    }

    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`${API_URL}/api/recipes/${recipe.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (response.ok) {
          // onDelete(recipe.id); // 성공 시 삭제 후 처리
        } else {
          console.error('Failed to delete recipe');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  useEffect(() => {
    if (!recipeId) return;

    async function fetchRecipe() {
      try {
        const response = await fetch(`${API_URL}/api/recipes/${recipeId}`, {
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
        console.log(data)
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

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
          <IngredientsTable ingredients={recipe.ingredients || []} servings={recipe.servings} />

        </Suspense>
        <Suspense fallback={<h1>Loading steps...</h1>}>
          <RecipeSteps steps={recipe.recipeSteps || []} />
        </Suspense>
        <Suspense fallback={<h1>Loading tags...</h1>}>
          {recipe.tags.map((tag, index) => (
              <Tag key={index} name={tag.name} />
          ))}
        </Suspense>
        <div className={styles.buttonContainer}>
          <Link href={`/recipes/${recipeId}/edit`}>
            <button className={styles.button}>Edit Recipe</button>
          </Link>
          <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={styles.button}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
  );
}
