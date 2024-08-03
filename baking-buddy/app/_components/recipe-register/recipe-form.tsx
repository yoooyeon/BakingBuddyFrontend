"use client";
import React, { useState } from 'react';
import DirectorySelect from './directory-select';
import IngredientList from './ingredient-list';
import RecipeStepForm from './recipe-step-form';
import TagList from './tag-list';
import styles from '../../../css/form.module.css';
import { API_URL } from '@/app/constants';
import {router} from "next/client";

interface RecipeStep {
    stepNumber: number;
    description: string;
    stepImage: File | null;
}

interface Ingredient {
    name: string,
    amount: number,
    unitDisplayName: string,
}
export default function RecipeForm() {
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const recipeData = {
            name,
            dirId,
            description,
            openYn,
            ingredients,
            time,
            level,
            tags,
            servings,

        };

        const formData = new FormData();
        formData.append('recipe', new Blob([JSON.stringify(recipeData)], { type: 'application/json' }));
        if (recipeImage) {
            formData.append('recipeImage', recipeImage, recipeImage.name);
        }

        try {
            const response = await fetch(`${API_URL}/api/recipes`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const recipeId = responseData.data.id;

            // Now save the steps
            for (const step of recipeSteps) {
                const stepFormData = new FormData();
                stepFormData.append('stepNumber', step.stepNumber.toString());
                stepFormData.append('description', step.description);
                if (step.stepImage) {
                    stepFormData.append('stepImage', step.stepImage, step.stepImage.name);
                }

                const stepResponse = await fetch(`${API_URL}/api/recipes/${recipeId}/steps`, {
                    method: 'POST',
                    credentials: 'include',
                    body: stepFormData,
                });

                if (!stepResponse.ok) {
                    throw new Error('Failed to add step');
                }

                const stepResponseJson = await stepResponse.json();
                const data = stepResponseJson.data
                console.log(data)
                router.push(`/recipes/${data.id}`);

            }

        } catch (error) {
            console.error('Error creating recipe or adding steps:', error);
        }
    };

    return (
        <form id="recipeForm" className={styles.form} onSubmit={handleSubmit}>
            <DirectorySelect setDirId={setDirId} selectedDirId={dirId}/>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>레시피 이름</label>
                <input type="text" className={styles.input} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="recipeImage" className={styles.label}>레시피 이미지 업로드</label>
                <div className={styles.imageContainer}>
                    <input type="file" className={styles.input} id="recipeImage" name="recipeImage" onChange={(e) => setRecipeImage(e.target.files ? e.target.files[0] : null)} />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>요리 설명</label>
                <textarea className={styles.input} id="description" name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div id="charCount" className={styles.charCount}>{description.length} 글자</div>
            </div>
            <div>
                <label> 기준 인분</label>
                <input type="number" className={styles.input}  id="servings" name="servings" value={servings} onChange={(e) => setServings(e.target.value)} ></input>
            </div>
            <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
            <RecipeStepForm setRecipeSteps={setRecipeSteps} />
            <TagList tags={tags} setTags={setTags} />
            <div className={styles.inputGroup}>
                <label htmlFor="time" className={styles.label}>소요시간(분 단위)</label>
                <input type="number" className={styles.input} id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="level" className={styles.label}>난이도</label>
                <select className={styles.input} id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="Easy">쉬움</option>
                    <option value="Medium">보통</option>
                    <option value="Hard">어려움</option>
                </select>
            </div>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>등록하기</button>
        </form>
    );
}
