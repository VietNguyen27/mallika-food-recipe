import React from 'react';
import LogoImage from '@img/logo.png';
import LandingImage from '@img/landing-page.jpg';
import Button, { ButtonAs, ButtonVariants } from '@components/Button/Button';

const Landing = () => {
  return (
    <div className='h-full px-4'>
      <div className='relative h-2/5'>
        <img
          src={LandingImage}
          className='absolute w-full h-full rounded-2xl object-cover'
          alt=''
        />
      </div>
      <div className='flex flex-col h-3/5 pt-6'>
        <img src={LogoImage} width={40} alt='logo of mallika food recipe app' />
        <h1 className='font-bold text-4xl pt-5 pb-2'>Mallika</h1>
        <p>A Better Way to Organize Your Recipe</p>
        <p className='text-sm pt-2'>
          With Mallika you can easily save recipes from any website, save
          adjustments to ingredients, and add additional steps or tips to your
          preparation.
        </p>
        <div className='flex flex-col gap-3 mt-auto'>
          <Button
            as={ButtonAs.LINK}
            to='/login'
            variant={ButtonVariants.PRIMARY}
            fluid={true}
          >
            Login
          </Button>
          <Button
            as={ButtonAs.LINK}
            to='/register'
            variant={ButtonVariants.SECONDARY}
            fluid={true}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
