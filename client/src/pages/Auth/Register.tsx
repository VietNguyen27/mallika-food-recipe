import LandingImage from '@img/splash-1.jfif';
import { Link } from 'react-router-dom';
import PasswordInput from '@components/Input/PasswordInput';
import TextInput, { InputTypes } from '@components/Input/TextInput';
import Button, { ButtonTypes, ButtonVariants } from '@components/Button/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectorAuthError } from '@features/AuthSlice';
import { getErrorFromJoiMessage } from '@helpers/helpers';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function Register() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(selectorAuthError);
  const authError = getErrorFromJoiMessage(error);

  const onSubmit = handleSubmit((data: RegisterData) => {
    dispatch(registerUser(data));
  });

  return (
    <>
      <img src={LandingImage} className='rounded-t-3xl' alt='recipe landing' />
      <div className='rounded-3xl absolute top-1/4 inset-x-0 bg-white'>
        <div className='pt-5'>
          <div className='px-4 sm:px-0 text-center'>
            <h3 className='text-2xl font-medium leading-6 text-gray-900'>
              Mallika
            </h3>
            <p className='mt-1 text-sm text-gray-900'>Everyone can be a chef</p>
          </div>
        </div>
        <div className='mt-5 px-5 scrollbar-none overflow-auto h-96'>
          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12'>
                <TextInput
                  type={InputTypes.Text}
                  name='name'
                  placeholder='Name'
                  register={{ ...register('name') }}
                  error={authError['name']}
                />
              </div>
              <div className='col-span-12'>
                <TextInput
                  type={InputTypes.Email}
                  name='email'
                  placeholder='Email Address'
                  register={{ ...register('email') }}
                  error={authError['email']}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  name='password'
                  placeholder='Password'
                  register={{ ...register('password') }}
                  error={authError['password']}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  name='password_confirmation'
                  placeholder='Comfirm Password'
                  register={{ ...register('password_confirmation') }}
                  error={authError['password_confirmation']}
                />
              </div>
              <div className='col-span-12'>
                <Button
                  type={ButtonTypes.Submit}
                  fluid={true}
                  variant={ButtonVariants.Primary}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
          <div className='py-5 color-orange text-center text-sm'>
            Have any account?
            <Link to='/login' className='underline mx-1'>
              Sign in
            </Link>
            now
          </div>
          <div className='py-5 text-xs text-center'>
            <span>By continuing, you agree to our</span>
            <div className='flex justify-center items-center pt-2'>
              <a href='#' className='underline'>
                Terms of Service
              </a>
              <span className='mx-2'>.</span>
              <a href='#' className='underline'>
                Privacy Policy
              </a>
              <span className='mx-2'>.</span>
              <a href='#' className='underline'>
                Content Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
