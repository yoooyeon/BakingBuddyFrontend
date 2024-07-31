"use client"

import { useState } from 'react';
import RecipeCard from './recipe-card';
import styles from '../../../css/directory-recipe.module.css';

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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
          <div className={styles.recipeGrid}>
            {directory.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Directory;
