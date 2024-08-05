import React, { useState, useEffect } from 'react';
import styles from '@/css/form.module.css';
import { API_URL } from '@/app/constants';

interface Ingredient {
    name: string;
    amount: number;
    unitDisplayName: string;
}

const IngredientEditList: React.FC<{
    ingredients: Ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}> = ({ ingredients, setIngredients }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ingredientInput, setIngredientInput] = useState({
        name: '',
        amount: 0,
        unitDisplayName: '',
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

    const handleEditChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIngredients(prevIngredients =>
            prevIngredients.map((ingredient, i) =>
                i === index ? { ...ingredient, [name]: name === 'amount' ? Number(value) : value } : ingredient
            )
        );
    };

    const addIngredient = () => {
        if (ingredientInput.name.trim() !== '' && ingredientInput.unitDisplayName.trim() !== '') {
            setIngredients(prevIngredients => [
                ...prevIngredients,
                ingredientInput,
            ]);
            setIngredientInput({ name: '', amount: 0, unitDisplayName: '' });
        }
    };

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
                        name="unitDisplayName"
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
                    <div key={index} className={styles.inlineInputs}>
                        <input
                            type="text"
                            name="name"
                            value={ingredient.name}
                            onChange={(e) => handleEditChange(index, e)}
                            className={`${styles.input} ${styles.inlineInput} ${styles.flex6}`}
                        />
                        <input
                            type="number"
                            name="amount"
                            value={ingredient.amount}
                            onChange={(e) => handleEditChange(index, e)}
                            className={`${styles.input} ${styles.inlineInput} ${styles.flex2}`}
                        />
                        <select
                            name="unitDisplayName"
                            value={ingredient.unitDisplayName}
                            onChange={(e) => handleEditChange(index, e)}
                            className={`${styles.input} ${styles.inlineInput} ${styles.flex2}`}
                        >
                            <option value="">단위 선택</option>
                            {units.map((unit, i) => (
                                <option key={i} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                        <button className={styles.deleteButton} onClick={() => removeIngredient(index)}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientEditList;
