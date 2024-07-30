import React, { useState, useCallback } from 'react';
import styles from '../../../css/form.module.css';

const IngredientList: React.FC<{
    ingredients: string[],
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ ingredients, setIngredients }) => {
    const [ingredientInput, setIngredientInput] = useState<string>('');

    // 중복 호출 방지
    const addIngredient = useCallback(() => {
        if (ingredientInput.trim() !== '') {
            setIngredients(prevIngredients => {
                if (!prevIngredients.includes(ingredientInput.trim())) {
                    return [...prevIngredients, ingredientInput.trim()];
                }
                return prevIngredients;
            });
            setIngredientInput('');
        }
    }, [ingredientInput, setIngredients]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault(); // Prevent form submission
            addIngredient();
        }
    };

    return (
        <div className={styles.inputGroup}>
            <label htmlFor="ingredientList" className={styles.label}>재료</label>
            <div>
                <input
                    type="text"
                    id="ingredientsInput"
                    placeholder="재료를 입력하세요"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={styles.input}
                />
                {/* <button type="button" onClick={addIngredient}>
                    추가
                </button> */}
            </div>
            <div id="ingredientList" className="mt-2">
                {ingredients.map((ingredient, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2">
                        #{ingredient}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default IngredientList;
