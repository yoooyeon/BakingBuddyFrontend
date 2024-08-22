"use client";
import React, { useState } from "react";
import { API_URL } from "@/app/constants";
import styles from '@/css/recipe-review.module.css';

interface ReviewProps {
    reviews: {
        content: string;
        id: string;
        user?: {
            nickname: string;
            profileImageUrl?: string;
        };
    }[];
    recipeId: string;
    onReviewSubmit: () => void;
}

const Review: React.FC<ReviewProps> = ({ reviews, recipeId, onReviewSubmit }) => {
    const [localReviews, setLocalReviews] = useState(reviews);
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleReviewSubmit = async () => {
        if (!content) {
            setError("내용을 입력해주세요.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/recipe-reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    "recipeId": recipeId,
                    "content": content,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                const data = json.data;
                setLocalReviews((prevReviews) => [data, ...prevReviews]);
                setContent("");
                onReviewSubmit(); // 댓글 제출 후 부모 컴포넌트에 알림
            } else {
                setError("댓글 작성에 실패했습니다.");
            }
        } catch (err) {
            console.error("댓글 작성 오류:", err);
            setError("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.reviewsContainer}>
            <h3 className={styles.reviewsTitle}>댓글</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleReviewSubmit();
            }} className={styles.reviewForm}>
                {error && <p>{error}</p>}
                <input
                    id="review-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.reviewInput}
                    required
                />
                <button type="submit" className={styles.reviewSubmitButton}>
                    저장
                </button>
            </form>

            {localReviews.length === 0 ? (
                <p className={styles.noReviewsMessage}>No reviews yet. Be the first to write a review!</p>
            ) : (
                localReviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                            <img
                                src={review.user?.profileImageUrl || '/placeholder-user.jpg'}
                                alt={`${review.user?.nickname || 'Anonymous'}'s profile`}
                                className={styles.reviewProfileImg}
                            />
                            <div className={styles.reviewInfo}>
                                <span className={styles.reviewUsername}>{review.user?.nickname || 'Anonymous'}</span>
                            </div>
                        </div>
                        <p className={styles.reviewContent}>{review.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Review;
