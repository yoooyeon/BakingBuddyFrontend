// components/RecipeDetails.tsx
import React from 'react';

interface RecipeDetailsProps {
    name: string;
    username: string;
    //   views: number;
    likeCount: number;
    //   comments: number;
    recipeImageUrl: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ name, username, likeCount, recipeImageUrl }) => {
    return (
        <div className="p-4 bg-white">
            <img src={recipeImageUrl} alt="Dish" className="w-24 h-24 object-cover" />
            <h2 className="mt-4 text-xl font-bold">{name}</h2>
            <div className="flex items-center mt-2 space-x-2 text-sm text-muted-foreground">
                <span>작성자: {username}</span>
                <span>·</span>
                <span>조회수: </span>
                <span>·</span>
                <span>좋아요: {likeCount}</span>
           
            </div>
        </div>
    );
};

export default RecipeDetails;
