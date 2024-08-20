"use client"
import React, {useEffect, useState, Suspense, lazy} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import Tag from '@/app/_components/recipe/tag';
import {API_URL} from '@/app/constants';
import styles from '@/css/form.module.css'; // 스타일 import
import ReviewForm from '@/app/_components/review/review-form';
import UserCountPopup from "@/app/_components/popup/uesr-count-popup";
import Slider from 'react-slick'; // react-slick import

const Review = lazy(() => import('@/app/_components/review/review'));
const RecipeDetails = lazy(() => import('@/app/_components/recipe/recipe-detail'));
const IngredientsTable = lazy(() => import('@/app/_components/recipe/ingredients-table'));
const RecipeSteps = lazy(() => import('@/app/_components/recipe/recipe-steps'));
const Product = lazy(() => import('@/app/_components/product/product'));

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
    username: string;
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

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    productImageUrl: string;
}

export default function RecipeDetailPage() {
    const loginUsername = localStorage.getItem('username');
    const params = useParams();
    const recipeId = params.id as string;
    const [isDeleting, setIsDeleting] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [product, setProduct] = useState<Product[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reviews, setReviews] = useState<ReviewProp[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

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
            setReviews(json.data);
        } catch (err) {
            console.error((err as Error).message);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_URL}/api/recommendations/recipes/${recipeId}`, {
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
            console.log("recom", data);
            setProduct(data);
        } catch (err) {
            console.error((err as Error).message);
        }
    };

    const handleReviewSubmitted = () => {
        fetchReview(); // 리뷰 제출 후 리뷰 리스트를 새로 고칩니다.
    };

    useEffect(() => {
        fetchRecipe();
        fetchReview();
        fetchProduct();
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

    // Slider 설정
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true, // 화살표 활성화
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
            <div className="mt-8">
                {
                    product?.length > 0 && (
                        <h2 className="text-xl font-semibold mb-4">관련 상품</h2>
                    )
                }
                <Slider {...settings}>
                    {product && product.map((prod) => (
                        <div key={prod.id} className="px-2">
                            <Suspense fallback={<h1>Loading product...</h1>}>
                                <Product product={prod}/>
                            </Suspense>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
