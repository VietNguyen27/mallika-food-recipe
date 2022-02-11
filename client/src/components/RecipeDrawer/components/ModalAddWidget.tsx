import React, { useEffect, useState } from 'react';
import TextInput from '@components/Input/TextInput';
import Modal from '@components/Modal/Modal';
import Switch, { SwitchSizes } from '@components/Switch/Switch';
import Button, { ButtonSizes, ButtonTypes } from '@components/Button/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uuid } from '@helpers/helpers';
import {
  createRecipeWidget,
  clearError,
  editRecipeWidget,
} from '@features/recipe-slice';
import { RootState } from '@redux/reducers';

interface ModalAddWidgetProps {
  type: string;
  isShowing: boolean;
  editable?: boolean;
  inputValue?: any;
  setInputValue: (inputValue: any) => void;
  setEditable?: (editable: boolean) => void;
  toggle: () => void;
}

const ModalAddWidget: React.FC<ModalAddWidgetProps> = ({
  type,
  isShowing,
  editable,
  inputValue,
  setInputValue,
  setEditable,
  toggle,
}) => {
  const typeTitle = type === 'ingredients' ? 'Ingredient' : 'Step';
  const modalTitle = editable
    ? `Edit selected ${typeTitle}`
    : `Add new ${typeTitle}`;
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const recipe = useSelector(({ recipe }: RootState) => recipe);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (editable) {
      toggle();
      setValue('title', inputValue.title);
    }
  }, [editable]);

  const onSubmit = handleSubmit((data) => {
    const { title } = data;

    if (title.trim().length === 0) {
      return setError(`${typeTitle} is not allowed to be empty`);
    }

    if (editable) {
      const { _id } = recipe[type][inputValue.index];

      dispatch(
        editRecipeWidget({ type, _id, title, isHeader: inputValue.isHeader })
      );
      setEditable && setEditable(false);
      setInputValue({
        title: '',
        isHeader: false,
      });
      toggle();
    } else {
      const _id = uuid();
      const newWidget = {
        ...data,
        type,
        _id,
        isHeader: inputValue.isHeader || false,
      };
      dispatch(createRecipeWidget(newWidget));
    }

    dispatch(clearError(type));
    setValue('title', '');
    setError('');
  });

  const onClose = () => {
    setValue('title', '');
    setEditable && setEditable(false);
    setInputValue({
      title: '',
      isHeader: false,
    });
    setError('');
    toggle();
  };

  return (
    <Modal title={modalTitle} isShowing={isShowing} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <TextInput
          placeholder='Type something'
          className='mt-4 mb-5'
          inputClassName='py-1 px-2'
          error={error}
          autoFocus={true}
          {...register('title', {
            onChange: () => setError(''),
            onBlur: (e) => setValue('title', e.target.value.trim()),
          })}
        />
        <div className='flex justify-between items-center pb-4'>
          <span className='text-sm text-gray-800'>Set it item?</span>
          <Switch
            active={inputValue.isHeader}
            size={SwitchSizes.EXTRA_SMALL}
            toggle={() =>
              setInputValue({
                ...inputValue,
                isHeader: !inputValue.isHeader,
              })
            }
          />
        </div>
        <Button
          type={ButtonTypes.SUBMIT}
          size={ButtonSizes.EXTRA_SMALL}
          fluid={true}
        >
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddWidget;
