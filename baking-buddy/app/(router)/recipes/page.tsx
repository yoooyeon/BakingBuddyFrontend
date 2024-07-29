import { fetchRecipes } from '@/lib/api';
import RecipeCard from '@/app/_components/recipe/RecipeCard';

interface RecipeResponseDto {
  id: number;
  name: string;
  description: string;
  recipeImageUrl: string;
  time: number;
  level: string;
  likeCount: number;
}

interface PageResponseDto<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

const AllRecipesPage = async () => {
  const page = 0; // 현재 페이지, 예를 들어 0페이지
  const size = 10; // 페이지 당 항목 수

  try {
    const data = await fetchRecipes(page, size);
    const recipes: RecipeResponseDto[] = data.content || [];

    if (!Array.isArray(recipes)) {
      throw new Error('Expected recipes to be an array');
    }

    return (
      <div className="p-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return <p>Failed to load recipes</p>;
  }
};

export default AllRecipesPage;
