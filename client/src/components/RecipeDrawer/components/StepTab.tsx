import React from 'react';
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

const stepsDummy = [
  {
    id: 1,
    title: 'Cara Memasak',
    isHeader: true,
  },
  {
    id: 2,
    title:
      'Setelah dicuci bersih, rebus sayap ayam hingga matang dengan 500 ml air. Buang busanya dan saring untuk dijadikan kaldu. ',
    isHeader: false,
  },
  {
    id: 3,
    title:
      'Tumis bawang putih, bawang merah dan daun bawang hingga harum. Masukkan pala dan lada bubuk, tumis sebentar. Matikan api. ',
    isHeader: false,
  },
  {
    id: 4,
    title:
      'Rebus lagi air kaldu, masukkan makaroni dan masak hingga setengah matang. Masukkan wortel dan masak hingga mendidih. ',
    isHeader: false,
  },
];

const StepTab = () => {
  const { isShowing, toggle } = useToggle();

  return (
    <>
      <div className='relative h-full flex flex-col items-stretch px-3 pt-3'>
        {stepsDummy.map((step) => (
          <RecipeWidget key={step.id} {...step} />
        ))}
        <div className='fixed bottom-4 right-4'>
          <RoundedButton variant={ButtonVariants.PRIMARY} onClick={toggle}>
            <Add20Filled />
          </RoundedButton>
        </div>
      </div>
      <Modal title='Add new Step' isShowing={isShowing} onClose={toggle}>
        <form>
          <TextInput
            name='step'
            placeholder='Type step'
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

export default StepTab;
