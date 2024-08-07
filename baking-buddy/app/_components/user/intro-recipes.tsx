"use client";

import { useState, useEffect } from 'react';
import Directory from '../recipe/directory';
import styles from '@/css/directory-recipe.module.css';
import DirectoryCarousel from "@/app/_components/recipe/directory-carousel";

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

interface IntroRecipesProps {
    dirs: DirectoryWithRecipesResponseDto[];
}

const IntroRecipes: React.FC<IntroRecipesProps> = ({ dirs }) => {
    const [directories, setDirectories] = useState<DirectoryWithRecipesResponseDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDirectories(dirs);
        setLoading(false);
    }, [dirs]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {directories.length === 0 ? (
                <div>레시피가 없습니다</div>
            ) : (
                <div>
                    {directories.map((directory) => (
                        <DirectoryCarousel key={directory.dirId} directory={directory} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IntroRecipes;
