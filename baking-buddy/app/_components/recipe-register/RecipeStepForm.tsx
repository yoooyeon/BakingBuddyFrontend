import React, { useState } from 'react';
import styles from '../../../css/form.module.css';

interface RecipeStep {
    stepNumber: number;
    description: string;
    stepImage: File | null;
}

const RecipeStepForm: React.FC<{ setRecipeSteps: React.Dispatch<React.SetStateAction<RecipeStep[]>> }> = ({ setRecipeSteps }) => {
    const [steps, setSteps] = useState<RecipeStep[]>([]);
    const [stepDescription, setStepDescription] = useState<string>('');
    const [stepImage, setStepImage] = useState<File | null>(null);

    const addStep = () => {
        if (stepDescription.trim() !== '') {
            const newStep = {
                stepNumber: steps.length + 1,
                description: stepDescription,
                stepImage: stepImage,
            };
            setSteps([...steps, newStep]);
            setStepDescription('');
            setStepImage(null);
            setRecipeSteps([...steps, newStep]);
        }
    };

    return (
        <div>
            <label htmlFor="recipeStepList" className={styles.label}>조리 순서</label>
            <button type="button" className={styles.button} onClick={addStep}>
                단계 추가
            </button>
            <div id="recipeStepList" className={styles.inputGroup}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div>
                            <h5>{`단계 ${index + 1}`}</h5>
                        </div>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    id="stepDescription"
                    placeholder="단계 설명을 입력하세요"
                    value={stepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="file"
                    id="stepImage"
                    onChange={(e) => setStepImage(e.target.files ? e.target.files[0] : null)}
                    className={styles.input}
                />
            </div>
        </div>
    );
};

export default RecipeStepForm;
