import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { ProductReview, ReviewStats } from '../../types/review';
import {
  getReviewsForProduct,
  getReviewStats,
  submitReview,
  REVIEW_BACKEND_INFO,
} from '../../services/reviewService';

interface ProductReviewSectionProps {
  productId: string;
  productName: string;
}

export const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  productId,
  productName,
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');

  // UI state
  const [formErrors, setFormErrors] = useState<{ name?: string; rating?: string; comment?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load reviews on mount / productId change
  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = () => {
    const list = getReviewsForProduct(productId);
    setReviews(list);
    setStats(getReviewStats(productId));
  };

  const validate = (): boolean => {
    const errors: { name?: string; rating?: string; comment?: string } = {};

    if (!name.trim()) {
      errors.name = 'Please provide your name.';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    } else if (name.trim().length > 50) {
      errors.name = 'Name cannot exceed 50 characters.';
    }

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = 'Please select a star rating from 1 to 5.';
    }

    if (!comment.trim()) {
      errors.comment = 'Please write your review feedback.';
    } else if (comment.trim().length < 10) {
      errors.comment = 'Review must be at least 10 characters long.';
    } else if (comment.trim().length > 1000) {
      errors.comment = 'Review cannot exceed 1000 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      submitReview(productId, {
        customerName: name,
        rating,
        comment,
      });

      // Reload reviews and stats
      loadReviews();

      // Reset form
      setName('');
      setRating(0);
      setHoverRating(0);
      setComment('');
      setFormErrors({});
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section className="pt-10 sm:pt-14 border-t border-[#E2E8F0] dark:border-[#1E293B] mt-10 sm:mt-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B] gap-3">
        <div>
          <div className="flex items-center gap-2 font-tech text-[10px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#09090B] dark:bg-white"></span>
            <span>CUSTOMER FEEDBACK // AUTHENTIC REVIEWS</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-[#09090B] dark:text-white">
            Customer Reviews & Ratings
          </h3>
        </div>

        {/* Rating Summary (Only shown when genuine reviews exist) */}
        {stats && stats.totalReviews > 0 ? (
          <div className="flex items-center gap-3 bg-[#FAFAFA] dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] px-3.5 py-2 rounded-[2px]">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(starIndex => (
                <Star
                  key={starIndex}
                  className={`w-4 h-4 ${
                    starIndex <= Math.round(stats.averageRating)
                      ? 'text-[#F59E0B] fill-[#F59E0B]'
                      : 'text-[#CBD5E1] dark:text-[#334155]'
                  }`}
                />
              ))}
            </div>
            <div className="font-tech text-xs text-[#09090B] dark:text-white">
              <span className="font-bold text-sm">{stats.averageRating.toFixed(1)}</span>
              <span className="text-[#71717A] dark:text-[#A1A1AA]"> / 5.0</span>
              <span className="text-[#52525B] dark:text-[#A1A1AA] ml-1.5 font-medium">
                ({stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
        ) : (
          <div className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
            NO REVIEWS YET // 0 SUBMITTED
          </div>
        )}
      </div>

      {/* Honest Storage Architecture Disclosure */}
      <div className="my-5 p-3 sm:p-3.5 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] rounded-[2px] flex items-start gap-2.5 text-xs font-sans text-[#52525B] dark:text-[#A1A1AA]">
        <Info className="w-4 h-4 text-[#09090B] dark:text-white flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#09090B] dark:text-white">Transparency Notice:</strong> All reviews shown here are genuine customer submissions. Reviews submitted on this device are currently saved in local browser storage. Public cross-device database synchronization requires an integrated backend service (e.g. Supabase or REST API).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mt-6">
        {/* Left Column: Review Form */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] p-5 sm:p-6 rounded-[2px] shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-[#0066FF]" />
              <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-[#09090B] dark:text-white">
                Write a Customer Review
              </h4>
            </div>
            <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] mb-4">
              Share your honest experience with the <strong className="text-[#09090B] dark:text-white">{productName}</strong>.
            </p>

            {submitSuccess && (
              <div className="mb-4 p-3 border border-[#16A34A]/30 bg-[#16A34A]/10 text-[#16A34A] dark:text-[#4ADE80] font-tech text-xs rounded-[2px] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! Your review has been recorded and added below.</span>
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-3 border border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626] dark:text-[#F87171] font-tech text-xs rounded-[2px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] mb-1.5 font-medium">
                  Your Rating <span className="text-[#DC2626]">*</span>
                </label>
                <div
                  role="radiogroup"
                  aria-label="Star rating out of 5"
                  className="flex items-center gap-1.5"
                >
                  {[1, 2, 3, 4, 5].map(starValue => {
                    const active = starValue <= (hoverRating || rating);
                    return (
                      <button
                        key={starValue}
                        type="button"
                        role="radio"
                        aria-checked={rating === starValue}
                        aria-label={`${starValue} of 5 stars`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-[#CBD5E1] dark:text-[#334155] hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0066FF]"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            active
                              ? 'text-[#F59E0B] fill-[#F59E0B]'
                              : 'text-[#D4D4D8] dark:text-[#334155]'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 font-tech text-xs text-[#09090B] dark:text-white font-bold">
                    {hoverRating || rating ? `${hoverRating || rating} / 5 Stars` : 'Select rating'}
                  </span>
                </div>
                {formErrors.rating && (
                  <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                    • {formErrors.rating}
                  </p>
                )}
              </div>

              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] mb-1 font-medium"
                >
                  Customer Display Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={50}
                  placeholder="e.g. Tariq Khan"
                  className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#0066FF] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors"
                />
                {formErrors.name && (
                  <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                    • {formErrors.name}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="reviewComment"
                    className="block font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-medium"
                  >
                    Your Review <span className="text-[#DC2626]">*</span>
                  </label>
                  <span className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                    {comment.length} / 1000
                  </span>
                </div>
                <textarea
                  id="reviewComment"
                  rows={4}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  maxLength={1000}
                  placeholder="Share details on product build, packaging, performance, or everyday experience..."
                  className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#0066FF] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors resize-none"
                />
                {formErrors.comment && (
                  <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                    • {formErrors.comment}
                  </p>
                )}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer rounded-[2px] shadow-sm"
              >
                {isSubmitting ? 'SUBMITTING FEEDBACK...' : 'SUBMIT CUSTOMER REVIEW'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Review List or Clean Empty State */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <h4 className="font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-bold">
              SUBMITTED REVIEWS [{reviews.length}]
            </h4>
            <span className="font-tech text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
              CHRONOLOGICAL ORDER
            </span>
          </div>

          {reviews.length === 0 ? (
            /* Clear Empty State per requirements */
            <div className="py-12 px-6 border border-dashed border-[#D4D4D8] dark:border-[#27272A] bg-[#FAFAFA]/50 dark:bg-[#121214]/40 text-center rounded-[2px]">
              <div className="w-10 h-10 border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] mx-auto mb-3 font-tech bg-white dark:bg-[#18181B] rounded-[2px]">
                [ 0 ]
              </div>
              <h5 className="font-display font-bold text-base text-[#09090B] dark:text-white uppercase tracking-wide">
                No reviews submitted yet
              </h5>
              <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] mt-1 max-w-sm mx-auto leading-relaxed">
                Be the first to share your experience with this product. Submit your feedback using the form to help fellow shoppers.
              </p>
            </div>
          ) : (
            /* List of genuine submitted reviews */
            <div className="space-y-3.5">
              {reviews.map(item => (
                <div
                  key={item.id}
                  className="border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-4 sm:p-5 rounded-[2px] shadow-2xs space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm text-[#09090B] dark:text-white">
                        {item.customerName}
                      </span>
                      {item.isLocalSubmission && (
                        <span className="font-tech text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-white bg-[#F4F4F5] dark:bg-[#18181B] rounded-[1px]">
                          YOUR SUBMISSION
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Star Rating Display */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(starIndex => (
                          <Star
                            key={starIndex}
                            className={`w-3.5 h-3.5 ${
                              starIndex <= item.rating
                                ? 'text-[#F59E0B] fill-[#F59E0B]'
                                : 'text-[#CBD5E1] dark:text-[#334155]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
