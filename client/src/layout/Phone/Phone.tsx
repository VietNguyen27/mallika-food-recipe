import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import Signal from '@img/signal.svg';
import Wifi from '@img/wifi.svg';
import Battery from '@img/battery.svg';
import { getTime } from '@helpers/helpers';
import Wrapper from '@layout/Wrapper/Wrapper';
import ToastList from '@components/Toast/ToastList';

interface PhoneProps {
  children: ReactChild | ReactChildren;
}

const Phone = ({ children }: PhoneProps) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hour = today.getHours();
  const minute = today.getMinutes();

  return (
    <Wrapper>
      <div className='w-phone h-phone rounded-phone relative bg-black shadow-phone flex justify-center items-stretch'>
        <div className='absolute w-full h-full pointer-events-none select-none'>
          <div className='absolute z-50 top-0 left-2/4 w-40 h-6 bg-black rounded-bl-2xl rounded-br-2xl -translate-x-2/4'>
            <span className='absolute top-2/4 right-10 w-2.5 h-2.5 bg-slate-500 opacity-50 rounded-full -translate-y-3/4'></span>
            <span className='absolute top-0 right-full w-2 h-2 rounded-full shadow-tr'></span>
            <span className='absolute top-0 left-full w-2 h-2 rounded-full shadow-tl'></span>
          </div>
          <span className='absolute z-50 bottom-1 left-1/2 w-28 h-1 rounded-lg bg-black -translate-x-1/2'></span>
          <div className='relative z-50 w-full flex justify-between px-5 pt-1.5'>
            <span className='font-medium'>{getTime(hour, minute)}</span>
            <div className='flex gap-1'>
              <img src={Signal} width={16} alt='signal icon' />
              <img src={Wifi} width={16} alt='wifi icon' />
              <img src={Battery} width={16} alt='battery icon' />
            </div>
          </div>
          <span className='absolute left-full top-36 inline-block w-0.5 h-24 bg-black ml-3 rounded-tr-md rounded-br-md'></span>
          <span className='absolute right-full top-24 inline-block w-0.5 h-10 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
          <span className='absolute right-full top-40 inline-block w-0.5 h-12 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
          <span className='absolute right-full top-56 inline-block w-0.5 h-12 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
        </div>
        <main className='relative bg-white w-full h-full rounded-phone pt-9 pb-6 overflow-hidden'>
          {children}
          <ToastList />
        </main>
      </div>
    </Wrapper>
  );
};

export default Phone;
