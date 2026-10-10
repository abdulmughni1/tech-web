export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string; // ISO date string or formatted date
  isLocalSubmission?: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}
