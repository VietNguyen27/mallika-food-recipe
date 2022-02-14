import React, { useRef, useState } from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import TextInput, { InputVariants } from '@components/Input/TextInput';
import { Review, ReviewList } from '@components/Review/Review';
import { useForm } from 'react-hook-form';
import {
  Send24Filled,
  Star20Filled,
  Star20Regular,
} from '@fluentui/react-icons';
import useOnClickOutside from '@hooks/useOnClickOutside';
import NoFound from '@img/no-found.png';
import cx from 'clsx';
import { ReviewSkeleton } from '@components/Skeleton/Skeleton';
import {
  createNewReview,
  updateReview,
  clearError,
  getAllReviews,
} from '@features/review-slice';
import { Spinner } from '@components/Loading/Loading';

interface ReviewDrawerProps {
  recipeId: string;
}

const ReviewDrawer: React.FC<ReviewDrawerProps> = ({ recipeId }) => {
  const [rating, setRating] = useState<number>(5);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [isUpdateReview, setIsUpdateReview] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const formRef = useRef(null);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const active = useSelector(({ ui }: RootState) => ui.reviewsDrawerShowing);
  const {
    outOfReview,
    error: reviewError,
    reviews,
  } = useSelector(({ review }: RootState) => review);
  const loading = useSelector(
    ({ loading }: RootState) => loading.allReviewsLoading
  );
  const dispatch = useDispatch();

  const handleClickOutside = () => setShowRating(false);

  useOnClickOutside(formRef, handleClickOutside);

  const onCloseDrawer = (): void => {
    dispatch(uiActions.setReviewsDrawerShowing(false));
    dispatch(clearError());
    resetForm();
  };

  const onSubmit = handleSubmit(({ comment }) => {
    if (!comment.length) {
      setError('Comment cannot be empty!');
      return;
    }

    if (isUpdateReview) {
      dispatch(
        updateReview({
          recipeId,
          reviewId: selectedReview,
          rating,
          comment,
        })
      );
    } else {
      dispatch(
        createNewReview({
          recipeId,
          rating,
          comment,
        })
      );
    }

    resetForm();
  });

  const resetForm = () => {
    setError('');
    setRating(5);
    setValue('comment', '');
    setIsUpdateReview(false);
  };

  const handleUpdateReview = (review) => {
    const { reviewId, comment, rating } = review;

    dispatch(clearError());
    setError('');
    setRating(rating);
    setValue('comment', comment);
    setFocus('comment');
    setIsUpdateReview(true);
    setSelectedReview(reviewId);
  };

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight;

    if (isBottom && !loading && !outOfReview) {
      dispatch(getAllReviews(recipeId));
    }
  };

  return (
    <Drawer title='Reviews' open={active} onClose={() => onCloseDrawer()}>
      <>
        {reviews[recipeId] && reviews[recipeId].length ? (
          <div
            className='h-full overflow-auto scrollbar-none pb-7'
            onScroll={handleScroll}
          >
            <ReviewList>
              <>
                {loading && !reviews[recipeId]
                  ? [...Array(5).keys()].map((_, index) => {
                      return <ReviewSkeleton key={index} />;
                    })
                  : reviews[recipeId] &&
                    reviews[recipeId].map((review: any) => (
                      <Review
                        key={review._id}
                        recipeId={recipeId}
                        handleUpdateReview={handleUpdateReview}
                        {...review}
                      />
                    ))}
              </>
            </ReviewList>
            <div className='flex justify-center h-7 -mt-4'>
              {loading && reviews[recipeId] && (
                <Spinner color='var(--color-orange)' />
              )}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center pt-8'>
            <img src={NoFound} alt='no more recipes' width='130' />
            <h3 className='font-semibold'>There are no reviews yet!</h3>
            <p className='-mt-1'>Be the first to review this recipe.</p>
          </div>
        )}
      </>
      <form className='relative mt-auto' ref={formRef} onSubmit={onSubmit}>
        <div
          className={cx(
            'absolute -bottom-3 w-full text-center bg-white pt-2 border-t border-gray-400 transition-transform',
            showRating ? '-translate-y-full -mb-2' : 'translate-y-0'
          )}
        >
          <p>Rate this recipe</p>
          <div className='flex justify-center items-center gap-3 pt-1 pb-2'>
            {[...Array(5).keys()].map((_, index) => {
              const Icon = index + 1 <= rating ? Star20Filled : Star20Regular;
              return (
                <Icon
                  key={index}
                  className='cursor-pointer text-orange'
                  onClick={() => setRating(index + 1)}
                />
              );
            })}
          </div>
        </div>
        <div className='relative z-10 flex items-end px-3 gap-3 pb-5 -mb-3 bg-white'>
          <TextInput
            className='w-full'
            variant={InputVariants.TERTIARY}
            placeholder='Your review'
            onFocus={() => setShowRating(true)}
            error={error || reviewError}
            {...register('comment', {
              onChange: () => {
                setError('');
                dispatch(clearError());
              },
              onBlur: (e) => setValue('comment', e.target.value.trim()),
            })}
          />
          <button
            type='submit'
            className='flex-shrink-0 text-orange m-0.5 p-1 text-sm font-semibold uppercase'
          >
            <Send24Filled />
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default ReviewDrawer;
