import React, { useRef, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import Component from '@/components/Button/button';
import { data } from '@/components/admin/AdminSignUp/AdditionalSecurity/PinCodeOrPassphrase/dummydata';
import toast from 'react-hot-toast';
import copyIcon from '@/components/admin/AdminSignUp/AdditionalSecurity/PinCodeOrPassphrase/copyIcon.svg';

const NewPinCodeOrPassphrase = () => {
  const [type, setType] = useState({
    pincode: true,
    passphrase: false,
  });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const confirmInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === 'Backspace' && idx > 0 && !confirmInputsRef.current[idx]?.value) {
      confirmInputsRef.current[idx - 1]?.focus();
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const copy = async (e: React.FormEvent, text: string) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
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
    <GeneralDesign>
      <div className='flex flex-col items-center'>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <button
            type='button'
            title='Sign In'
            className='w-[120px] h-[48px] rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] text-[#0E0E0E]'
          >
            Back
          </button>
        </div>
        {/**content */}
        <div className='flex w-full mt-20 px-10 justify-center items-center'>
          <div className='container flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-[16px] leading-[24px] font-medium text-[#0E0E0E]'>Forgot Pincode/Passphrase</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>
                {type.pincode && 'Please enter your new Pincode'}
                {type.passphrase && 'New Passphrase'}
              </h2>
              <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
                {type.pincode && 'Please enter your new Pincode'}
                {type.passphrase && 'Write down or copy these words in the right order and save them somewhere safe.'}
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
                    setType(() => {
                      return { pincode: false, passphrase: true };
                    });
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
                          key={idx}
                          ref={(el: any) => (inputsRef.current[idx] = el)}
                          className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder-inputcolor rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]'
                          maxLength={1}
                          type='text'
                          inputMode='numeric'
                          placeholder='*'
                          pattern='[0-9]*'
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
                          pattern='[0-9]*'
                          placeholder='*'
                          onChange={(e) => confirmHandleChange(e, idx)}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
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
                    {data.map((item, idx) => {
                      const { text } = item;
                      return <Component className='w-fit' key={idx} num={idx + 1} text={text} />;
                    })}
                  </div>
                  <button
                    type='button'
                    onClick={(e: React.FormEvent) => {
                      copy(e, JSON.stringify(data));
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
              }}
              className='h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </GeneralDesign>
  );
};

export default NewPinCodeOrPassphrase;
