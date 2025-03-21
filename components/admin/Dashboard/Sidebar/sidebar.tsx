'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import RydeProLogo from '@/public/svgs/logo_black.svg';
import { useDashboardContext } from '@/contexts/DashboardContext';
import styles from '@/styles/common.module.css';
import AdvancedSearch from '../DataBase/AdvancedSearch';
import { useDB } from '@/contexts/DBContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useLogInContext } from '@/contexts/LoginContext';
import profileDummy from './profile.png';

const Sidebar = () => {
  const { isSettingsClicked, setIsSettingsClicked } = useDashboardContext();
  const { userLoginCredentials } = useLogInContext();
  const { advancedSearch, setActiveHeader } = useDB();
  const [showRiderTypes, setShowRiderTypes] = useState<boolean>(false);
  const [showDriverTypes, setShowDriverTypes] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const router = useRouter();

  return (
    <aside
      className={`min-w-[280px] max-w-[280px] h-[873px] overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#FFFFFF] border-r-[1px] pb-[32px] gap-[32px] flex flex-col border-[#F1F1F1] ${
        advancedSearch ? styles['slide-from-left'] : styles['slide-from-right']
      }`}
    >
      <section className='flex flex-col'>
        <div className='h-[100px] border-r-[1px] flex gap-[32px] justify-center items-center'>
          <Image src={RydeProLogo} alt='' width={78} height={64} className='h-[70px] w-[77.42px]' />
        </div>
        {!advancedSearch ? (
          <>
            <div className=' flex flex-col gap-6'>
              <div className=' relative flex gap-2 px-4 mx-auto items-center justify-center py-3 min-w-[200px] border-b rounded-lg max-w-[208px] min-h-[45px] max-h-[48px]'>
                <span className=''>
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9.30887 10.016C8.53903 10.6318 7.56252 11 6.5 11C4.01472 11 2 8.98531 2 6.50002C2 4.01473 4.01472 2 6.5 2C8.98528 2 11 4.01473 11 6.50002C11 7.56252 10.6318 8.53901 10.016 9.30885L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L9.30887 10.016ZM10 6.50002C10 4.56701 8.433 3 6.5 3C4.567 3 3 4.56701 3 6.50002C3 8.43302 4.567 10 6.5 10C8.433 10 10 8.43302 10 6.50002Z'
                      fill='#0E0E0E'
                    />
                  </svg>
                </span>
                <input
                  type='text'
                  placeholder='Search'
                  className=' w-full h-full outline-none focus-within:outline-none placeholder:text-[#8A8A8A] font-[400] text-[16px] leading-6'
                />
              </div>

              <div className=' flex flex-col gap-4'>
                <div className=' relative flex flex-col gap-2  mx-auto py-1 pb-6 min-w-[200px] border-b max-w-[208px] border-[#EBEBEB]'>
                  <h3 className=' text-[#8A8A8A] font-[400] text-xs font-satoshi tracking-widest'>HEADER</h3>
                  <div className=' flex flex-col gap-[6px]'>
                    <button
                      className='px-2 py-[6px] gap-4 flex items-center '
                      onClick={() => setActiveHeader('Booking Table - Admin')}
                    >
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M5 8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8ZM8 6C6.89543 6 6 6.89543 6 8V9.05767L11.5 9.00478V6H8ZM12.5 6V14H18V8C18 6.89543 17.1046 6 16 6H12.5ZM18 15H12.5V18H16C17.1046 18 18 17.1046 18 16V15ZM11.5 18V10.0048L6 10.0577V16C6 17.1046 6.89543 18 8 18H11.5Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Booking Table</span>
                    </button>
                    <div className='px-2 py-[6px] gap-4 flex items-center '>
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M5 8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8ZM8 6C6.89543 6 6 6.89543 6 8V9.05767L11.5 9.00478V6H8ZM12.5 6V14H18V8C18 6.89543 17.1046 6 16 6H12.5ZM18 15H12.5V18H16C17.1046 18 18 17.1046 18 16V15ZM11.5 18V10.0048L6 10.0577V16C6 17.1046 6.89543 18 8 18H11.5Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Overview</span>
                    </div>
                  </div>
                </div>

                <div className=' relative flex flex-col gap-2 mx-auto py-1 pb-6 min-w-[200px] border-b max-w-[208px] border-[#EBEBEB]'>
                  <h3 className=' text-[#8A8A8A] font-[400] text-xs font-satoshi tracking-widest'>BUSINESS</h3>
                  <div className=' flex flex-col gap-[6px]'>
                    <div className='px-2 py-[6px] gap-4 flex items-center '>
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M5 8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8ZM8 6C6.89543 6 6 6.89543 6 8V9.05767L11.5 9.00478V6H8ZM12.5 6V14H18V8C18 6.89543 17.1046 6 16 6H12.5ZM18 15H12.5V18H16C17.1046 18 18 17.1046 18 16V15ZM11.5 18V10.0048L6 10.0577V16C6 17.1046 6.89543 18 8 18H11.5Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <div
                        className=' flex justify-between w-full items-center cursor-pointer'
                        onClick={() => {
                          setIsSettingsClicked(false);
                          setShowRiderTypes(!showRiderTypes);
                          setActiveHeader('All Users');
                        }}
                      >
                        <span className=' text-[#3C3C3C] text-sm font-medium'>Users</span>
                        {
                          <span>
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className={`${showRiderTypes && 'rotate-180'} `}
                            >
                              <path
                                d='M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z'
                                fill='#111111'
                              />
                            </svg>
                          </span>
                        }
                      </div>
                    </div>
                    {showRiderTypes && (
                      <div>
                        {['All Users', 'Individual', 'Organization'].map((item, index) => (
                          <div
                            key={index}
                            className='px-2 py-[6px] gap-4 flex items-center cursor-pointer '
                            onClick={() => {
                              setActiveHeader(item);
                              setIsSettingsClicked(false);
                            }}
                          >
                            <span className=' w-6 h-6'></span>
                            <span className=' text-[#3C3C3C] text-sm font-medium'>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='px-2 py-[6px] gap-4 flex items-center '>
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M5 8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8ZM8 6C6.89543 6 6 6.89543 6 8V9.05767L11.5 9.00478V6H8ZM12.5 6V14H18V8C18 6.89543 17.1046 6 16 6H12.5ZM18 15H12.5V18H16C17.1046 18 18 17.1046 18 16V15ZM11.5 18V10.0048L6 10.0577V16C6 17.1046 6.89543 18 8 18H11.5Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <div
                        className=' flex justify-between w-full items-center cursor-pointer'
                        onClick={() => {
                          setIsSettingsClicked(false);

                          setShowDriverTypes(!showDriverTypes);
                          setActiveHeader('All Drivers');
                        }}
                      >
                        <span className=' text-[#3C3C3C] text-sm font-medium'>Drivers</span>
                        <span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className={`${showDriverTypes && 'rotate-180'}`}
                          >
                            <path
                              d='M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z'
                              fill='#111111'
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    {showDriverTypes && (
                      <div>
                        {['All Drivers', 'Livery Company', 'Chauffeur Drivers', 'TNC'].map((item, index) => (
                          <div
                            key={index}
                            className='px-2 py-[6px] gap-4 flex items-center cursor-pointer '
                            onClick={() => {
                              setActiveHeader(item);
                              setIsSettingsClicked(false);
                            }}
                          >
                            <span className=' w-6 h-6'></span>
                            <span className=' text-[#3C3C3C] text-sm font-medium'>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className=' flex justify-between w-full cursor-pointer items-center'
                      onClick={() => setActiveHeader('Vehicle')}
                    >
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Vehicles</span>
                      {false ? (
                        <span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z'
                              fill='#111111'
                            />
                          </svg>
                        </span>
                      ) : (
                        <span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z'
                              fill='#111111'
                            />
                          </svg>
                        </span>
                      )}
                    </div>

                    <div
                      className=' flex justify-between w-full cursor-pointer items-center'
                      onClick={() => setActiveHeader('Services')}
                    >
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Services</span>
                      {false ? (
                        <span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z'
                              fill='#111111'
                            />
                          </svg>
                        </span>
                      ) : (
                        <span>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z'
                              fill='#111111'
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className=' relative flex flex-col gap-2  pt-1 mx-auto py-1 pb-6 min-w-[200px] border-b max-w-[208px] border-[#EBEBEB]'>
                  <h3 className=' text-[#8A8A8A] font-[400] text-xs font-satoshi tracking-widest'>SETTINGS</h3>
                  <div className=' flex flex-col gap-[6px]'>
                    <div className='px-2 py-[6px] gap-4 flex items-center '>
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M3.91099 9.38266C4.28028 8.24053 4.88863 7.19213 5.69133 6.30364C5.82707 6.15339 6.04002 6.09984 6.23069 6.16802L8.14897 6.85392C8.66905 7.03977 9.24131 6.76883 9.42716 6.24875C9.44544 6.19762 9.45952 6.14507 9.46925 6.09173L9.83471 4.08573C9.87104 3.88627 10.0242 3.7285 10.2225 3.6863C10.8027 3.5628 11.3976 3.5 12.0003 3.5C12.6026 3.5 13.1971 3.56273 13.7769 3.68607C13.9752 3.72824 14.1284 3.88591 14.1648 4.08529L14.5313 6.09165C14.6303 6.63497 15.1511 6.9951 15.6944 6.89601C15.7479 6.88627 15.8004 6.87219 15.8515 6.85395L17.7698 6.16802C17.9605 6.09984 18.1734 6.15339 18.3092 6.30364C19.1119 7.19213 19.7202 8.24053 20.0895 9.38266C20.1518 9.57534 20.0918 9.78658 19.9374 9.91764L18.3825 11.2377C17.9615 11.5952 17.9101 12.2263 18.2675 12.6473C18.3027 12.6887 18.3411 12.7271 18.3825 12.7623L19.9374 14.0824C20.0918 14.2134 20.1518 14.4247 20.0895 14.6173C19.7202 15.7595 19.1119 16.8079 18.3092 17.6964C18.1734 17.8466 17.9605 17.9002 17.7698 17.832L15.8515 17.1461C15.3315 16.9602 14.7592 17.2312 14.5733 17.7512C14.5551 17.8024 14.541 17.8549 14.5312 17.9085L14.1648 19.9147C14.1284 20.1141 13.9752 20.2718 13.7769 20.3139C13.1971 20.4373 12.6026 20.5 12.0003 20.5C11.3976 20.5 10.8027 20.4372 10.2225 20.3137C10.0242 20.2715 9.87104 20.1137 9.83471 19.9143L9.46926 17.9084C9.37018 17.365 8.8494 17.0049 8.30608 17.104C8.25265 17.1137 8.20011 17.1278 8.14906 17.1461L6.23069 17.832C6.04002 17.9002 5.82707 17.8466 5.69133 17.6964C4.88863 16.8079 4.28028 15.7595 3.91099 14.6173C3.84869 14.4247 3.90876 14.2134 4.06313 14.0824L5.61798 12.7623C6.03897 12.4048 6.09046 11.7737 5.73299 11.3527C5.69784 11.3113 5.65937 11.2729 5.618 11.2377L4.06313 9.91764C3.90876 9.78658 3.84869 9.57534 3.91099 9.38266ZM4.97154 9.37709L6.26523 10.4755C6.34803 10.5458 6.42496 10.6227 6.49526 10.7055C7.2102 11.5475 7.10721 12.8096 6.26521 13.5246L4.97154 14.6229C5.26359 15.4051 5.68504 16.1322 6.21648 16.7751L7.81246 16.2044C7.91473 16.1679 8.01982 16.1397 8.12667 16.1202C9.21332 15.922 10.2549 16.6423 10.4531 17.729L10.757 19.3975C11.1649 19.4655 11.5802 19.5 12.0003 19.5C12.42 19.5 12.8351 19.4656 13.2427 19.3976L13.5475 17.7289C13.567 17.6221 13.5951 17.517 13.6317 17.4147C14.0034 16.3746 15.1479 15.8327 16.1881 16.2044L17.784 16.7751C18.3155 16.1322 18.7369 15.4051 19.029 14.6229L17.7353 13.5245C17.6525 13.4542 17.5756 13.3773 17.5053 13.2945C16.7903 12.4525 16.8933 11.1904 17.7353 10.4754L19.029 9.37709C18.7369 8.59486 18.3155 7.86783 17.784 7.22494L16.1881 7.79559C16.0858 7.83214 15.9807 7.8603 15.8738 7.87979C14.7872 8.07796 13.7456 7.3577 13.5475 6.27119L13.2427 4.60235C12.8351 4.53443 12.42 4.5 12.0003 4.5C11.5802 4.5 11.1649 4.53448 10.757 4.60249L10.453 6.27105C10.4335 6.37791 10.4054 6.48299 10.3688 6.58527C9.99714 7.62542 8.8526 8.1673 7.81237 7.79556L6.21648 7.22494C5.68504 7.86783 5.26359 8.59486 4.97154 9.37709ZM9.50026 12C9.50026 10.6193 10.6195 9.5 12.0003 9.5C13.381 9.5 14.5003 10.6193 14.5003 12C14.5003 13.3807 13.381 14.5 12.0003 14.5C10.6195 14.5 9.50026 13.3807 9.50026 12ZM10.5003 12C10.5003 12.8284 11.1718 13.5 12.0003 13.5C12.8287 13.5 13.5003 12.8284 13.5003 12C13.5003 11.1716 12.8287 10.5 12.0003 10.5C11.1718 10.5 10.5003 11.1716 10.5003 12Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Reports</span>
                    </div>
                    <div
                      className='px-2 py-[6px] gap-4 flex items-center cursor-pointer'
                      onClick={() => {
                        setActiveHeader('');
                        setIsSettingsClicked(!isSettingsClicked);
                      }}
                    >
                      <span>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M3.91099 9.38266C4.28028 8.24053 4.88863 7.19213 5.69133 6.30364C5.82707 6.15339 6.04002 6.09984 6.23069 6.16802L8.14897 6.85392C8.66905 7.03977 9.24131 6.76883 9.42716 6.24875C9.44544 6.19762 9.45952 6.14507 9.46925 6.09173L9.83471 4.08573C9.87104 3.88627 10.0242 3.7285 10.2225 3.6863C10.8027 3.5628 11.3976 3.5 12.0003 3.5C12.6026 3.5 13.1971 3.56273 13.7769 3.68607C13.9752 3.72824 14.1284 3.88591 14.1648 4.08529L14.5313 6.09165C14.6303 6.63497 15.1511 6.9951 15.6944 6.89601C15.7479 6.88627 15.8004 6.87219 15.8515 6.85395L17.7698 6.16802C17.9605 6.09984 18.1734 6.15339 18.3092 6.30364C19.1119 7.19213 19.7202 8.24053 20.0895 9.38266C20.1518 9.57534 20.0918 9.78658 19.9374 9.91764L18.3825 11.2377C17.9615 11.5952 17.9101 12.2263 18.2675 12.6473C18.3027 12.6887 18.3411 12.7271 18.3825 12.7623L19.9374 14.0824C20.0918 14.2134 20.1518 14.4247 20.0895 14.6173C19.7202 15.7595 19.1119 16.8079 18.3092 17.6964C18.1734 17.8466 17.9605 17.9002 17.7698 17.832L15.8515 17.1461C15.3315 16.9602 14.7592 17.2312 14.5733 17.7512C14.5551 17.8024 14.541 17.8549 14.5312 17.9085L14.1648 19.9147C14.1284 20.1141 13.9752 20.2718 13.7769 20.3139C13.1971 20.4373 12.6026 20.5 12.0003 20.5C11.3976 20.5 10.8027 20.4372 10.2225 20.3137C10.0242 20.2715 9.87104 20.1137 9.83471 19.9143L9.46926 17.9084C9.37018 17.365 8.8494 17.0049 8.30608 17.104C8.25265 17.1137 8.20011 17.1278 8.14906 17.1461L6.23069 17.832C6.04002 17.9002 5.82707 17.8466 5.69133 17.6964C4.88863 16.8079 4.28028 15.7595 3.91099 14.6173C3.84869 14.4247 3.90876 14.2134 4.06313 14.0824L5.61798 12.7623C6.03897 12.4048 6.09046 11.7737 5.73299 11.3527C5.69784 11.3113 5.65937 11.2729 5.618 11.2377L4.06313 9.91764C3.90876 9.78658 3.84869 9.57534 3.91099 9.38266ZM4.97154 9.37709L6.26523 10.4755C6.34803 10.5458 6.42496 10.6227 6.49526 10.7055C7.2102 11.5475 7.10721 12.8096 6.26521 13.5246L4.97154 14.6229C5.26359 15.4051 5.68504 16.1322 6.21648 16.7751L7.81246 16.2044C7.91473 16.1679 8.01982 16.1397 8.12667 16.1202C9.21332 15.922 10.2549 16.6423 10.4531 17.729L10.757 19.3975C11.1649 19.4655 11.5802 19.5 12.0003 19.5C12.42 19.5 12.8351 19.4656 13.2427 19.3976L13.5475 17.7289C13.567 17.6221 13.5951 17.517 13.6317 17.4147C14.0034 16.3746 15.1479 15.8327 16.1881 16.2044L17.784 16.7751C18.3155 16.1322 18.7369 15.4051 19.029 14.6229L17.7353 13.5245C17.6525 13.4542 17.5756 13.3773 17.5053 13.2945C16.7903 12.4525 16.8933 11.1904 17.7353 10.4754L19.029 9.37709C18.7369 8.59486 18.3155 7.86783 17.784 7.22494L16.1881 7.79559C16.0858 7.83214 15.9807 7.8603 15.8738 7.87979C14.7872 8.07796 13.7456 7.3577 13.5475 6.27119L13.2427 4.60235C12.8351 4.53443 12.42 4.5 12.0003 4.5C11.5802 4.5 11.1649 4.53448 10.757 4.60249L10.453 6.27105C10.4335 6.37791 10.4054 6.48299 10.3688 6.58527C9.99714 7.62542 8.8526 8.1673 7.81237 7.79556L6.21648 7.22494C5.68504 7.86783 5.26359 8.59486 4.97154 9.37709ZM9.50026 12C9.50026 10.6193 10.6195 9.5 12.0003 9.5C13.381 9.5 14.5003 10.6193 14.5003 12C14.5003 13.3807 13.381 14.5 12.0003 14.5C10.6195 14.5 9.50026 13.3807 9.50026 12ZM10.5003 12C10.5003 12.8284 11.1718 13.5 12.0003 13.5C12.8287 13.5 13.5003 12.8284 13.5003 12C13.5003 11.1716 12.8287 10.5 12.0003 10.5C11.1718 10.5 10.5003 11.1716 10.5003 12Z'
                            fill='#0E0E0E'
                          />
                        </svg>
                      </span>
                      <span className=' text-[#3C3C3C] text-sm font-medium'>Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=' flex flex-col justify-between mt-10'>
              {/* <Image
            src={roundedBars}
            alt=''
            width={32}
            height={32}
            className='w-[32px] h-[32px] absolute ml-[225px] -mt-[30px] z-10'
          /> */}

              {/* <div className='h-[54px] flex flex-col gap-[8px]'>
                <div
                  onClick={() => {
                    setActiveHeader('');
                    setIsSettingsClicked(!isSettingsClicked);
                  }}
                  className={`h-[56px] transition duration-500 cursor-pointer flex py-[16px] px-[24px] gap-[8px] items-center ${
                    isSettingsClicked &&
                    'bg-[#F8F8F8] border-l-[3px] border-[#111111]'
                  }`}
                >
                  <Image
                    src={settingsIcon}
                    width={24}
                    height={24}
                    alt=''
                    className='w-[24px] h-[24px]'
                  />
                  <span className='font-medium text-base leading-[24px] text-[#0E0E0E]'>
                    Settings
                  </span>
                </div>
              </div> */}
            </div>
          </>
        ) : (
          <AdvancedSearch />
        )}
      </section>
      <div className=' mt-1 w-full'>
        <div className=' flex justify-between w-full p-4 items-center pr-5'>
          <div className=' flex gap-2 items-center'>
            <Image
              src={profileDummy}
              alt='Admin Profile Picture'
              width={48}
              height={48}
              className=' w-12 h-12 rounded-full'
            />
            <div className=' flex gap-1 flex-col text-[#0E0E0E]'>
              <span className='font-medium'>{userLoginCredentials.username}</span>
              <p className=' flex gap-[2px] font-medium  text-xs'>
                <span className=' text-[#8A8A8A]'>Admin ID:</span>
                <span>{userLoginCredentials.employeeID}</span>
              </p>
            </div>
          </div>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => {
              Cookies.remove('token');
              router.push('/login');
            }}
            className='cursor-pointer'
          >
            <path
              d='M8.49805 11.25C8.91226 11.25 9.24805 10.9142 9.24805 10.5C9.24805 10.0858 8.91226 9.75 8.49805 9.75C8.08383 9.75 7.74805 10.0858 7.74805 10.5C7.74805 10.9142 8.08383 11.25 8.49805 11.25ZM10.998 3.5C10.998 3.3542 10.9344 3.21567 10.8238 3.12068C10.7132 3.02569 10.5666 2.98371 10.4225 3.00574L3.4225 4.07574C3.17836 4.11306 2.99805 4.32303 2.99805 4.57V15.43C2.99805 15.6769 3.17832 15.8869 3.42243 15.9243L10.4224 16.9953C10.5666 17.0173 10.7131 16.9754 10.8238 16.8804C10.9344 16.7854 10.998 16.6468 10.998 16.501V10L16.1703 10L15.1734 10.8737C14.9659 11.0556 14.9449 11.3714 15.1264 11.5793C15.308 11.7871 15.6233 11.8081 15.8308 11.6263L17.8276 9.8763C17.9359 9.78135 17.998 9.64419 17.998 9.50001C17.998 9.35583 17.9359 9.21867 17.8276 9.12372L15.8308 7.37372C15.6233 7.19188 15.308 7.21294 15.1264 7.42076C14.9449 7.62858 14.9659 7.94446 15.1734 8.1263L16.1703 9.00002L10.998 9.00002V3.5ZM9.99805 4.08224V15.9187L3.99805 15.0007V4.99938L9.99805 4.08224ZM12.498 16H11.998V11H12.998V15.5C12.998 15.7761 12.7742 16 12.498 16ZM11.998 8V4H12.498C12.7742 4 12.998 4.22386 12.998 4.5V8H11.998Z'
              fill='#AAAAAA'
            />
          </svg>
        </div>
        {/* <button
          className=' btn w-full'
          onClick={() => {
            Cookies.remove('token');
            router.push('/login');
          }}
        >
          Logout
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;
