import React from 'react';
import RydeProLogo from '@/public/svgs/logo_black.svg';
import Image from 'next/image';
import PopUp from '../PopUp/popUpDesign';

const Success = ({ authChanged }: { authChanged: string }) => {
  return (
    <PopUp>
      {' '}
      <div className=' bg-[#FFFFFF] rounded-3xl gap-12'>
        {/* <Image
          src={RydeProLogo}
          alt='Rydepro Logo'
          width={72}
          height={72}
          className=' w-[72px] h-[72px]'
        /> */}
        <div className=' flex flex-col items-center gap-4 w-full justify-center'>
          <svg
            width='76'
            height='76'
            viewBox='0 0 76 76'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M37.6697 6.5564C54.8519 6.5564 68.7808 20.4853 68.7808 37.6675C68.7808 54.8497 54.8519 68.7786 37.6697 68.7786C20.4875 68.7786 6.55859 54.8497 6.55859 37.6675C6.55859 20.4853 20.4875 6.5564 37.6697 6.5564ZM47.6865 28.2398L33.7808 42.1455L27.653 36.0176C26.7417 35.1064 25.2643 35.1064 24.3531 36.0176C23.4419 36.9288 23.4419 38.4062 24.3531 39.3174L32.1309 47.0952C33.0421 48.0064 34.5195 48.0064 35.4307 47.0952L50.9863 31.5396C51.8975 30.6284 51.8975 29.151 50.9863 28.2398C50.0751 27.3286 48.5977 27.3286 47.6865 28.2398Z'
              fill='#0C8418'
            />
          </svg>
          <span className=' text-[#0C8418] text-lg '>
            {authChanged} has been successfully reset
          </span>
        </div>
      </div>
    </PopUp>
  );
};

export default Success;
