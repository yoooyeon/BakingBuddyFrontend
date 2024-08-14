"use client";
import React, { useState } from "react";
import { API_URL } from "@/app/constants";
import styles from '@/css/recipe-review.module.css';

interface ReviewFormProps {
    recipeId: string;
    onReviewSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ recipeId, onReviewSubmit }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                setContent("");
                onReviewSubmit(); // 리뷰 제출 후 새로고침 또는 리뷰 리스트 업데이트
            } else {
                setError("리뷰 작성에 실패했습니다.");
            }
        } catch (err) {
            console.error("리뷰 작성 오류:", err);
            setError("리뷰 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>리뷰 작성하기</h3>
            {error && <p>{error}</p>}
            <div className={styles.formGroup}>
                <textarea
                    id="review-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.textarea}
                    required
                />
            </div>
            <button type="submit" className={styles.button}>
                리뷰 제출
            </button>
        </form>
    );
};

export default ReviewForm;
