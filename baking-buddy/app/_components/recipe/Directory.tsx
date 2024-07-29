import RecipeCard from './RecipeCard';

interface RecipeResponseDto {
  id: number;
  name: string;
  description: string;
  recipeImageUrl: string;
  time: number;
  level: string;
  likeCount: number;
  // username: string;
}

interface DirectoryWithRecipesResponseDto {
  dirId: number;
  dirName: string;
  recipes: RecipeResponseDto[];
}

const Directory = ({ directory }: { directory: DirectoryWithRecipesResponseDto }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{directory.dirName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directory.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Directory;
