import React, { useState } from 'react';
import styles from '../../../css/form.module.css';

interface RecipeStep {
    stepNumber: number;
    description: string;
    stepImage: File | null;
}

interface RecipeStepEditProps {
    steps: RecipeStep[];
    setRecipeSteps: React.Dispatch<React.SetStateAction<RecipeStep[]>>;
}

const RecipeStepEdit: React.FC<RecipeStepEditProps> = ({ recipeSteps = [], setRecipeSteps }) => {
    const [stepDescription, setStepDescription] = useState<string>('');
    const [stepImage, setStepImage] = useState<File | null>(null);
    console.log(recipeSteps)
    const addStep = () => {
        if (stepDescription.trim() !== '') {
            const newStep = {
                stepNumber: recipeSteps.length + 1,
                description: stepDescription,
                stepImage: stepImage,
            };
            const updatedSteps = [...recipeSteps, newStep];
            setRecipeSteps(updatedSteps);

            // 상태 초기화
            setStepDescription('');
            setStepImage(null);
        }
    };

    const removeStep = (stepNumber: number) => {
        const updatedSteps = recipeSteps.filter(step => step.stepNumber !== stepNumber);
        // Reassign stepNumber to maintain sequence
        const reIndexedSteps = updatedSteps.map((step, index) => ({
            ...step,
            stepNumber: index + 1,
        }));
        setRecipeSteps(reIndexedSteps);
    };

    return (
        <div>
            <label htmlFor="recipeStepList" className={styles.label}>조리 순서</label>
            <button type="button" className={styles.button} onClick={addStep}>
                단계 추가
            </button>
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
            <div id="recipeStepList" className={styles.inputGroup}>
                {recipeSteps && recipeSteps.length > 0 ? (
                    recipeSteps.map((step) => (
                        <div key={step.stepNumber} className={styles.step}>

                            <div className={`${styles.stepHeader} ${styles.flexInline}`}>
                                <h5>{`단계 ${step.stepNumber}`}</h5>
                                <button
                                    type="button"
                                    className={styles.deleteStepButton}
                                    onClick={() => removeStep(step.stepNumber)}
                                >
                                    x
                                </button>
                            </div>
                            <p>{step.description}</p>
                            {step.stepImage ? (
                                <img
                                    src={step.stepImage}
                                    alt={`Step ${step.stepNumber}`}
                                    className={styles.stepImage}
                                />
                            ) : null}

                        </div>
                    ))
                ) : (
                    <p>조리 단계가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeStepEdit;
