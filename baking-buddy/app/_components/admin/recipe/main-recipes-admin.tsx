import React from 'react';
import styles from '@/css/report.module.css';
interface Writer{
    uuid: string,
    username:string,
    profileImageUrl:string,
}
interface MainRecipeResponse {
    name: string;
    dirId: number;
    recipeId: string;
    mainRecipeId: string;
    userId: string;
    description: string;
    username: string;
    profileImageUrl: string;
    openYn: boolean;
    recipeImageUrl: string;
    time: number;
    level: string;
    likeCount: number;
    current: boolean;
    userLiked: boolean;
    writer: Writer;
}

interface MainRecipeProps {
    mainRecipes: MainRecipeResponse[];
    onSetMain: (mainRecipeId:string,recipeId: string,) => void;
    unSetMain: (mainRecipeId:string,recipeId: string,) => void;
}

const MainRecipeAdmin: React.FC<MainRecipeProps> = ({ mainRecipes ,onSetMain, unSetMain}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>메인 레시피 관리</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>레시피 이름</th>
                    <th>설명</th>
                    <th>소요시간</th>
                    <th>난이도</th>
                    <th>현재 메인 페이지 여부</th>
                </tr>
                </thead>
                <tbody>
                {mainRecipes.map(recipe => (
                    <tr key={recipe.recipeId}>
                        <td>{recipe.name}</td>
                        <td>{recipe.description}</td>
                        <td>{recipe.time}</td>
                        <td>{recipe.level}</td>
                        <td>
                            {!recipe.current ? (
                                <button className={styles.button} onClick={() => onSetMain(recipe.mainRecipeId,recipe.recipeId)}>메인 페이지로 설정</button>
                            ) : (
                                <button className={styles.button} onClick={() => unSetMain(recipe.mainRecipeId,recipe.recipeId)}>메인 페이지 해제</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainRecipeAdmin;
