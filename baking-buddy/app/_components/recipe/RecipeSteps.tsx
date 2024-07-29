// components/RecipeSteps.tsx
import React from 'react';

interface RecipeStep {
  step: string;
  imageUrl: string;
}

interface RecipeStepsProps {
  steps: RecipeStep[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold">조리순서</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">
              <img src={step.imageUrl} alt={`조리 이미지 ${index + 1}`} className="w-24 h-24 object-cover" />
              <p>{index + 1}. {step.step}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSteps;
