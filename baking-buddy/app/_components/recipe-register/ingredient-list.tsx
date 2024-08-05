import React, { useState, useCallback, useEffect } from 'react';
import styles from '@/css/form.module.css';
import { API_URL } from '@/app/constants';

interface Ingredient {
    name: string;
    amount: number;
    unitDisplayName: string;
}

const IngredientList: React.FC<{
    ingredients: Ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}> = ({ ingredients, setIngredients }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ingredientInput, setIngredientInput] = useState({
        name: '',
        amount: 0,
        unitDisplayName: '',  // 이 필드가 유닛을 위한 것입니다.
    });
    const [units, setUnits] = useState<string[]>([]);

    useEffect(() => {
        async function fetchUnits() {
            try {
                const response = await fetch(`${API_URL}/api/ingredients/units`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const data = json.data;
                console.log(data)
                setUnits(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchUnits();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIngredientInput(prev => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value,
        }));
    };

    const addIngredient = useCallback(() => {
        if (ingredientInput.name.trim() !== '' && ingredientInput.unitDisplayName.trim() !== '') {
            setIngredients(prevIngredients => [
                ...prevIngredients,
                ingredientInput,
            ]);
            setIngredientInput({ name: '', amount: 0, unitDisplayName: '' });
        }
    }, [ingredientInput, setIngredients]);
    const removeIngredient = (index: number) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.inputGroup}>
            <label htmlFor="ingredientList" className={styles.label}>재료</label>
            <button type="button" className={styles.button} onClick={addIngredient}>
                재료 추가
            </button>
            <div>
                <div className={styles.inlineInputs}>
                    <input
                        type="text"
                        name="name"
                        placeholder="재료"
                        value={ingredientInput.name}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.inlineInput} ${styles.flex6}`}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="양"
                        value={ingredientInput.amount}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.inlineInput} ${styles.flex2}`}
                    />
                    <select
                        name="unitDisplayName"  // name을 unitDisplayName으로 변경
                        value={ingredientInput.unitDisplayName}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.inlineInput} ${styles.flex2}`}
                    >
                        <option value="">단위 선택</option>
                        {units.map((unit, index) => (
                            <option key={index} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div id="ingredientList" className="mt-2">
                {ingredients.map((ingredient, index) => (
                    <span key={index}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2">
                        {ingredient.name} - {ingredient.amount} {ingredient.unitDisplayName}
                        <button className={styles.deleteButton} onClick={() => removeIngredient(index)}>×</button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default IngredientList;
