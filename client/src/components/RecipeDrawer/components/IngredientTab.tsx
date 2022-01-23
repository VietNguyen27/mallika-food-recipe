import React, { useState } from 'react';
import RoundedButton, {
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';
import { Add20Filled } from '@fluentui/react-icons';
import useToggle from '@hooks/useToggle';
import RecipeWidget from './RecipeWidget';
import { useSelector } from 'react-redux';
import { selectorRecipeIngredients } from '@features/recipe-slice';
import ListEmpty from '@img/list-empty.png';
import ModalAddWidget from './ModalAddWidget';

const IngredientTab = () => {
  const [inputValue, setInputValue] = useState({});
  const [editable, setEditable] = useState(false);
  const { isShowing, toggle } = useToggle();
  const ingredients = useSelector(selectorRecipeIngredients);

  return (
    <>
      <div className='relative h-full flex flex-col items-stretch px-3 pt-3'>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <RecipeWidget
              key={ingredient._id}
              type='ingredients'
              index={index}
              setEditable={setEditable}
              setInputValue={setInputValue}
              {...ingredient}
            />
          ))
        ) : (
          <div className='flex flex-col items-center text-center pt-8 px-4'>
            <img src={ListEmpty} alt='no ingredients yet' width='180' />
            <h4 className='font-semibold'>No ingredients yet!</h4>
            <p>Click the button below to create some ingredients.</p>
          </div>
        )}
        <div className='fixed bottom-4 right-4'>
          <RoundedButton
            variant={RoundedButtonVariants.PRIMARY}
            onClick={toggle}
          >
            <Add20Filled />
          </RoundedButton>
        </div>
      </div>
      <ModalAddWidget
        type='ingredients'
        isShowing={isShowing}
        toggle={toggle}
        editable={editable}
        inputValue={inputValue}
        setEditable={setEditable}
      />
    </>
  );
};

export default IngredientTab;
