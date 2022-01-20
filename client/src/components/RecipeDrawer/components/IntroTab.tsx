import React, { useRef, useState } from 'react';
import TextInput, { InputVariants } from '@components/Input/TextInput';
import Textarea, { TextareaVariants } from '@components/Textarea/Textarea';
import RoundedButton, {
  RoundedButtonShape,
  RoundedButtonVariants,
} from '@components/Button/RoundedButton';
import Button, { ButtonTypes, ButtonVariants } from '@components/Button/Button';
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
import {
  convertBase64,
  getErrorFromJoiMessage,
  resizeImage,
} from '@helpers/helpers';
import { RootState } from '@redux/reducers';
import { Spinner } from '@components/Loading/Loading';

const IntroTab = () => {
  const [thumbnail, setThumbnail] = useState<null | string>(null);
  const inputFileRef: any = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const ingredients = useSelector(selectorRecipeIngredients);
  const { loading } = useSelector(({ recipe }: RootState) => recipe);
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
      const imageResize = await resizeImage(imageBase64, 400, 215);
      const [imageFormat, base64] = imageResize.split(';base64,');
      setThumbnail(imageResize);
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
      image: {},
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
            error={recipeError['time.hour']}
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
            error={recipeError['time.minute']}
            {...register('time.minute', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className='relative h-40 mt-1'>
        <input
          onChange={() => handleFileSelected()}
          ref={inputFileRef}
          type='file'
          className='hidden'
        />
        <img
          src={thumbnail ? thumbnail : NoImage}
          className='absolute inset-0 w-full h-full object-cover rounded-md overflow-hidden'
          alt='thumbnail of recipe'
        />
        <RoundedButton
          className='absolute z-10 top-2 right-2 hover:bg-white'
          variant={RoundedButtonVariants.SECONDARY}
          rounded={RoundedButtonShape.MEDIUM}
          onClick={() => onChangeThumbnail()}
        >
          <Edit20Regular />
        </RoundedButton>
        {recipeError['image'] && (
          <span className='absolute top-full left-0 text-xs text-red-500'>
            {recipeError['image']}
          </span>
        )}
      </div>
      <Textarea
        label='description'
        variant={TextareaVariants.SECONDARY}
        placeholder='Recipe description'
        rows={4}
        error={recipeError['description']}
        {...register('description')}
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
            error={recipeError['serve']}
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
      {loading ? (
        <Button
          type={ButtonTypes.BUTTON}
          variant={ButtonVariants.PRIMARY}
          className='mt-1'
          disabled
        >
          <Spinner />
        </Button>
      ) : (
        <Button
          type={ButtonTypes.SUBMIT}
          variant={ButtonVariants.PRIMARY}
          className='mt-1'
        >
          Add
        </Button>
      )}
    </form>
  );
};

export default IntroTab;
