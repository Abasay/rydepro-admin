import Image from 'next/image';
import React from 'react';

interface ComponentProps {
  img: any;
  model: string;
  deviceType: string;
  time: string;
  date: string;
  platform: string;
  coordinates: { lat: number; lng: number };
  city: string;
  country: string;
  onClick: () => void;
  idx: number;
}

const Component: React.FC<ComponentProps> = ({
  img,
  model,
  deviceType,
  time,
  date,
  platform,
  coordinates,
  city,
  country,
  onClick,
  idx,
}) => {
  return (
    <section
      key={idx}
      className='flex items-start w-[608px] h-[188px] rounded-[16px] border-[1px] p-[24px] gap-[16px] border-[#EBEBEB]'
    >
      <Image src={img} alt={''} width={64} height={64} className='w-[64px] h-[64px]' />
      <div className='w-[480px] h-[140px] gap-[16px] flex flex-col'>
        <div className='h-[60px] flex justify-between'>
          <div className='w-[174px] flex flex-col gap-[4px]'>
            <h2 className='text-[20px] leading-[32px] font-medium text-[#2B2B2B]'>{model}</h2>
            <span className='text-base leading-[24px] font-normal text-[#555555]'>{deviceType}</span>
          </div>
          <button
            type='button'
            title='Sign Out'
            onClick={onClick}
            className='min-w-[119px] h-[40px] rounded-[8px] border-[1px] py-[8px] px-[16px] gap-[8px] border-[#D21B34] flex items-center'
          >
            <span className='text-base leading-[24px] text-[#D21B34] font-medium'> Sign Out</span>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.5 9.25C6.91421 9.25 7.25 8.91422 7.25 8.5C7.25 8.08579 6.91421 7.75 6.5 7.75C6.08579 7.75 5.75 8.08579 5.75 8.5C5.75 8.91422 6.08579 9.25 6.5 9.25ZM9 1.5C9 1.3542 8.93636 1.21567 8.82575 1.12068C8.71514 1.02569 8.56857 0.983714 8.42445 1.00574L1.42445 2.07574C1.18032 2.11306 1 2.32303 1 2.57V13.43C1 13.6769 1.18028 13.8869 1.42438 13.9243L8.42438 14.9953C8.56851 15.0173 8.71509 14.9754 8.82572 14.8804C8.93635 14.7854 9 14.6468 9 14.501V8.00002L14.1722 8.00002L13.1753 8.87372C12.9679 9.05556 12.9468 9.37144 13.1284 9.57926C13.3099 9.78708 13.6253 9.80814 13.8328 9.6263L15.8295 7.8763C15.9379 7.78135 16 7.64419 16 7.50001C16 7.35583 15.9379 7.21867 15.8295 7.12372L13.8328 5.37372C13.6253 5.19188 13.3099 5.21294 13.1284 5.42076C12.9468 5.62858 12.9679 5.94446 13.1753 6.1263L14.1723 7.00002L9 7.00002V1.5ZM8 2.08224V13.9187L2 13.0007V2.99938L8 2.08224ZM10.5 14H10V9H11V13.5C11 13.7761 10.7761 14 10.5 14ZM10 6V2H10.5C10.7761 2 11 2.22386 11 2.5V6H10Z'
                fill='#D21B34'
              />
            </svg>
          </button>
        </div>

        <div className='min-h-[24px] flex justify-between'>
          <span className='text-base leading-[24px] font-normal text-[#555555]'>{platform}</span>
          <span className='text-base leading-[24px] font-normal text-[#555555]'>
            Lat:{coordinates.lat}, Long:{coordinates.lng},
          </span>
        </div>

        <div className='min-h-[24px] flex justify-between'>
          <span className='text-base leading-[24px] font-normal text-[#555555] flex gap-[10px] items-center'>
            <span>{time}</span>{' '}
            <svg width='6' height='5' viewBox='0 0 6 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.01619 4.968C1.81619 4.968 0.808188 3.976 0.808188 2.792C0.808188 1.608 1.80019 0.6 3.01619 0.6C4.20019 0.6 5.19219 1.608 5.19219 2.792C5.19219 3.96 4.20019 4.968 3.01619 4.968Z'
                fill='#555555'
              />
            </svg>
            <span>{date}</span>
          </span>
          <span className='text-base leading-[24px] font-normal text-[#555555]'>
            {city}, {country}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Component;
