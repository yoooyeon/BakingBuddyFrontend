import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { API_URL } from '@/app/constants';

interface RecipeDetailsProps {
  recipe: {
    id: string;
    name: string;
    username: string;
    likeCount: number;
    recipeImageUrl: string;
    time: number;
    level: string;
    profileImageUrl?: string;
    userLiked?: boolean;
    servings: number;
    videoId?: string; // This should be the YouTube video URL
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const {
    id,
    name,
    username,
    likeCount,
    recipeImageUrl,
    time,
    level,
    profileImageUrl,
    userLiked = false,
    videoId,
  } = recipe;

  const [liked, setLiked] = useState(userLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  // Convert YouTube video URL to embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Like button click handler
  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/likes/recipes/${id}`, {
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      setLiked(!liked);
      setCurrentLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <img src={recipeImageUrl} alt="Dish" className="w-full h-64 object-cover rounded-t-lg" />
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{name}</h2>

          <div className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
            <span>작성자: {username}</span>
            <Avatar className="h-8 w-8 border">
              {profileImageUrl ? (
                  <AvatarImage src={profileImageUrl} alt="User profile"/>
              ) : (
                  <AvatarFallback>AB</AvatarFallback>
              )}
            </Avatar>
            <span>·</span>
            <button onClick={handleLikeClick} className="flex items-center space-x-1">
              <img
                  src={liked ? '/image/red-heart.png' : '/image/blank-heart.png'}
                  alt="Like icon"
                  className="h-5 w-5 cursor-pointer"
              />
              <span>{currentLikeCount}</span>
            </button>
            <span>·</span>
            <span>{time}분</span>
            <span>·</span>
            <span>{level}</span>
          </div>
        </div>
      </div>
  );
};

export default RecipeDetails;
