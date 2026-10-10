import { ProductReview, ReviewStats } from '../types/review';

const STORAGE_KEY = 'dexyfied_reviews_v1';

/**
 * Architectural Disclosure:
 * DEXYFIED is currently running entirely client-side on React + Vite.
 * There is no remote backend server or shared database configured yet.
 * Any reviews submitted in this browser are stored locally via localStorage for preview.
 * Synchronizing reviews across all public visitors requires a persistent database (e.g. Supabase, PostgreSQL, Firebase).
 */
export const REVIEW_BACKEND_INFO = {
  hasRemoteBackend: false,
  storageType: 'localStorage (browser-local session)',
  explanation: 'Reviews submitted here are saved locally on this browser. A public database backend is required for real-time synchronization across all visitors’ devices.',
};

function readAllStoredReviews(): Record<string, ProductReview[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored reviews from localStorage:', err);
    return {};
  }
}

function saveStoredReviews(data: Record<string, ProductReview[]>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to persist review to localStorage:', err);
  }
}

/**
 * Returns genuine submitted reviews for a specific product.
 * Returns empty array if no reviews have been submitted.
 * Absolutely NO fake reviews are manufactured.
 */
export function getReviewsForProduct(productId: string): ProductReview[] {
  const all = readAllStoredReviews();
  return all[productId] || [];
}

/**
 * Calculates genuine average rating and count.
 * Returns null if no reviews exist, preventing fabricated 5.0 ratings.
 */
export function getReviewStats(productId: string): ReviewStats | null {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return null;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = Number((sum / reviews.length).toFixed(1));

  return {
    averageRating,
    totalReviews: reviews.length,
  };
}

/**
 * Submits a validated review for a product.
 * Trims input and saves to local device storage.
 */
export function submitReview(
  productId: string,
  input: {
    customerName: string;
    rating: number;
    comment: string;
  }
): ProductReview {
  const trimmedName = input.customerName.trim();
  const trimmedComment = input.comment.trim();

  if (!trimmedName || !trimmedComment || input.rating < 1 || input.rating > 5) {
    throw new Error('Invalid review parameters.');
  }

  const newReview: ProductReview = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    productId,
    customerName: trimmedName,
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    comment: trimmedComment,
    createdAt: new Date().toISOString(),
    isLocalSubmission: true,
  };

  const all = readAllStoredReviews();
  const productReviews = all[productId] || [];
  all[productId] = [newReview, ...productReviews];

  saveStoredReviews(all);

  return newReview;
}

/**
 * Returns all submitted reviews across all products (for feedback previews).
 */
export function getAllSubmittedReviews(): ProductReview[] {
  const all = readAllStoredReviews();
  const list: ProductReview[] = [];
  for (const pid of Object.keys(all)) {
    list.push(...all[pid]);
  }
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
