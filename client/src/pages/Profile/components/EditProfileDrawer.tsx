import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { selectorUser, updateUser } from '@features/auth-slice';
import TextInput, {
  InputTypes,
  InputVariants,
} from '@components/Input/TextInput';
import { useForm } from 'react-hook-form';
import Button, { ButtonTypes } from '@components/Button/Button';
import { generateBase64Image } from '@helpers/helpers';
import { Camera28Regular } from '@fluentui/react-icons';

export interface UpdateUserData {
  name: string;
  bio: string;
}

const EditProfileDrawer = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const user = useSelector(selectorUser);
  const active = useSelector(
    ({ ui }: RootState) => ui.editProfileDrawerShowing
  );

  const onCloseDrawer = () => {
    dispatch(uiActions.setEditProfileDrawerShowing(false));
    reset(user);
  };

  const onSubmit = (data) => {
    const userEdited = {
      _id: user._id,
      ...data,
    };
    dispatch(updateUser(userEdited));
  };

  return (
    <Drawer title='Edit Profile' open={active} onClose={() => onCloseDrawer()}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-stretch h-full px-3 pb-3'
      >
        <div className='flex items-center py-3 mb-3 border-b border-gray-300'>
          <div className='relative w-14 h-14 mr-3 rounded-full overflow-hidden'>
            <img
              src={generateBase64Image(user.avatar)}
              className='absolute inset-0'
              alt={user.name}
            />
          </div>
          <button
            type='button'
            className='inline-flex items-center gap-2 text-orange font-light'
          >
            <Camera28Regular />
            Edit photo
          </button>
        </div>
        <TextInput
          type={InputTypes.Text}
          variant={InputVariants.Secondary}
          name='email'
          defaultValue={user.email}
          placeholder='Enter your email address'
          label='email'
          className='mb-4'
          readOnly={true}
        />
        <TextInput
          type={InputTypes.Text}
          variant={InputVariants.Secondary}
          name='name'
          defaultValue={user.name}
          placeholder='Enter profile name'
          label='profile name'
          className='mb-4'
          register={{ ...register('name') }}
        />
        <TextInput
          type={InputTypes.Text}
          variant={InputVariants.Secondary}
          name='bio'
          defaultValue={user.bio}
          placeholder='Enter your bio'
          label='bio'
          className='mb-4'
          register={{ ...register('bio') }}
        />
        <Button type={ButtonTypes.Submit} className='mt-auto'>
          Save Changes
        </Button>
      </form>
    </Drawer>
  );
};

export default EditProfileDrawer;
