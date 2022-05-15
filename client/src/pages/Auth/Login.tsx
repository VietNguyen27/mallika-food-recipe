import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import { Spinner } from '@components/Loading';
import { RootState } from '@redux/reducers';
import { clearError, loginUser } from '@features/auth-slice';
import { FlashMessageTypes, showFlash } from '@features/flash-slice';
import LandingImage from '@img/landing-page.jfif';
import GoogleLogo from '@img/google-logo.svg';
import FacebookLogo from '@img/facebook-logo.svg';

export interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error } = useSelector(({ auth }: RootState) => auth);
  const loading = useSelector(({ loading }: RootState) => loading.authLoading);

  useEffect(() => {
    if (Object.keys(error).length) {
      const { message } = error as any;

      dispatch(
        showFlash({
          message,
          type: FlashMessageTypes.ERROR,
        })
      );
    }

    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate, error]);

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
                  type='text'
                  placeholder='Email Address'
                  {...register('email', {
                    onChange: (e) => {
                      const { value: email } = e.target;
                      const { password } = getValues();

                      if (email.trim().length && password.trim().length) {
                        setIsValid(true);
                      } else {
                        setIsValid(false);
                      }
                      dispatch(clearError());
                    },
                    onBlur: (e) => setValue('email', e.target.value.trim()),
                  })}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  placeholder='Password'
                  {...register('password', {
                    onChange: (e) => {
                      const { value: password } = e.target;
                      const { email } = getValues();

                      if (email.trim().length && password.trim().length) {
                        setIsValid(true);
                      } else {
                        setIsValid(false);
                      }
                      dispatch(clearError());
                    },
                    onBlur: (e) => setValue('password', e.target.value.trim()),
                  })}
                />
              </div>
              <div className='col-span-12 leading-none'>
                {loading ? (
                  <Button variant='primary' type='button' fluid={true} disabled>
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    variant={isValid ? 'primary' : 'disabled'}
                    type={isValid ? 'submit' : 'button'}
                    fluid={true}
                    disabled={!isValid}
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
                variant='secondary'
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
                variant='secondary'
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
