import styles from '@/css/main.module.css'
import {useState} from "react";

interface Writer {
    uuid: string,
    username: string,
    profileImageUrl: string,
}

interface Recipe {
    name: string;
    dirId: number;
    id: number;
    userId: string;
    description: string;
    username: string;
    profileImageUrl: string;
    openYn: boolean;
    recipeImageUrl: string;
    time: number;
    level: string;
    likeCount: number;
    userLiked: boolean;
    writer: Writer;
}


const MainRecipe = ({recipes}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextRecipe = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevRecipe = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
        );
    };
    console.log(recipes)

    const currentRecipe = recipes[currentIndex];
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                <div className={styles.carouselImageWrapper}>
                    <img
                        // src={currentRecipe.recipeImageUrl || "https://picsum.photos/seed/picsum/200/300"}
                        src={"https://picsum.photos/seed/picsum/400/300"}
                        alt={currentRecipe.name || "Main Recipe"}
                        className={styles.carouselImage}
                    />
                </div>
                <div className={styles.carouselContent}>
                    <h2 className={styles.carouselTitle}>{currentRecipe.name}</h2>
                    <p className={styles.carouselDescription}>{currentRecipe.description}</p>
                    <div className={styles.carouselDetails}>
                        <p className={styles.detailItem}>Time: {currentRecipe.time} 분</p>
                        <p className={styles.detailItem}>Level: {currentRecipe.level}</p>
                    </div>
                </div>
            </div>
            <button className={styles.carouselButtonLeft} onClick={prevRecipe}>❮</button>
            <button className={styles.carouselButtonRight} onClick={nextRecipe}>❯</button>
        </div>
    );
};

export default MainRecipe;
