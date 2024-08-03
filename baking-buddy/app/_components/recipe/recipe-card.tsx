import { useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/app/constants';

interface RecipeResponseDto {
  id: number;
  name: string;
  description: string;
  recipeImageUrl: string;
  time: number;
  level: string;
  likeCount: number;
}

const RecipeCard = ({ recipe }: { recipe: RecipeResponseDto; }) => {


  return (
    <div className="border-2 border-black-500 m-2 p-2">
      <Link href={`/recipes/${recipe.id}`} prefetch={false}>
        <img
            src={recipe.recipeImageUrl}
            alt={recipe.name}
            className="w-full h-32 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-bold">{recipe.name}</h3>
        <p className="text-gray-600 ">{recipe.description}</p>
        <p className="text-sm text-gray-500">Time: {recipe.time} mins | Level: {recipe.level}</p>
        <p className="text-sm text-gray-500">Likes: {recipe.likeCount}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
