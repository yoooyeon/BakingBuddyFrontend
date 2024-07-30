// components/RecipeSteps.tsx
import React from 'react';

interface RecipeStep {
  stepNumber: string;
  stepImage?: string; // Make this optional
  description: string;
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
          <div key={index} className="items-start space-x-4">
            <div className="flex-1">
              <p className="text-lg font-medium mb-1">{step.stepNumber}. {step.description}</p>
            </div>
            {step.stepImage ? (
              <img
                src={step.stepImage}
                alt={`조리 이미지 ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg shadow-sm"
              />
            ) : (
              <div >
                {/* No Image */}
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSteps;
