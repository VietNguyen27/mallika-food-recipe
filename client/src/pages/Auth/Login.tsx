import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingImage from '@img/landing-page.jfif';
import GoogleLogo from '@img/google-logo.svg';
import FacebookLogo from '@img/facebook-logo.svg';
import PasswordInput from '@components/Input/PasswordInput';
import TextInput, { InputTypes } from '@components/Input/TextInput';
import Button, { ButtonTypes, ButtonVariants } from '@components/Button/Button';
import { getErrorFromJoiMessage } from '@helpers/helpers';
import { loginUser } from '@features/auth-slice';
import { Spinner } from '@components/Loading/Loading';
import { RootState } from '@redux/reducers';
import { useEffect } from 'react';

export interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isLoggedIn, error } = useSelector(
    ({ auth }: RootState) => auth
  );
  const authError = getErrorFromJoiMessage(error);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = handleSubmit((data: LoginData) => {
    dispatch(loginUser(data));
  });

  return (
    <>
      <img src={LandingImage} className='rounded-t-3xl' alt='recipe landing' />
      <div className='rounded-3xl absolute top-1/4 inset-x-0 bg-white'>
        <div className='pt-5'>
          <div className='text-center'>
            <h3 className='text-2xl font-medium leading-6 text-gray-900'>
              Mallika
            </h3>
            <p className='mt-1 text-sm text-gray-900'>Everyone can be a chef</p>
          </div>
        </div>
        <div className='mt-5 px-layout'>
          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12'>
                <TextInput
                  type={InputTypes.TEXT}
                  placeholder='Email Address'
                  error={authError['email']}
                  {...register('email')}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  placeholder='Password'
                  {...register('password')}
                  error={authError['password']}
                />
              </div>
              <div className='col-span-12 leading-none'>
                {loading ? (
                  <Button
                    variant={ButtonVariants.PRIMARY}
                    type={ButtonTypes.BUTTON}
                    fluid={true}
                    disabled
                  >
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    variant={ButtonVariants.PRIMARY}
                    type={ButtonTypes.SUBMIT}
                    fluid={true}
                  >
                    Sign in
                  </Button>
                )}
              </div>
            </div>
          </form>
          <div className='flex justify-center py-5'>
            <div className='w-4/5 grid grid-cols-12 gap-4 justify-center items-center'>
              <span className='col-span-5 h-px bg-gray-600'></span>
              <span className='col-span-2 text-center text-gray-600'>OR</span>
              <span className='col-span-5 h-px bg-gray-600'></span>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-6'>
              <Button
                variant={ButtonVariants.SECONDARY}
                children='Facebook'
                fluid={true}
                prefix={
                  <img
                    src={FacebookLogo}
                    width={16}
                    className='mr-2'
                    alt='facebook logo'
                  />
                }
              />
            </div>
            <div className='col-span-6'>
              <Button
                variant={ButtonVariants.SECONDARY}
                children='Google'
                fluid={true}
                prefix={
                  <img
                    src={GoogleLogo}
                    width={16}
                    className='mr-2'
                    alt='google logo'
                  />
                }
              />
            </div>
            <div className='col-span-12 color-orange text-center text-sm'>
              Don't have an account?
              <Link to='/register' className='underline mx-1'>
                Sign up
              </Link>
              now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
