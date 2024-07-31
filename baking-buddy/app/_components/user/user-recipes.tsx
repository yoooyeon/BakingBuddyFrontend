"use client"

import { useState, useEffect } from 'react';
import Directory from '../recipe/directory';
import { API_URL } from '@/app/constants';
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

const UserRecipes = () => {
  const [directories, setDirectories] = useState<DirectoryWithRecipesResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/recipes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const data = json.data;
        console.log(data)
        if (Array.isArray(data)) {
          setDirectories(data);
        } else {
          console.error('Unexpected data format:', data);
          setDirectories([]);
        }
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div >
      {/* <div className={styles.directoryGrid}> */}

        {directories.map((directory) => (
          <Directory key={directory.dirId} directory={directory} />
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
