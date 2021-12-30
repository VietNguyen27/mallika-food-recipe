import React, { ReactChild, ReactChildren } from 'react';

interface WrapperProps {
  children: ReactChild | ReactChildren;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex justify-center items-center'>
      {children}
    </div>
  );
};

export default Wrapper;
