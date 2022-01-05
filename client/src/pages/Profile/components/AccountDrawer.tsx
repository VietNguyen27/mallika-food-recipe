import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { logout, selectorUser } from '@features/auth-slice';
import { generateBase64Image } from '@helpers/helpers';
import {
  Heart24Regular,
  Alert24Regular,
  Edit24Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const AccountDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector(selectorUser);
  const active = useSelector(({ ui }: RootState) => ui.accountDrawerShowing);

  const onLogout = (): void => {
    navigate('/login');
    dispatch(logout());
    dispatch(uiActions.setAccountDrawerShowing(false));
  };

  return (
    <Drawer
      title='Account'
      open={active}
      onClose={() => dispatch(uiActions.setAccountDrawerShowing(false))}
    >
      <div className='flex flex-col items-stretch px-3.5'>
        <div className='py-3.5 border-b border-gray-400'>
          <div className='flex justify-between items-center gap-2'>
            <div>
              <p className='text-xl font-medium'>{user.name}</p>
              <p className='text-sm text-gray-800'>{user.email}</p>
            </div>
            <img
              src={generateBase64Image(user.avatar)}
              alt={`avatar of ${user.name}`}
              className='flex-shrink-0 rounded-full w-14'
            />
          </div>
        </div>
        <div className='py-3.5 border-b border-gray-400'>
          <div className='flex items-stretch gap-4'>
            <button className='flex-1 inline-flex flex-col justify-center items-center'>
              <Heart24Regular />
              <span className='text-sm text-gray-800 mt-3'>Liked Recipe</span>
            </button>
            <button className='flex-1 inline-flex flex-col justify-center items-center'>
              <Alert24Regular />
              <span className='text-sm text-gray-800 mt-3'>Notifications</span>
            </button>
            <button className='flex-1 inline-flex flex-col justify-center items-center'>
              <Edit24Regular />
              <span className='text-sm text-gray-800 mt-3'>Edit Profile</span>
            </button>
          </div>
        </div>
        <div className='pt-4'>
          <h4 className='text-xl'>General</h4>
          <ul>
            <li className='my-2.5'>
              <button className='w-full flex justify-between items-center'>
                About
                <ChevronRight20Regular />
              </button>
            </li>
            <li className='my-2.5'>
              <button className='w-full flex justify-between items-center'>
                Help &amp; Support
                <ChevronRight20Regular />
              </button>
            </li>
            <li className='my-2.5'>
              <button className='w-full flex justify-between items-center'>
                Send Feedback
                <ChevronRight20Regular />
              </button>
            </li>
            <li className='my-2.5'>
              <button className='w-full flex justify-between items-center'>
                Rate Us
                <ChevronRight20Regular />
              </button>
            </li>
            <li className='my-2.5'>
              <button className='w-full flex justify-between items-center'>
                Check for Update
                <ChevronRight20Regular />
              </button>
            </li>
            <li className='my-2.5'>
              <button
                className='w-full flex justify-between items-center'
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default AccountDrawer;
