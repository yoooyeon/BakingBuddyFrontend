// components/Reviews.tsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import StarHalfIcon from '@/components/ui/icon/star-half';
import StarIcon from '@/components/ui/icon/star';


interface Review {
  username: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section>
      <Tabs defaultValue="reviews">
        <TabsList>
          <TabsTrigger value="reviews">요리후기</TabsTrigger>
          <TabsTrigger value="comments">댓글</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">4.50</span>
              <div className="flex space-x-1">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarHalfIcon className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div className="space-y-2">
              {reviews.map((review, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarImage src={review.avatarUrl} />
                    <AvatarFallback>{review.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.username}</span>
                      <span className="text-sm text-muted-foreground">{review.timeAgo}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="comments">
          <div className="space-y-2">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src={review.avatarUrl} />
                  <AvatarFallback>{review.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.username}</span>
                    <span className="text-sm text-muted-foreground">{review.timeAgo}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Reviews;
