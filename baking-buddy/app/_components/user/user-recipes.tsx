"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Directory from '../recipe/Directory';
// import directory from '../recipe/directory';

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
          const response = await fetch(`http://localhost:8080/api/users/recipes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키를 요청에 포함시키기 위한 설정
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          const data = json.data;
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
    <div className="container mx-auto p-4 m-4">
      {directories.map((directory) => (
        <Directory key={directory.dirId} directory={directory} />
      ))}
    </div>
  );
};

export default UserRecipes;
