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
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4">조리순서</h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img
              src={step.imageUrl}
              alt={`조리 이미지 ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <p className="text-lg font-medium mb-1">{index + 1}. {step.step}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSteps;
