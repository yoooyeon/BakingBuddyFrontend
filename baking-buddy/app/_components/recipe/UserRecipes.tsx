"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Directory from './Directory';

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
  const router = useRouter();
  const userId = "1"; // Hardcoded for example purposes, replace with actual user ID logic

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/recipes/users/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("Fetched data:", data); // Log the fetched data to check its structure
          // Ensure the data is an array
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
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
      {directories.map((directory) => (
        <Directory key={directory.dirId} directory={directory} />
      ))}
    </div>
  );
};

export default UserRecipes;
