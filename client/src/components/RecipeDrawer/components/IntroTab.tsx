import React, { useRef, useState } from 'react';
import TextInput, { InputVariants } from '@components/Input/TextInput';
import Textarea, { TextareaVariants } from '@components/Textarea/Textarea';
import RoundedButton, {
  ButtonRoundShape,
  ButtonVariants,
} from '@components/Button/RoundedButton';
import Switch from '@components/Switch/Switch';
import { Option, Select } from '@components/Select/Select';
import { RECIPES_BY_DIFFICULTY } from '@config/recipe';
import { Edit20Regular } from '@fluentui/react-icons';
import NoImage from '@img/no-image.jfif';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  createRecipe,
  selectorRecipeError,
  selectorRecipeIngredients,
  selectorRecipeSteps,
} from '@features/recipe-slice';
import { selectorUser } from '@features/auth-slice';
import { convertBase64, getErrorFromJoiMessage } from '@helpers/helpers';

const IntroTab = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const inputFileRef: any = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const ingredients = useSelector(selectorRecipeIngredients);
  const steps = useSelector(selectorRecipeSteps);
  const user = useSelector(selectorUser);
  const error = useSelector(selectorRecipeError);
  const recipeError = getErrorFromJoiMessage(error);

  const onChangeThumbnail = (): void => {
    const input = inputFileRef.current;

    if (input) {
      input.click();
    }
  };

  const handleFileSelected = async (): Promise<void> => {
    const input = inputFileRef.current;

    if (input) {
      const files = input.files;
      const imageBase64 = await convertBase64(files[0]);
      const [imageFormat, base64] = imageBase64.split(';base64,');
      setThumbnail(imageBase64);
      setValue('image', {
        base64,
        imageFormat: imageFormat.split('/')[1],
      });
    }
  };

  const onSubmit = handleSubmit((data) => {
    const newRecipe = {
      user: user._id,
      difficulty: RECIPES_BY_DIFFICULTY.EASY,
      reviews: [],
      isPublished: false,
      ingredients,
      steps,
      ...data,
    };

    dispatch(createRecipe(newRecipe));
  });

  return (
    <form
      id='add-new-recipe'
      onSubmit={onSubmit}
      className='flex flex-col gap-4 px-3 pt-3'
    >
      <TextInput
        label='title'
        variant={InputVariants.SECONDARY}
        placeholder='Recipe title'
        error={recipeError['title']}
        {...register('title')}
      />
      <div>
        <span className='text-gray-800 text-sm capitalize'>Cook time</span>
        <div className='flex gap-4'>
          <TextInput
            label='hours'
            variant={InputVariants.SECONDARY}
            placeholder='Recipe hours'
            defaultValue={0}
            onlyNumber={true}
            {...register('time.hour', {
              valueAsNumber: true,
            })}
          />
          <TextInput
            label='minutes'
            variant={InputVariants.SECONDARY}
            placeholder='Recipe minutes'
            defaultValue={30}
            onlyNumber={true}
            {...register('time.minute', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className='relative h-40 rounded-md overflow-hidden'>
        <input
          onChange={() => handleFileSelected()}
          ref={inputFileRef}
          type='file'
          className='hidden'
        />
        <img
          src={thumbnail ? thumbnail : NoImage}
          className='absolute inset-0 w-full h-full object-cover'
          alt='thumbnail of recipe'
        />
        <RoundedButton
          className='absolute z-10 top-2 right-2 hover:bg-white'
          variant={ButtonVariants.SECONDARY}
          rounded={ButtonRoundShape.MEDIUM}
          onClick={() => onChangeThumbnail()}
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
        register={{ ...register('description') }}
      />
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Select
            name='difficulty'
            label='Difficulty'
            defaultValue={RECIPES_BY_DIFFICULTY.EASY}
            onChange={setValue}
          >
            <Option value={RECIPES_BY_DIFFICULTY.EASY}>Easy</Option>
            <Option value={RECIPES_BY_DIFFICULTY.MEDIUM}>Medium</Option>
            <Option value={RECIPES_BY_DIFFICULTY.HARD}>Hard</Option>
          </Select>
        </div>
        <div className='flex-1'>
          <TextInput
            label='serve (people)'
            variant={InputVariants.SECONDARY}
            defaultValue={1}
            onlyNumber={true}
            {...register('serve', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-800'>Publish to Community?</span>
        <Switch name='isPublished' onChange={setValue} />
      </div>
    </form>
  );
};

export default IntroTab;
