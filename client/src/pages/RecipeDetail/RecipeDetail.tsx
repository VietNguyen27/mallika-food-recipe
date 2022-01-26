import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseLikedCount,
  getRecipeById,
  increaseLikedCount,
} from '@features/recipe-slice';
import { addLikedRecipe, removeLikedRecipe } from '@features/liked-slice';
import { selectorUser } from '@features/auth-slice';
import { RootState } from '@redux/reducers';
import { RecipeDetailSkeleton } from '@components/Skeleton/Skeleton';
import { generateBase64Image } from '@helpers/helpers';
import {
  Add16Filled,
  ChevronLeft24Regular,
  Clock24Regular,
  Food24Regular,
  Heart16Regular,
  Heart24Regular,
  ServiceBell24Regular,
  Edit24Regular,
  Cart24Regular,
  CalendarCheckmark24Regular,
  MoreVertical24Regular,
  Heart16Filled,
  Heart24Filled,
} from '@fluentui/react-icons';
import RoundedButton, {
  RoundedButtonTypes,
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';
import { DIFFICULTY_NAME } from '@config/recipe';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import { uiActions } from '@features/ui-slice';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    ({ loading }: RootState) => loading.recipeDetailLoading
  );
  const { recipe } = useSelector(({ recipe }: RootState) => recipe);
  const currentUser = useSelector(selectorUser);

  useEffect(() => {
    if (id) {
      dispatch(getRecipeById(id));
    }
  }, [id]);

  if (loading) return <RecipeDetailSkeleton />;
  if (!recipe) return null;

  const {
    _id,
    image,
    title,
    time,
    description,
    ingredients,
    steps,
    likedCount,
    isLiked,
    numReviews,
    difficulty,
    serve,
  } = recipe;

  const handleLikeRecipe = async () => {
    const likedRecipe = {
      recipe: _id,
      user: currentUser._id,
    };

    await dispatch(addLikedRecipe(likedRecipe));
    dispatch(increaseLikedCount(_id));
  };

  const handleUnlikeRecipe = async () => {
    await dispatch(removeLikedRecipe(_id));
    dispatch(decreaseLikedCount(_id));
  };

  return (
    <div className='relative h-full overflow-scroll scrollbar-none bg-gray-100'>
      <div className='relative h-[270px] shadow'>
        <img
          className='absolute top-0 left-0 w-full h-full object-cover'
          src={generateBase64Image(image)}
          alt={title}
        />
        <RoundedButton
          type={RoundedButtonTypes.BUTTON}
          className='absolute top-4 left-4 w-11 h-11'
          variant={RoundedButtonVariants.SECONDARY}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft24Regular />
        </RoundedButton>
        {isLiked ? (
          <RoundedButton
            type={RoundedButtonTypes.BUTTON}
            className='absolute top-4 right-4 w-11 h-11 text-orange'
            variant={RoundedButtonVariants.SECONDARY}
            onClick={() => handleUnlikeRecipe()}
          >
            <Heart24Filled />
          </RoundedButton>
        ) : (
          <RoundedButton
            type={RoundedButtonTypes.BUTTON}
            className='absolute top-4 right-4 w-11 h-11 text-orange'
            variant={RoundedButtonVariants.SECONDARY}
            onClick={() => handleLikeRecipe()}
          >
            <Heart24Regular />
          </RoundedButton>
        )}
      </div>
      <div className='relative flex flex-col gap-3 h- px-layout -mt-12'>
        <div className='rounded-2xl bg-white overflow-hidden p-4'>
          <div className='flex justify-between items-center bg-gray-100 mb-4 text-gray-800 text-sm rounded-md px-2 py-1'>
            <span>Cookbooks / Menu special</span>
            <button className='inline-flex justify-center items-center bg-white w-5 h-5 rounded'>
              <Add16Filled />
            </button>
          </div>
          <h1 className='text-2xl font-semibold mb-3'>{title}</h1>
          <div className='flex items-center text-sm text-gray-800 mb-2'>
            {isLiked ? (
              <Heart16Filled className='text-orange mr-1' />
            ) : (
              <Heart16Regular className='text-orange mr-1' />
            )}
            {likedCount +
              ' | ' +
              (numReviews > 0 ? `${numReviews} Reviews` : '0 Review')}
          </div>
          <div className='flex items-stretch border-t border-gray-400 pt-3 text-center text-sm'>
            <div className='flex-1 inline-flex flex-col items-center border-r border-gray-400'>
              <Clock24Regular className='text-orange pb-1' />
              <span>
                {time.hour ? time.hour + ' hour ' : null}
                {time.minute ? time.minute + ' min' : null}
              </span>
            </div>
            <div className='flex-1 inline-flex flex-col items-center border-r border-gray-400'>
              <ServiceBell24Regular className='text-orange pb-1' />
              <span className='capitalize'>{DIFFICULTY_NAME[difficulty]}</span>
            </div>
            <div className='flex-1 inline-flex flex-col items-center'>
              <Food24Regular className='text-orange pb-1' />
              <span>{'Serves ' + serve}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-stretch bg-white mb-4 rounded-2xl p-4'>
          <div className='flex justify-between items-center'>
            <span>
              {numReviews > 0 ? `Reviews (${numReviews})` : 'Review (0)'}
            </span>
            <button
              className='uppercase text-orange text-small font-semibold'
              onClick={() => dispatch(uiActions.setReviewsDrawerShowing(true))}
            >
              Read all
            </button>
          </div>
          <div className='pt-3'>
            {numReviews > 0 ? null : (
              <div className='text-center'>There is no reviews yet!</div>
            )}
          </div>
        </div>
      </div>
      <Tabs className='bg-white pt-4 pb-12 h-auto'>
        <Tab label='Intro' className='px-4 pt-3'>
          {description
            ? description
            : 'There is no description of recipe intro'}
        </Tab>
        <Tab label='Ingredients' className='px-4 pt-3'>
          <ul>
            {ingredients.map((ingredient, index) => {
              const { title, isHeader } = ingredient;
              if (isHeader) {
                return (
                  <li key={index} className='text-xl font-semibold mb-2.5'>
                    {title}
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className='relative pl-5 mb-2.5 after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-orange'
                >
                  {title}
                </li>
              );
            })}
          </ul>
        </Tab>
        <Tab label='Steps' className='px-4 pt-3'>
          <ul>
            {steps.map((step, index) => {
              const { title, isHeader } = step;
              if (isHeader) {
                return (
                  <li key={index} className='text-xl font-semibold mb-2.5'>
                    {title}
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className='relative pl-5 mb-2.5 after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-orange'
                >
                  {title}
                </li>
              );
            })}
          </ul>
        </Tab>
      </Tabs>
      <div className='absolute left-0 bottom-8'>
        <div className='fixed flex items-stretch w-phone h-10 border-t border-gray-400 bg-white rounded-b-2xl'>
          <div className='flex-1 inline-flex items-center justify-center'>
            <button>
              <Edit24Regular />
            </button>
          </div>
          <div className='flex-1 inline-flex items-center justify-center'>
            <button>
              <Cart24Regular />
            </button>
          </div>
          <div className='flex-1 inline-flex items-center justify-center'>
            <button>
              <CalendarCheckmark24Regular />
            </button>
          </div>
          <div className='flex-1 inline-flex items-center justify-center'>
            <button>
              <MoreVertical24Regular />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
