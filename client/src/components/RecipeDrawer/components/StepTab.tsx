import React, { useState } from 'react';
import RoundedButton, {
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';
import { Add20Filled } from '@fluentui/react-icons';
import useToggle from '@hooks/useToggle';
import RecipeWidget from './RecipeWidget';
import { useSelector } from 'react-redux';
import { selectorRecipeSteps } from '@features/recipe-slice';
import ListEmpty from '@img/list-empty.png';
import ModalAddWidget from './ModalAddWidget';

const StepTab = () => {
  const [editable, setEditable] = useState(false);
  const { isShowing, toggle } = useToggle();
  const steps = useSelector(selectorRecipeSteps);

  return (
    <>
      <div className='relative h-full flex flex-col items-stretch px-3 pt-3'>
        {steps.length > 0 ? (
          steps.map((ingredient) => (
            <RecipeWidget
              key={ingredient._id}
              type='steps'
              setEditable={setEditable}
              {...ingredient}
            />
          ))
        ) : (
          <div className='flex flex-col items-center text-center pt-8 px-4'>
            <img src={ListEmpty} alt='no steps yet' width='180' />
            <h4 className='font-semibold'>No steps yet!</h4>
            <p>Click the button below to create some steps.</p>
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
        type='steps'
        isShowing={isShowing}
        toggle={toggle}
        editable={editable}
      />
    </>
  );
};

export default StepTab;
