import React, { ReactChild, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'clsx';
import {
  CommentError20Regular,
  Copy20Regular,
  Delete20Regular,
  Edit20Regular,
  MoreVertical24Filled,
  Star12Filled,
} from '@fluentui/react-icons';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { CollapseText } from '@components/CollapseText';
import { generateBase64Image, getFullDateTime } from '@helpers/helpers';
import useToggle from '@hooks/useToggle';
import { deleteReview } from '@features/review-slice';
import { selectorUser } from '@features/user-slice';
import { FlashMessageTypes, showFlash } from '@features/flash-slice';

interface ReviewUserType {
  _id: string;
  avatar: object;
  name: string;
}

interface ReviewDataUpdateType {
  reviewId: string;
  comment: string;
  rating: number;
}

interface ReviewListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface ReviewProps {
  className?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: ReviewUserType;
  recipeId: string;
  _id: string;
  isOwner: boolean;
  setIsUpdateReview: (value: boolean) => void;
  handleUpdateReview: (review: ReviewDataUpdateType) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const Review: React.FC<ReviewProps> = ({
  className,
  rating,
  comment,
  createdAt,
  user,
  recipeId,
  _id: reviewId,
  isOwner,
  setIsUpdateReview,
  handleUpdateReview,
}) => {
  const defaultClassName = 'px-layout py-3';
  const allClassNames = cx(defaultClassName, className);
  const { isShowing, toggle } = useToggle();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectorUser);

  const handleCopyText = () => {
    let tempText = document.createElement('textarea');
    tempText.value = comment;
    document.body.appendChild(tempText);
    tempText.select();

    document.execCommand('copy');
    document.body.removeChild(tempText);
    dispatch(
      showFlash({
        message: 'Copied successfully!',
        type: FlashMessageTypes.SUCCESS,
      })
    );
  };

  const handleDelete = () => {
    setIsUpdateReview(false);
    dispatch(
      deleteReview({
        recipeId,
        reviewId,
      })
    );
    dispatch(
      showFlash({
        message: 'Comment deleted successfully!',
        type: FlashMessageTypes.SUCCESS,
      })
    );
  };

  return (
    <>
      <li className={allClassNames}>
        <div className='flex gap-2'>
          {currentUser._id === user._id ? (
            <div className='relative w-8 h-8 flex-shrink-0 mt-1 rounded-full overflow-hidden'>
              <img
                src={generateBase64Image(user.avatar)}
                className='absolute w-full h-full object-cover'
                alt={user.name}
              />
            </div>
          ) : (
            <Link to={`/user/${user._id}`}>
              <div className='relative w-8 h-8 flex-shrink-0 mt-1 rounded-full overflow-hidden'>
                <img
                  src={generateBase64Image(user.avatar)}
                  className='absolute w-full h-full object-cover'
                  alt={user.name}
                />
              </div>
            </Link>
          )}
          <div className='w-full'>
            <div className='flex justify-between items-center pb-1'>
              {currentUser._id === user._id ? (
                <h3 className='text-sm font-semibold'>{user.name}</h3>
              ) : (
                <Link
                  to={`/user/${user._id}`}
                  className='text-sm font-semibold'
                >
                  {user.name}
                </Link>
              )}
              <button
                className='flex-shrink-0 text-gray-600 -mr-2'
                onClick={toggle}
              >
                <MoreVertical24Filled />
              </button>
            </div>
            <div className='flex gap-0.5 -mt-1.5 pb-1'>
              {[...Array(5).keys()].map((_, index) => {
                return (
                  <Star12Filled
                    key={index}
                    className={
                      index + 1 <= rating ? 'text-orange' : 'text-gray-400'
                    }
                  />
                );
              })}
            </div>
            <CollapseText className='text-sm'>{comment}</CollapseText>
            <p className='text-xs text-gray-500'>
              {getFullDateTime(createdAt)}
            </p>
          </div>
        </div>
      </li>
      {isOwner ? (
        <Dropdown isShowing={isShowing} onClose={toggle}>
          <DropdownItem
            onClick={() => handleUpdateReview({ reviewId, comment, rating })}
          >
            <Edit20Regular />
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleCopyText()}>
            <Copy20Regular />
            Copy
          </DropdownItem>
          <DropdownItem onClick={() => handleDelete()}>
            <Delete20Regular />
            Delete
          </DropdownItem>
        </Dropdown>
      ) : (
        <Dropdown isShowing={isShowing} onClose={toggle}>
          <DropdownItem onClick={() => handleCopyText()}>
            <Copy20Regular />
            Copy
          </DropdownItem>
          <DropdownItem onClick={() => null}>
            <CommentError20Regular />
            Report this comment
          </DropdownItem>
        </Dropdown>
      )}
    </>
  );
};
