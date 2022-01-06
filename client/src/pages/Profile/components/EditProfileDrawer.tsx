import React, { useRef, useState } from 'react';
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
import Button, { ButtonTypes, ButtonVariants } from '@components/Button/Button';
import { convertBase64, generateBase64Image } from '@helpers/helpers';
import { Camera28Regular } from '@fluentui/react-icons';
import { createToast } from '@features/toast-slice';
import { ToastTypes } from '@components/Toast/ToastItem';

export interface UpdateUserData {
  name: string;
  bio: string;
}

const EditProfileDrawer = () => {
  const [avatar, setAvatar] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const inputFileRef: any = useRef(null);
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue } = useForm();
  const user = useSelector(selectorUser);
  const active = useSelector(
    ({ ui }: RootState) => ui.editProfileDrawerShowing
  );

  const onCloseDrawer = (): void => {
    dispatch(uiActions.setEditProfileDrawerShowing(false));
    setIsEdited(false);
    reset(user);
  };

  const onChangeAvatar = (): void => {
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
      setAvatar(imageBase64);
      setValue('avatar', {
        base64,
        imageFormat: imageFormat.split('/')[1],
      });
      setIsEdited(true);
    }
  };

  const onSubmit = async (data): Promise<void> => {
    const userEdited = {
      _id: user._id,
      ...data,
    };

    await dispatch(updateUser(userEdited));
    setIsEdited(false);
    dispatch(
      createToast({
        message: 'Profile update successful!',
        type: ToastTypes.SUCCESS,
      })
    );
  };

  return (
    <Drawer title='Edit Profile' open={active} onClose={() => onCloseDrawer()}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-stretch h-full px-3 pb-3'
      >
        <div className='flex items-center py-3 mb-3 border-b border-gray-300'>
          <input
            onChange={() => handleFileSelected()}
            ref={inputFileRef}
            type='file'
            className='hidden'
          />
          <div className='relative w-14 h-14 mr-3 rounded-full overflow-hidden'>
            <img
              src={avatar || generateBase64Image(user.avatar)}
              className='absolute inset-0'
              alt={user.name}
            />
          </div>
          <button
            type='button'
            className='inline-flex items-center gap-2 text-orange font-light'
            onClick={() => onChangeAvatar()}
          >
            <Camera28Regular />
            Edit photo
          </button>
        </div>
        <TextInput
          type={InputTypes.TEXT}
          variant={InputVariants.SECONDARY}
          name='email'
          defaultValue={user.email}
          placeholder='Enter your email address'
          label='email'
          className='mb-4'
          readOnly={true}
        />
        <TextInput
          type={InputTypes.TEXT}
          variant={InputVariants.SECONDARY}
          name='name'
          defaultValue={user.name}
          placeholder='Enter profile name'
          label='profile name'
          className='mb-4'
          register={{
            ...register('name', {
              onChange: () => setIsEdited(true),
            }),
          }}
        />
        <TextInput
          type={InputTypes.TEXT}
          variant={InputVariants.SECONDARY}
          name='bio'
          defaultValue={user.bio}
          placeholder='Enter your bio'
          label='bio'
          className='mb-4'
          register={{
            ...register('bio', {
              onChange: () => setIsEdited(true),
            }),
          }}
        />
        <Button
          type={ButtonTypes.SUBMIT}
          variant={isEdited ? ButtonVariants.PRIMARY : ButtonVariants.DISABLED}
          className='mt-auto'
          disabled={!isEdited}
        >
          Save Changes
        </Button>
      </form>
    </Drawer>
  );
};

export default EditProfileDrawer;
