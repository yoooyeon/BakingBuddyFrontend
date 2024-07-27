import Link from 'next/link';

interface RecipeResponseDto {
  id: number;
  name: string;
  description: string;
  recipeImageUrl: string;
  time: number;
  level: string;
  likeCount: number;
}

const RecipeCard = ({ recipe }: { recipe: RecipeResponseDto }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={recipe.recipeImageUrl}
        alt={recipe.name}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-bold">{recipe.name}</h3>
      <p className="text-gray-600">{recipe.description}</p>
      <p className="text-sm text-gray-500">Time: {recipe.time} mins | Level: {recipe.level}</p>
      <p className="text-sm text-gray-500">Likes: {recipe.likeCount}</p>
      <Link href={`/recipes/${recipe.id}`} prefetch={false} className="text-primary hover:underline">
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
