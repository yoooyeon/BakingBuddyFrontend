// IngredientList.tsx
import React, { useState } from 'react';
import styles from '../../../css/form.module.css';

const IngredientList: React.FC<{
    ingredients: string[],
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>
}>
    = ({ ingredients, setIngredients }) => {
        const [ingredientInput, setIngredientInput] = useState<string>('');

        const addIngredient = () => {
            if (ingredientInput.trim() !== '') {
                setIngredients([...ingredients, ingredientInput]);
                setIngredientInput('');
            }
        };

        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === ',') {
                addIngredient();
                event.preventDefault(); // Prevent form submission
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
                    />
                    <button type="button" onClick={addIngredient}>
                        추가
                    </button>
                </div>
                <div id="ingredientList">
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>{ingredient}</div>
                    ))}
                </div>
            </div>
        );
    };

export default IngredientList;
