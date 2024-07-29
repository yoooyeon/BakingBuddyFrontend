"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { API_URL } from './constants';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

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

export default function Component() {
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    console.log(token)
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/recipes`)
      .then((response) => {
        const { latestRecipes }: { latestRecipes: Recipe[] } = response.data;
        setLatestRecipes(Array.isArray(latestRecipes) ? latestRecipes : []);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto py-8 md:py-12">
        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {latestRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <Link href={`/recipes/${recipe.id}`} prefetch={false}>
                  <CardContent>
                    <img
                      src={recipe.recipeImageUrl}
                      alt={recipe.name}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold">{recipe.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <StarIcon className="h-5 w-5" />
                          <span>{recipe.likeCount}</span>
                        </div>
                        <span className="text-muted-foreground">({recipe.likeCount} likes)</span>
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
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
