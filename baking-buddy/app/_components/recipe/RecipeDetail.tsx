// components/RecipeDetails.tsx
import React from 'react';

interface RecipeDetailsProps {
  recipe: {
    name: string;
    username: string;
    likeCount: number;
    recipeImageUrl: string;
    time: number;
    level: string;
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const { name, username, likeCount, recipeImageUrl, time, level } = recipe;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img src={recipeImageUrl} alt="Dish" className="w-full h-64 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
          <span>작성자: {username}</span>
          <span>·</span>
          <span>좋아요: {likeCount}</span>
          <span>·</span>
          <span>소요시간: {time}분</span>
          <span>·</span>
          <span>난이도: {level}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
