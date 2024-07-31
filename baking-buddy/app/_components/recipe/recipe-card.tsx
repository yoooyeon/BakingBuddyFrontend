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

const RecipeCard = ({ recipe, onDelete }: { recipe: RecipeResponseDto; onDelete: (id: number) => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
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
          onDelete(recipe.id); // 성공 시 삭제 후 처리
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

  return (
    <div className="border-2 border-black-500 m-2 p-2">
      <Link href={`/recipes/${recipe.id}`} prefetch={false}>
        <img
          src={recipe.recipeImageUrl}
          alt={recipe.name}
          className="w-full h-32 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-bold">{recipe.name}</h3>
        <p className="text-gray-600">{recipe.description}</p>
        <p className="text-sm text-gray-500">Time: {recipe.time} mins | Level: {recipe.level}</p>
        <p className="text-sm text-gray-500">Likes: {recipe.likeCount}</p>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default RecipeCard;
