import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // Avatar 컴포넌트의 경로를 확인하고 수정하세요
import { API_URL } from '@/app/constants'; // API_URL을 적절히 설정하세요

interface RecipeDetailsProps {
  recipe: {
    id: string; // Recipe의 고유 ID를 추가
    name: string;
    username: string;
    likeCount: number;
    recipeImageUrl: string;
    time: number;
    level: string;
    profileImageUrl?: string; // profileImageUrl을 선택적으로 설정
    userLiked?: boolean; // userLiked를 선택적으로 설정
    servings: number;
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
    userLiked = false, // userLiked가 없으면 기본값으로 false 사용
      servings,
  } = recipe;

  const [liked, setLiked] = useState(userLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  // 하트 클릭 핸들러
  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/likes/recipes/${id}`, {
        method: liked ? 'DELETE' : 'POST', // 기존 상태에 따라 요청 방법 결정
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // 쿠키를 요청에 포함시킴
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      const json = await response.json();
      // 서버 응답에 따라 상태를 업데이트
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
            <span>{currentLikeCount}</span> {/* 현재 좋아요 수 */}
          </button>
          <span>·</span>
          <span>소요시간: {time}분</span>
          <span>·</span>
          <span>난이도: {level}</span>
          <span>·</span>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
