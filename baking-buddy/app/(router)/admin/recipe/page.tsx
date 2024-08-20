"use client";

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {API_URL} from "@/app/constants";
import MainRecipeAdmin from "@/app/_components/admin/recipe/main-recipes-admin";
import MainRecipe from "@/app/_components/main/main-recipe";

interface SelectUserResponseDto {
    username: string;
    nickname: string;
}

interface Writer {
    uuid: string,
    username: string,
    profileImageUrl: string,
}

interface Recipe {
    name: string;
    dirId: number;
    recipeId: string;
    mainRecipeId: string;
    userId: string;
    description: string;
    username: string;
    profileImageUrl: string;
    openYn: boolean;
    recipeImageUrl: string;
    time: number;
    level: string;
    likeCount: number;
    current: boolean;
    userLiked: boolean;
    writer: Writer;
}

const AdminRecipePage = () => {
    const [mainRecipes, setMainRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchMainRecipeCandidates() {
            try {
                const response = await axios.get(`${API_URL}/api/admin/main`, {
                    withCredentials: true
                });
                const json = response.data;
                const data = json.data;
                setMainRecipes(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching setMainRecipes requests:', error);
            }
        }

        fetchMainRecipeCandidates();
    }, []);

    const handleSetMain = async (mainRecipeId: string, recipeId: string) => {
        try {
            await fetch(`${API_URL}/api/admin/main/${mainRecipeId}/recipes/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            setMainRecipes(prev =>
                prev.map(recipe =>
                    recipe.recipeId === recipeId ? { ...recipe, current: true } : recipe
                )
            );
        } catch (error) {
            console.error('Error approving authority request:', error);
        }
    };
    const handleUnSetMain = async (mainRecipeId: string, recipeId: string) => {
        try {
            await fetch(`${API_URL}/api/admin/main/${mainRecipeId}/recipes/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            setMainRecipes(prev =>
                prev.map(recipe =>
                    recipe.recipeId === recipeId ? { ...recipe, current: false } : recipe
                )
            );

        } catch (error) {
            console.error('Error approving authority request:', error);
        }
    };
    return (
        <div>
            {mainRecipes && mainRecipes.length > 0 ? (
                <MainRecipeAdmin mainRecipes={mainRecipes} onSetMain={handleSetMain} unSetMain={handleUnSetMain}/>
            ) : (<div></div>)}
        </div>
    )
};

export default AdminRecipePage;
