import React, { ReactChild, ReactChildren, useEffect, useState } from 'react';
import Signal from '@img/signal.svg';
import Wifi from '@img/wifi.svg';
import Battery from '@img/battery.svg';
import { getTime } from '@helpers/helpers';
import Wrapper from '@layout/Wrapper/Wrapper';

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
          <div className='absolute top-0 left-2/4 w-40 h-6 bg-black rounded-bl-2xl rounded-br-2xl -translate-x-2/4'>
            <span className='absolute top-2/4 right-10 w-2.5 h-2.5 bg-slate-500 opacity-50 rounded-full -translate-y-3/4'></span>
            <span className='absolute top-0 right-full w-2 h-2 rounded-full shadow-tr'></span>
            <span className='absolute top-0 left-full w-2 h-2 rounded-full shadow-tl'></span>
          </div>
          <div className='w-full flex justify-between px-5 py-0.5'>
            <span className='font-medium'>{getTime(hour, minute)}</span>
            <div className='flex gap-1'>
              <img src={Signal} width={16} />
              <img src={Wifi} width={16} />
              <img src={Battery} width={16} />
            </div>
          </div>
          <span className='absolute left-full top-36 inline-block w-0.5 h-24 bg-black ml-3 rounded-tr-md rounded-br-md'></span>
          <span className='absolute right-full top-24 inline-block w-0.5 h-10 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
          <span className='absolute right-full top-40 inline-block w-0.5 h-12 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
          <span className='absolute right-full top-56 inline-block w-0.5 h-12 bg-black mr-3 rounded-tl-md rounded-bl-md'></span>
        </div>
        <div className='bg-white w-full h-full rounded-phone pt-9 pb-6 overflow-hidden'>
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default Phone;
