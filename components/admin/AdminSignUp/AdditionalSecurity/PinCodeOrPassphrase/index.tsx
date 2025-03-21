'use client';
import React, { useEffect, useRef, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import Component from '@/components/Button/button';
import { data } from './dummydata';
import toast from 'react-hot-toast';
import copyIcon from './copyIcon.svg';
import { useSignInContext } from '@/contexts/SignUpContext';
import { nestedData } from './dummydata';
import styles from '@/styles/common.module.css';

const PinCodeOrPassphrase = () => {
  const { additionalSecurity, setAdditionalSecurity, setPinCode, pinCode, setPassphrase } = useSignInContext();
  const [type, setType] = useState({
    pincode: true,
    passphrase: false,
  });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const confirmInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
  const [randomPassphrase, setRandomPassphrase] = useState<{ text: string }[]>([
    {
      text: '',
    },
  ]);

  const [pincode, setPincode] = useState<string>('');
  const [confirmPincode, setConfirmPincode] = useState<string>('');

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * nestedData.length);
  };
  useEffect(() => {
    const generatedPassphrase = nestedData[generateRandomNumber()];
    setRandomPassphrase(generatedPassphrase);
    // console.log('Random Number:', randomNumber);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({ inputsRef: 'Please enter a valid number' });
      e.target.value = '';
      setTimeout(() => {
        setError({ inputsRef: '' });
      }, 3000);

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    setPincode(inputsRef.current.map((el) => el?.value).join(''));
    setPinCode(inputsRef.current.map((el) => el?.value).join(''));
  };

  const confirmHandleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({ confirmInputsRef: 'Please enter a valid number' });
      e.target.value = '';
      setTimeout(() => {
        setError({ confirmInputsRef: '' });
      }, 3000);

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < confirmInputsRef.current.length - 1) {
      confirmInputsRef.current[idx + 1]?.focus();
    }
    setConfirmPincode(confirmInputsRef.current.map((el) => el?.value).join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleConfirmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !confirmInputsRef.current[idx]?.value) {
      confirmInputsRef.current[idx - 1]?.focus();
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const copy = async (e: React.FormEvent, array: any) => {
    e.preventDefault();
    let actualText = ``;
    array?.forEach((item: any) => {
      actualText += `${item.text}, `;
    });
    try {
      await navigator.clipboard.writeText(actualText);
      setIsCopied(true);
      toast.success('Copied');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
    if (isCopied) {
      toast.success('Copied');
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <button
            onClick={(e: React.FormEvent) => {
              setAdditionalSecurity({
                ...additionalSecurity,
                isMethodActive: true,
                isPincodeOrPassphraseActive: false,
              });
            }}
            type='button'
            title='Sign In'
            className='w-[120px] flex gap-3 h-[48px] justify-center rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] items-center text-[#0E0E0E]'
          >
            <span>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.3544 13.8537C10.1594 14.0493 9.84285 14.0499 9.64724 13.855L4.16276 8.39C3.94705 8.17505 3.94705 7.82574 4.16276 7.6108L9.64725 2.14582C9.84285 1.9509 10.1594 1.95147 10.3544 2.14708C10.5493 2.34269 10.5487 2.65927 10.3531 2.85418L5.18851 8.0004L10.3531 13.1466C10.5487 13.3415 10.5493 13.6581 10.3544 13.8537Z'
                  fill='#0E0E0E'
                />
              </svg>
            </span>
            <span>Back</span>
          </button>
        </div>
        {/**content */}
        <div className={`flex w-full mt-20 px-10 justify-center items-center ${styles['slide-from-bottom']}`}>
          <div className='container flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-[16px] leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Pincode/Passphrase</h2>
              <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
                Please enter your pincode/passphrase
              </span>
              <div className='flex flex-row gap-4 mt-1'>
                <Component
                  text='Pincode'
                  isClicked={type.pincode}
                  onClick={() => {
                    setType(() => {
                      return { pincode: true, passphrase: false };
                    });
                  }}
                />
                <Component
                  text='Passphrase'
                  isClicked={type.passphrase}
                  onClick={() => {
                    console.log('Pincode:', pincode);

                    if (pinCode.length < 6) {
                      toast.error('Please enter your six digit pincode');
                      return;
                    }
                    if (pinCode !== confirmPincode) {
                      toast.error('Pincode does not match');
                      return;
                    }
                    setType(() => {
                      return { pincode: false, passphrase: true };
                    });

                    setRandomPassphrase(nestedData[generateRandomNumber()]);
                  }}
                />
              </div>
            </div>
            {/**pincode */}
            {type.pincode && (
              <div className='mt-4 flex flex-col gap-4'>
                {/**Enter pincode */}
                <div className='flex flex-col gap-2 mt-4 w-full'>
                  <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Pincode</span>
                  <div className='flex gap-6 relative'>
                    {Array(6)
                      .fill('')
                      .map((_, idx) => (
                        <input
                          key={idx + 7}
                          ref={(el: any) => (inputsRef.current[idx] = el)}
                          className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder-inputcolor rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]'
                          maxLength={1}
                          type='text'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          value={pincode[idx]}
                          onChange={(e) => handleChange(e, idx)}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
                        />
                      ))}
                  </div>
                </div>
                {/**Confirm Pincode */}
                <div className='flex flex-col gap-2 mt-4 w-full'>
                  <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Confirm Pincode</span>
                  <div className='flex gap-6'>
                    {Array(6)
                      .fill('')
                      .map((_, idx) => (
                        <input
                          key={idx}
                          ref={(el: any) => (confirmInputsRef.current[idx] = el)}
                          className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder-inputcolor rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]'
                          maxLength={1}
                          type='text'
                          inputMode='numeric'
                          value={confirmPincode[idx]}
                          pattern='[0-9]*'
                          onChange={(e) => confirmHandleChange(e, idx)}
                          onKeyDown={(e) => handleConfirmKeyDown(e, idx)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
            {/**passphrase */}
            <div className='flex mt-4'>
              {type.passphrase && (
                <div className='flex flex-col items-center'>
                  <div className='grid grid-cols-2 gap-y-3'>
                    {randomPassphrase.map((item, idx) => {
                      const { text } = item;
                      return <Component className='w-fit' key={idx} num={idx + 1} text={text} />;
                    })}
                  </div>
                  <button
                    type='button'
                    onClick={(e: React.FormEvent) => {
                      copy(e, randomPassphrase);
                    }}
                    className='h-[36px] w-fit mt-10 text-center rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center'
                  >
                    <span className='text-[#3C3C3C]'>Copy Passphrase</span>
                    <Image src={copyIcon} width={20} height={20} alt='' />
                  </button>
                  <span className='text-base w-[480px] leading-[24px] font-normal text-left mt-8 text-[#D21B34]'>
                    Do not share your passphrase with any one.
                  </span>
                </div>
              )}
            </div>
            <button
              type='submit'
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                setPassphrase(randomPassphrase);
                if (type.pincode) {
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isMethodActive: false,
                    isPincodeOrPassphraseActive: true,
                    isConfirmPassphraseActive: false,
                  });
                  if (pincode.length === 6 && pincode === confirmPincode) {
                    setType({
                      passphrase: true,
                      pincode: false,
                    });
                  } else {
                    if (pincode !== confirmPincode) return toast.error('Pincode does not match');
                    toast.error('Please enter a valid pincode');
                  }
                } else if (type.passphrase) {
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isMethodActive: false,
                    isPincodeOrPassphraseActive: false,
                    isConfirmPassphraseActive: true,
                  });
                }
              }}
              className='h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinCodeOrPassphrase;
