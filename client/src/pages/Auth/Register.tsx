import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import { Spinner } from '@components/Loading';
import { RootState } from '@redux/reducers';
import { clearError, registerUser } from '@features/auth-slice';
import { FlashMessageTypes, showFlash } from '@features/flash-slice';
import LandingImage from '@img/splash-1.jfif';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function Register() {
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

  const onSubmit = handleSubmit((data: RegisterData) => {
    dispatch(registerUser(data));
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const formValues = getValues();
    const allValues = {
      ...formValues,
      [name]: value,
    };

    const isValid = Object.values(allValues).every(
      (value: any) => value.trim().length
    );

    setIsValid(isValid);
    dispatch(clearError());
  };

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
        <div className='mt-5 px-layout scrollbar-none overflow-auto h-96'>
          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12'>
                <TextInput
                  type='text'
                  placeholder='Name'
                  {...register('name', {
                    onChange,
                    onBlur: (e) => setValue('name', e.target.value.trim()),
                  })}
                />
              </div>
              <div className='col-span-12'>
                <TextInput
                  type='text'
                  placeholder='Email Address'
                  {...register('email', {
                    onChange,
                    onBlur: (e) => setValue('email', e.target.value.trim()),
                  })}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  placeholder='Password'
                  {...register('password', {
                    onChange,
                    onBlur: (e) => setValue('password', e.target.value.trim()),
                  })}
                />
              </div>
              <div className='col-span-12'>
                <PasswordInput
                  placeholder='Confirm Password'
                  {...register('password_confirmation', {
                    onChange,
                    onBlur: (e) =>
                      setValue('password_confirmation', e.target.value.trim()),
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
                    Sign up
                  </Button>
                )}
              </div>
            </div>
          </form>
          <div className='pt-5 color-orange text-center text-sm'>
            Have any account?
            <Link to='/login' className='underline mx-1'>
              Sign in
            </Link>
            now
          </div>
          <div className='py-5 text-xs text-center'>
            <span>By continuing, you agree to our</span>
            <div className='flex justify-center items-center pt-2'>
              <Link to='/#' className='underline'>
                Terms of Service
              </Link>
              <span className='mx-1'>·</span>
              <Link to='/#' className='underline'>
                Privacy Policy
              </Link>
              <span className='mx-1'>·</span>
              <Link to='/#' className='underline'>
                Content Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
