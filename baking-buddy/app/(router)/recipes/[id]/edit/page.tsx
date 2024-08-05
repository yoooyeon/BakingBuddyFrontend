"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import styles from '@/css/form.module.css';
import { API_URL } from '@/app/constants';
import DirectorySelect from "@/app/_components/recipe-register/directory-select";
import IngredientEditList from "@/app/_components/recipe-edit/ingredient-edit-list";
import RecipeStepEdit from "@/app/_components/recipe-edit/recipe-step-edit";
import TagList from "@/app/_components/recipe-register/tag-list";

interface RecipeStep {
    stepNumber: number;
    description: string;
    stepImage: File | null;
}

interface Ingredient {
    name: string;
    amount: number;
    unitDisplayName: string;
}

export default function RecipeEditPage() {
    const params = useParams();
    const recipeId = params.id as string;

    const [name, setName] = useState('');
    const [dirId, setDirId] = useState('');
    const [description, setDescription] = useState('');
    const [openYn, setOpenYn] = useState('Y'); // 기본값 설정
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);
    const [time, setTime] = useState('');
    const [level, setLevel] = useState('Easy'); // 기본값 설정
    const [tags, setTags] = useState<string[]>([]);
    const [recipeImage, setRecipeImage] = useState<File | null>(null);
    const [servings, setServings] = useState('');
    const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>(null); // Add state for image URL

    useEffect(() => {
        let objectUrl: string | null = null;

        async function fetchRecipe() {
            try {
                const response = await fetch(`${API_URL}/api/recipes/${recipeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();
                const data = json.data;

                // Populate form fields with existing data
                setName(data.name);
                setDirId(data.dirId);
                setDescription(data.description);
                setOpenYn(data.openYn);
                setIngredients(data.ingredients);
                setRecipeSteps(data.recipeSteps);
                setTime(data.time.toString());
                setLevel(data.level);
                setTags(data.tags.map((tag: { name: string }) => tag.name));
                setServings(data.servings);

                if (data.recipeImageUrl) {
                    setRecipeImageUrl(data.recipeImageUrl);
                }

            } catch (err) {
                console.error('Error fetching recipe:', err);
            }
        }

        if (recipeId) {
            fetchRecipe();
        }

        // Clean up object URL if any
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [recipeId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const recipeData = {
            name,
            dirId,
            description,
            openYn,
            ingredients,
            time: Number(time),
            level,
            tags,
            servings,
        };

        const formData = new FormData();
        formData.append('recipe', new Blob([JSON.stringify(recipeData)], { type: 'application/json' }));
        if (recipeImage) {
            console.log("recipeImage:",recipeImage)
            formData.append('recipeImage', recipeImage, recipeImage.name);
        }
        try {

            const response = await fetch(`${API_URL}/api/recipes/${recipeId}/edit`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("responseData",responseData)
            // Handle steps update
            for (const step of recipeSteps) {
                const stepFormData = new FormData();
                stepFormData.append('stepNumber', step.stepNumber.toString());
                stepFormData.append('description', step.description);
                if (step.stepImage) {
                    stepFormData.append('stepImage', step.stepImage, step.stepImage.name);
                }

                const stepResponse = await fetch(`${API_URL}/api/recipes/${recipeId}/steps/${step.stepNumber}`, {
                    method: 'PUT',
                    credentials: 'include',
                    body: stepFormData,
                });

                if (!stepResponse.ok) {
                    throw new Error('Failed to update step');
                }
            }

            alert('Recipe updated successfully!'); // Provide user feedback

        } catch (error) {
            console.error('Error updating recipe or steps:', error);
            alert('Error updating recipe. Please try again.'); // Provide user feedback
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setRecipeImage(file);
        if (file) {
            // Clean up previous object URL if any
            if (recipeImageUrl) {
                URL.revokeObjectURL(recipeImageUrl);
            }
            const objectUrl = URL.createObjectURL(file);
            setRecipeImageUrl(objectUrl);
        }
    };

    return (
        <form id="recipeForm" className={styles.form} onSubmit={handleSubmit}>
            <DirectorySelect setDirId={setDirId} selectedDirId={dirId}/>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>레시피 이름</label>
                <input type="text" className={styles.input} id="name" name="name" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="recipeImage" className={styles.label}>레시피 이미지 업로드</label>
                <div className={styles.imageContainer}>
                    {recipeImageUrl && (
                        <img src={recipeImageUrl} alt="Recipe" className={styles.profileImageBig}/>
                    )}
                    <input type="file" className={styles.input} id="recipeImage" name="recipeImage"
                           onChange={handleImageChange}/>
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>요리 설명</label>
                <textarea className={styles.input} id="description" name="description" rows={4} value={description}
                          onChange={(e) => setDescription(e.target.value)}></textarea>
                <div id="charCount">{description.length} 글자</div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="servings" className={styles.label}>기준 인분</label>
                <input type="number" className={styles.input} id="servings" name="servings" value={servings}
                       onChange={(e) => setServings(e.target.value)}/>
            </div>
            <IngredientEditList ingredients={ingredients} setIngredients={setIngredients}/>
            <RecipeStepEdit setRecipeSteps={setRecipeSteps} recipeSteps={recipeSteps}/>
            <TagList tags={tags} setTags={setTags}/>
            <div className={styles.inputGroup}>
                <label htmlFor="time" className={styles.label}>소요시간(분 단위)</label>
                <input type="number" className={styles.input} id="time" name="time" value={time}
                       onChange={(e) => setTime(e.target.value)}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="level" className={styles.label}>난이도</label>
                <select className={styles.input} id="level" name="level" value={level}
                        onChange={(e) => setLevel(e.target.value)}>
                    <option value="Easy">쉬움</option>
                    <option value="Medium">보통</option>
                    <option value="Hard">어려움</option>
                </select>
            </div>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>수정하기</button>
        </form>
    );
}
