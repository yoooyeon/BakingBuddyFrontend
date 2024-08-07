"use client";

import { useState } from 'react';
import RecipeCard from './recipe-card';
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

interface DirectoryCarouselProps {
    directory: DirectoryWithRecipesResponseDto;
}

const DirectoryCarousel: React.FC<DirectoryCarouselProps> = ({ directory }) => {
    const [recipes, setRecipes] = useState(directory.recipes);
    const [currentSlide, setCurrentSlide] = useState(0);

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
                credentials: 'include',
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

    const nextSlide = () => {
        if (currentSlide < recipes.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    if (!directory) {
        return null; // directory가 없으면 아무 것도 렌더링하지 않음
    }

    return (
        <div className="relative p-4">
            <h2 className="text-2xl font-bold mb-4">{directory.dirName}</h2>
            {recipes.length === 0 ? (
                <p className="text-gray-500">레시피가 없습니다.</p> // 레시피가 없을 때 메시지
            ) : (
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {recipes.map((recipe) => (
                            <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2" key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                    <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded"
                        onClick={nextSlide}
                        disabled={currentSlide === recipes.length - 1}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default DirectoryCarousel;
