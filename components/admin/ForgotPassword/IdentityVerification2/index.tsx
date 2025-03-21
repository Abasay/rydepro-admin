import React, { useRef, useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import Component from '@/components/Button/button';
import { useResetContext } from '@/contexts/ResetContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';

const IdentityVerification2 = () => {
  const [type, setType] = useState({
    pincode: true,
    passphrase: false,
  });
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isPassphraseFilled, setIsPassphraseFilled] = useState<boolean>(false);
  const { nav, setNav, details, setupToken, email } = useResetContext();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [passphrase, setPassphrase] = useState({
    passphrase1: '',
    passphrase2: '',
    passphrase3: '',
    passphrase4: '',
    passphrase5: '',
  });
  const [error, setError] = useState<any>('');

  const handlePassphraseChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setPassphrase({ ...passphrase, [name]: value });
    const { passphrase1, passphrase2, passphrase3, passphrase4, passphrase5 } = passphrase;
    const filled =
      passphrase1 !== '' && passphrase2 !== '' && passphrase3 !== '' && passphrase4 !== '' && passphrase5 !== '';
    setIsPassphraseFilled(filled);
  };
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
    // Check if all inputs are filled to set isCodeComplete
    const allFilled = inputsRef.current.every((input) => input?.value);
    setIsCodeComplete(allFilled); // Set to true if all are filled, false otherwise
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  //on click on proceed button
  const proceed = async (e: React.FormEvent) => {
    e.preventDefault();
    const { passphrase, pincode } = type;

    const { employeeID } = details;

    const pinCode = inputsRef.current.map((input) => input?.value).join('');
    const passphrases = Object.values(passphrase).map((value, idx) => {
      return {
        [`pass_${idx + 1}`]: value,
      };
    });

    if (!isCodeComplete) return;

    toast.loading(`Verifying your ${type.pincode ? 'Pincode' : 'Passphrase'}...`);

    try {
      const request = await postRequest({
        url: AdminUrls.verifySecurities,
        token: setupToken,
        data: {
          employeeId: employeeID,
          securityType: type.pincode ? 'pinCode' : 'passphrase',
          email,
          value: type.pincode ? pinCode : passphrases,
        },
      });

      const { success, message } = request;
      toast.dismiss();
      if (success) {
        toast.success(message);
        toast.loading('Sending Recovery Code...');
        try {
          const request = await postRequest({
            url: AdminUrls.recoveryEmail,
            token: '',
            data: { email },
          });
          toast.dismiss();
          if (request.success) {
            toast.success(request.message);
            setNav({
              ...nav,
              isForgotPasswordPageActive: false,
              isRecoveryPageActive: false,
              isVerifyingIdentityPageActive: false,
              isPincodeOrPassphrasePageActive: false,
              isOTPPageActive: true,
            });
          } else {
            toast.error(request.message);
          }
        } catch (error) {
          toast.error('Failed to send Recovery Code');
          //return;
        }
      } else toast.error(message);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      //toast.error(errorMessage);
      toast.error('Error verifying security');
    }
  };

  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={() => {
            //conditional testing to simulate between pages
            setNav({
              ...nav,
              isForgotPasswordPageActive: false,
              isRecoveryPageActive: false,
              isVerifyingIdentityPageActive: true,
              isPincodeOrPassphrasePageActive: false,
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
      <div className={`mt-20 flex flex-col justify-center items-center w-full px-8 ${styles['slide-from-top']}`}>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Password</span>
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Pincode/Passphrase</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Please verify your identity by completing your pincode or passphrase
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
            <div className='mt-3 flex flex-col gap-4'>
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
                        className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder-inputcolor rounded-[4px] text-[20px] border-y-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]'
                        maxLength={1}
                        type='password'
                        inputMode='numeric'
                        placeholder='*'
                        pattern='[0-9]*'
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
          {/**passphrase */}
          {type.passphrase && (
            <div className='grid grid-cols-2 grid-rows-3 gap-6 mt-4'>
              {/**passphrase1 */}
              <label htmlFor='passphrase1' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 1</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase1'
                  name='passphrase1'
                  value={passphrase.passphrase1}
                  onChange={handlePassphraseChange}
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase2 */}
              <label htmlFor='passphrase2' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 2</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase2'
                  name='passphrase2'
                  value={passphrase.passphrase2}
                  onChange={handlePassphraseChange}
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase3 */}
              <label htmlFor='passphrase3' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 3</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase3'
                  name='passphrase3'
                  value={passphrase.passphrase3}
                  onChange={handlePassphraseChange}
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase4 */}
              <label htmlFor='passphrase4' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 4</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase4'
                  name='passphrase4'
                  value={passphrase.passphrase4}
                  onChange={handlePassphraseChange}
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase 5 */}
              <label htmlFor='passphrase5' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 5</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase5'
                  name='passphrase5'
                  value={passphrase.passphrase5}
                  onChange={handlePassphraseChange}
                  placeholder='Passphrase'
                />
              </label>
            </div>
          )}
          <button
            type='submit'
            onClick={proceed}
            disabled={(type.pincode && !isCodeComplete) || (type.passphrase && !isPassphraseFilled)}
            className={`h-[56px] mt-10 p-[8px] w-full rounded-[8px] gap-[16px] ${
              isCodeComplete || isPassphraseFilled
                ? 'bg-[#0E0E0E] text-[#FAF6F6] cursor-pointer'
                : 'bg-[#8A8A8A] cursor-not-allowed text-[#DADADA]'
            } text-base leading-[24px] bg-[#0E0E0E] text-[#FAF6F6]`}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default IdentityVerification2;
