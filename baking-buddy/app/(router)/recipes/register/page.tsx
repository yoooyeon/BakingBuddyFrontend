import RecipeForm from "@/app/_components/recipe-register/RecipeForm";

export default function RecipeRegisterPage() {
    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>레시피 등록</h2>
            </div>
            <RecipeForm />
        </div>
    );
};

