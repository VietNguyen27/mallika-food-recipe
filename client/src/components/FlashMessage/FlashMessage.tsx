import React from 'react';
import Modal from '@components/Modal/Modal';
import Button, { ButtonSizes } from '@components/Button/Button';
import FlashSuccess from '@img/flash-success.png';
import FlashWarning from '@img/flash-warning.png';
import FlashError from '@img/flash-error.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { clearFlash, FlashMessageTypes } from '@features/flash-slice';

const FlashIcon = {
  [FlashMessageTypes.SUCCESS]: FlashSuccess,
  [FlashMessageTypes.WARNING]: FlashWarning,
  [FlashMessageTypes.ERROR]: FlashError,
};

const FlashTitle = {
  [FlashMessageTypes.SUCCESS]: 'Successful',
  [FlashMessageTypes.WARNING]: 'Something went wrong',
  [FlashMessageTypes.ERROR]: 'Error',
};

const FlashMessage = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(({ flash }: RootState) => flash);

  const onClose = () => {
    dispatch(clearFlash());
  };

  return message ? (
    <Modal isShowing={true} onClose={onClose}>
      <div className='flex flex-col items-center gap-1 text-center'>
        <img
          src={FlashIcon[type]}
          width={140}
          alt={`flash ${FlashIcon[type]} message`}
        />
        <h3 className='text-xl font-semibold'>{FlashTitle[type]}</h3>
        <div className='text-sm'>{message}</div>
      </div>
      <Button
        className='mt-4'
        size={ButtonSizes.SMALL}
        fluid={true}
        onClick={onClose}
      >
        Close
      </Button>
    </Modal>
  ) : null;
};

export default FlashMessage;
