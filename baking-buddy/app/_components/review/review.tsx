import React from 'react';
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
}

const Review: React.FC<ReviewProps> = ({ reviews }) => {
    if (reviews.length === 0) {
        return <p className={styles.noReviewsMessage}>No reviews yet. Be the first to write a review!</p>;
    }

    return (
        <div className={styles.reviewsContainer}>
            <h3 className={styles.reviewsTitle}>리뷰</h3>
            {reviews.map((review) => (
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
            ))}
        </div>
    );
};

export default Review;
