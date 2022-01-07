import React from 'react';
import TextInput, { InputVariants } from '@components/Input/TextInput';
import Textarea, { TextareaVariants } from '@components/Textarea/Textarea';
import RoundedButton, {
  ButtonRoundShape,
  ButtonVariants,
} from '@components/Button/RoundedButton';
import { Tab } from '@components/Tabs/Tabs';
import Switch from '@components/Switch/Switch';
import { Option, Select } from '@components/Select/Select';
import { RECIPES_BY_DIFFICULTY } from '@config/recipe';
import { Edit20Regular } from '@fluentui/react-icons';
import NoImage from '@img/no-image.jfif';

const IntroTab = () => {
  return (
    <form className='flex flex-col gap-4 px-3 pt-3'>
      <TextInput
        label='title'
        variant={InputVariants.SECONDARY}
        name='title'
        placeholder='Recipe title'
      />
      <div>
        <span className='text-gray-800 text-sm capitalize'>Cook time</span>
        <div className='flex gap-4'>
          <TextInput
            label='hours'
            variant={InputVariants.SECONDARY}
            name='title'
            placeholder='Recipe title'
          />
          <TextInput
            label='minutes'
            variant={InputVariants.SECONDARY}
            name='title'
            placeholder='Recipe title'
          />
        </div>
      </div>
      <div className='relative h-40 rounded-md overflow-hidden'>
        <img
          src={NoImage}
          className='absolute inset-0 w-full h-full object-cover'
          alt='thumbnail of recipe'
        />
        <RoundedButton
          className='absolute z-10 top-2 right-2 hover:bg-white'
          variant={ButtonVariants.SECONDARY}
          rounded={ButtonRoundShape.MEDIUM}
        >
          <Edit20Regular />
        </RoundedButton>
      </div>
      <Textarea
        label='description'
        variant={TextareaVariants.SECONDARY}
        name='description'
        placeholder='Recipe description'
        rows={4}
      />
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Select label='Difficulty' defaultValue={RECIPES_BY_DIFFICULTY.EASY}>
            <Option value={RECIPES_BY_DIFFICULTY.EASY}>Easy</Option>
            <Option value={RECIPES_BY_DIFFICULTY.MEDIUM}>Medium</Option>
            <Option value={RECIPES_BY_DIFFICULTY.HARD}>Hard</Option>
          </Select>
        </div>
        <div className='flex-1'>
          <TextInput
            label='serve'
            variant={InputVariants.SECONDARY}
            name='serve'
            defaultValue='1'
            suffix={
              <span className='absolute left-3 bottom-1 pointer-events-none select-none'>
                people
              </span>
            }
          />
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-800'>Publish to Community?</span>
        <Switch onChange={() => console.log(123)} />
      </div>
    </form>
  );
};

export default IntroTab;
