"use client";
import React, { useState } from 'react';
import DirectorySelect from './DirectorySelect';
import IngredientList from './IngredientList';
import RecipeStepForm from './RecipeStepForm';
import TagList from './TagList';
import styles from '../../../css/form.module.css';

interface RecipeStep {
    stepNumber: number;
    description: string;
    stepImage: File | null;
}

export default function RecipeForm() {
    const [name, setName] = useState('');
    const [dirId, setDirId] = useState('');
    const [userId, setUserId] = useState('1'); // 유저 ID는 실제 값으로 설정해야 합니다.
    const [description, setDescription] = useState('');
    const [openYn, setOpenYn] = useState('Y'); // 기본값 설정
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);
    const [time, setTime] = useState('');
    const [level, setLevel] = useState('Easy'); // 기본값 설정
    const [tags, setTags] = useState<string[]>([]);
    const [recipeImage, setRecipeImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const recipeData = {
            name,
            dirId: Number("1"),
            userId: Number("1"),
            // userId: Number(userId),
            description,
            openYn,
            ingredients,
            recipeSteps: recipeSteps.map((step) => ({
                stepNumber: step.stepNumber,
                description: step.description,
                // stepImage는 제외하고 전송
            })),
            time: Number(time),
            level,
            tags,
        };

        const formData = new FormData();
        formData.append('recipe', new Blob([JSON.stringify(recipeData)], { type: 'application/json' }));
        if (recipeImage) {
            formData.append('recipeImage', recipeImage, recipeImage.name);
        }

        // FormData 내용 콘솔에 출력
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const response = await fetch('http://localhost:8080/api/recipes', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Recipe successfully created', responseData);
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    return (
        <form id="recipeForm" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.hiddenInput}>
                <label htmlFor="userId" className={styles.label}>User ID</label>
                <input type="text" className={styles.input} id="userId" name="userId" value={userId} readOnly />
            </div>
            <DirectorySelect setDirId={setDirId} />
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>레시피 이름</label>
                <input type="text" className={styles.input} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="recipeImage" className={styles.label}>레시피 이미지 업로드</label>
                <div className={styles.imageContainer}>
                    <input type="file" className={styles.fileInput} id="recipeImage" name="recipeImage" onChange={(e) => setRecipeImage(e.target.files ? e.target.files[0] : null)} />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>요리 설명</label>
                <textarea className={styles.input} id="description" name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div id="charCount" className={styles.charCount}>{description.length} 글자</div>
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
