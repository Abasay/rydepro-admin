'use client';
import { useResetContext } from '@/contexts/ResetContext';
import bgImg from '@/public/newBg.jpeg';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import RydeProLogo from '@/public/svgs/logo_black.svg';
import Link from 'next/link';

const GeneralDesign = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false); // Initialize to false
  const { nav, setNav, authRecovered, setAuthRecovered } = useResetContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check window width on client-side only
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
    };

    // Run the width check immediately on mount
    checkWidth();

    // Add event listeners for resize and orientation change
    window.addEventListener('resize', checkWidth);
    window.addEventListener('orientationchange', checkWidth);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('orientationchange', checkWidth);
    };
  }, []);

  useEffect(() => {
    // Preload image on client-side
    const image = new window.Image();
    image.src = bgImg.src;
    image.onload = () => setIsLoaded(true);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setNav({ ...nav, isSuccess: false });
      setAuthRecovered('');
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (isLaptop) {
    return (
      <>
        {authRecovered && <div className=' bg-[#000000] opacity-40 w-full h-full absolute z-50 top-0'></div>}
        <section className={`bg-white w-full min-h-[100vh] flex ${nav.isSuccess && 'filter brightness-50'}`}>
          <form action='' className='w-1/2 px-[26px] py-[24px]'>
            <div className=' min-w-[450px] max-w-[700px] mx-auto '>{children}</div>
          </form>
          {/**image section */}
          {/* <div
            className='w-[50%] min-h-[100vh] bg-gray-500 transition duration-500'
            style={image}></div> */}
          <div
            className='sticky
          overflow-y-hidden w-1/2 h-[100vh] right-0 top-0'
          >
            <Image
              src={bgImg}
              alt='Background Image'
              layout='fill'
              objectFit='cover'
              priority
              placeholder='blur'
              className=' w-full h-full'
            />

            <div className=' z-10 w-full h-full bg-black bg-opacity-45 absolute top-0'></div>
          </div>
        </section>
        {/**succesful reset */}
        {nav.isSuccess && (
          <section
            ref={ref}
            className='absolute transition duration-500 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[624px] h-[380px] rounded-[24px] gap-[48px] bg-[#FFFFFF] py-[48px] px-[72px] z-50 flex justify-center shadow-xl'
          >
            <div className='flex flex-col items-center justify-between'>
              <Image src={RydeProLogo} alt='' width={77} height={64} />
              <div className='flex flex-col h-[136px] items-center justify-between'>
                <svg width='63' height='63' viewBox='0 0 63 63' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M31.6658 0.556641C48.848 0.556641 62.7769 14.4856 62.7769 31.6678C62.7769 48.8499 48.848 62.7789 31.6658 62.7789C14.4836 62.7789 0.554688 48.8499 0.554688 31.6678C0.554688 14.4856 14.4836 0.556641 31.6658 0.556641ZM41.6826 22.2401L27.7769 36.1457L21.649 30.0178C20.7378 29.1066 19.2604 29.1066 18.3492 30.0178C17.438 30.9291 17.438 32.4064 18.3492 33.3177L26.127 41.0954C27.0382 42.0067 28.5156 42.0067 29.4268 41.0954L44.9824 25.5399C45.8936 24.6287 45.8936 23.1513 44.9824 22.2401C44.0712 21.3288 42.5938 21.3288 41.6826 22.2401Z'
                    fill='#0C8418'
                  />
                </svg>
                <span className='text-[18px] leading-[24px] text-center text-[#0C8418] font-normal'>
                  {authRecovered} has been successfully reset
                </span>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen text-center text-gray-700 px-4'>
      <p>
        This platform is not optimized for use on mobile phones and Tablets. Please switch to a laptop or desktop. Thank
        you!
      </p>
    </div>
  );
};

export default GeneralDesign;
