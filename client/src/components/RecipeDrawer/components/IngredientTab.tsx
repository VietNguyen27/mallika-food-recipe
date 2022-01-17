import React, { useState } from 'react';
import RoundedButton, {
  ButtonVariants,
} from '@components/Button/RoundedButton';
import { Add20Filled } from '@fluentui/react-icons';
import useToggle from '@hooks/useToggle';
import Modal from '@components/Modal/Modal';
import Switch, { SwitchSizes } from '@components/Switch/Switch';
import Button, { ButtonSizes } from '@components/Button/Button';
import TextInput from '@components/Input/TextInput';
import RecipeWidget from './RecipeWidget';

const ingredientsDummy = [
  {
    id: 1,
    title: 'Bahan',
    isHeader: true,
  },
  {
    id: 2,
    title: '1 buah wortel, potong-potong',
    isHeader: false,
  },
  {
    id: 3,
    title: '5 potong sayap ayam',
    isHeader: false,
  },
  {
    id: 4,
    title: '200 gr makaroni atau fusilli',
    isHeader: false,
  },
];

const IngredientTab = () => {
  const { isShowing, toggle } = useToggle();

  return (
    <>
      <div className='relative h-full flex flex-col items-stretch px-3 pt-3'>
        {ingredientsDummy.map((ingredient) => (
          <RecipeWidget key={ingredient.id} {...ingredient} />
        ))}
        <div className='fixed bottom-4 right-4'>
          <RoundedButton variant={ButtonVariants.PRIMARY} onClick={toggle}>
            <Add20Filled />
          </RoundedButton>
        </div>
      </div>
      <Modal title='Add new Ingredient' isShowing={isShowing} onClose={toggle}>
        <form>
          <TextInput
            name='ingredient'
            placeholder='Type ingredient'
            className='pt-4 pb-1'
            inputClassName='py-1 px-2'
          />
          <div className='flex justify-between items-center pb-4'>
            <span className='text-sm text-gray-800'>Set it item?</span>
            <Switch
              size={SwitchSizes.EXTRA_SMALL}
              onChange={() => console.log(123)}
            />
          </div>
          <Button size={ButtonSizes.EXTRA_SMALL} fluid={true}>
            Add
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default IngredientTab;
