import { useState } from 'react';
import RecipeCard from './recipe-card';
import styles from '../../../css/directory-recipe.module.css';
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

interface DirectoryWithRecipesResponseDto {
  dirId: number;
  dirName: string;
  recipes: RecipeResponseDto[];
}

interface DirectoryProps {
  directory: DirectoryWithRecipesResponseDto;
}

const Directory: React.FC<DirectoryProps> = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState(directory.recipes);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // or 'same-origin' depending on your setup
      });

      if (response.ok) {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!directory) {
    return null; // directory가 없으면 아무 것도 렌더링하지 않음
  }

  return (
    <div className={styles.directoryContainer}>
      <div 
        className={`${styles.directoryCard} ${isOpen ? styles.open : ''}`} 
        onClick={toggleOpen}
      >
        <h2 className={styles.directoryTitle}>{directory.dirName}</h2>
      </div>
      {isOpen && (
        <div className={styles.recipeList}>
          {recipes.length === 0 ? (
            <p className="text-gray-500">No recipes available.</p> // 레시피가 없을 때 메시지
          ) : (
            <div className={styles.recipeGrid}>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}  />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Directory;
