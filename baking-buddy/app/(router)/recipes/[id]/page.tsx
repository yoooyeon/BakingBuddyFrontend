"use client"
import React, {useEffect, useState, Suspense, lazy} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import Tag from '@/app/_components/recipe/tag';
import {API_URL} from '@/app/constants';
import {Stomp, IFrame} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styles from '@/css/form.module.css';
// import Review from '@/app/_components/review/review';
import ReviewForm from '@/app/_components/review/review-form';
import UserCountPopup from "@/app/_components/popup/uesr-count-popup"; // Import the ReviewForm component
const Review = lazy(() => import('@/app/_components/review/review')); // Lazy load Review component

const RecipeDetails = lazy(() => import('@/app/_components/recipe/recipe-detail'));
const IngredientsTable = lazy(() => import('@/app/_components/recipe/ingredients-table'));
const RecipeSteps = lazy(() => import('@/app/_components/recipe/recipe-steps'));

interface ReviewProp {
    content: string;
    id: string;
    user?: {
        nickname: string;
        profileImageUrl?: string;
    };
}

interface Recipe {
    id: string;
    name: string;
    username: string; // 레시피 작성자
    likeCount: number;
    level: string;
    userLiked: boolean;
    time: number;
    recipeImageUrl: string;
    profileImageUrl: string;
    ingredients: { name: string; amount: string; unitDisplayName: string }[];
    recipeSteps: { stepNumber: string; stepImage: string; description: string }[];
    tags: { name: string }[];
    reviews: ReviewProp[];
    servings: number;
}

export default function RecipeDetailPage() {
    const loginUsername = localStorage.getItem('username');
    const params = useParams();
    const recipeId = params.id as string;
    const [isDeleting, setIsDeleting] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [reviews, setReviews] = useState<ReviewProp[]>([]);
    const [reviews, setReviews] = useState<ReviewProp[]>([]);
    // 접속자 체크
    const [userCount, setUserCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부

    // const socketUrl = `${API_URL}/ws`; // Spring Boot WebSocket endpoint
    const getToken = () => localStorage.getItem('accessToken');

    const handleDelete = async () => {
        if (!recipe) {
            console.error('No recipe data available for deletion');
            return;
        }

        if (window.confirm('Are you sure you want to delete this recipe?')) {
            setIsDeleting(true);
            try {
                const response = await fetch(`${API_URL}/api/recipes/${recipe.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    // onDelete(recipe.id); // 성공 시 삭제 후 처리
                } else {
                    console.error('Failed to delete recipe');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const fetchRecipe = async () => {
        if (!recipeId) return;

        try {
            const response = await fetch(`${API_URL}/api/recipes/${recipeId}`, {
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
            setRecipe(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    const fetchReview = async () => {
        try {
            const response = await fetch(`${API_URL}/api/recipe-reviews/recipes/${recipeId}`, {
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
            console.log(json.data)
            setReviews(json.data);
        } catch (err) {
            console.error((err as Error).message);
        }
    };

    const handleReviewSubmitted = () => {
        fetchReview(); // 리뷰 제출 후 리뷰 리스트를 새로 고칩니다.
    };

    // useEffect(() => {
    //     const accessToken = getToken();
    //     const headers = {
    //         Authorization: accessToken ? `Bearer ${accessToken}` : '',
    //     };
    //     const socket = new SockJS(socketUrl);
    //     const client = Stomp.over(socket);
    //
    //     client.connect(headers, (frame: IFrame) => {
    //         console.log('Connected: ' + frame);
    //         client.subscribe('/topic/onlineUsers', (message) => {
    //             const body = message.body;
    //             console.log('Received user count:', body);
    //             setUserCount(parseInt(body, 10)); // Update the state with new user count
    //             setShowPopup(true); // 팝업을 표시
    //         });
    //         client.send('/app/userConnected', {}, '');
    //     }, (error: unknown) => {
    //         console.error('STOMP Error:', error);
    //     });
    //
    //     return () => {
    //         if (client.connected) {
    //             client.send('/app/userDisconnected', {}, '');
    //         } else {
    //             console.log('No STOMP connection to send disconnection message');
    //         }
    //     };
    // }, []);

    useEffect(() => {
        fetchRecipe();
        fetchReview();
    }, [recipeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>No recipe data available</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            {showPopup && <UserCountPopup userCount={userCount} onClose={() => setShowPopup(false)}/>}
            <Suspense fallback={<h1>Loading recipe details...</h1>}>
                <RecipeDetails recipe={recipe}/>
            </Suspense>
            <Suspense fallback={<h1>Loading ingredients...</h1>}>
                <IngredientsTable ingredients={recipe.ingredients || []} servings={recipe.servings}/>
            </Suspense>
            <Suspense fallback={<h1>Loading steps...</h1>}>
                <RecipeSteps steps={recipe.recipeSteps || []}/>
            </Suspense>
            <Suspense fallback={<h1>Loading tags...</h1>}>
                {recipe.tags.map((tag, index) => (
                    <Tag key={index} name={tag.name}/>
                ))}
            </Suspense>
            <Suspense fallback={<h1>Loading reviews...</h1>}>
                <Review reviews={reviews}/>
            </Suspense>
            <ReviewForm recipeId={recipeId} onReviewSubmit={handleReviewSubmitted}/>

            {loginUsername === recipe.username && (
                <div className={styles.buttonContainer}>
                    <Link href={`/recipes/${recipeId}/edit`}>
                        <button className={styles.button}>레시피 수정하기</button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={styles.button}
                    >
                        {isDeleting ? '삭제중...' : '삭제하기'}
                    </button>
                </div>
            )}
        </div>
    );
}
