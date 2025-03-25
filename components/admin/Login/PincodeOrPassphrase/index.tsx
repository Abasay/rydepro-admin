'use client';
import React, { use, useRef, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import Component from '@/components/Button/button';
import { data } from '@/components/admin/AdminSignUp/AdditionalSecurity/PinCodeOrPassphrase/dummydata';
import toast from 'react-hot-toast';
import copyIcon from '@/components/admin/AdminSignUp/AdditionalSecurity/PinCodeOrPassphrase/copyIcon.svg';
import { useSignInContext } from '@/contexts/SignUpContext';
import { useLogInContext } from '@/contexts/LoginContext';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const PinCodeOrPassphrase = () => {
  const { userLoginCredentials } = useLogInContext();

  const { nav, setNav } = useLogInContext();
  const [type, setType] = useState({
    pincode: true,
    passphrase: false,
  });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const confirmInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
  const [pincodeVerified, setPincodeVerified] = useState<boolean>(false);
  const [passphraseVerified, setPassphraseVerified] = useState<boolean>(false);
  const [passphrase1, setPassphrase1] = useState<string>('');
  const [passphrase2, setPassphrase2] = useState<string>('');
  const [passphrase3, setPassphrase3] = useState<string>('');
  const [passphrase4, setPassphrase4] = useState<string>('');
  const [passphrase5, setPassphrase5] = useState<string>('');

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
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

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username } = userLoginCredentials;

    if (!username) return toast.error('Username is required.');

    if (type.pincode) {
      const pinCode = inputsRef.current.map((input) => input?.value).join('');
      if (pinCode.length !== 6) return toast.error('Please enter a valid pincode');

      toast.loading('Verifying pincode...');
      try {
        const response = await postRequest({
          url: AdminUrls.verifyPinCode,
          token: '',
          data: {
            username,
            pinCode,
          },
        });

        toast.dismiss();
        if (response.success) {
          toast.success('Pincode verified successfully');
          // setNav({
          //   ...nav,
          //   isPincodeOrPasswordPageActive: false,
          //   isBiometricPageActive: true
          // })
          setPincodeVerified(true);
          setType({
            ...type,
            pincode: false,
            passphrase: true,
          });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('An error occured, please try again');
      }
    } else {
      const newPassphrase = [passphrase1, passphrase2, passphrase3, passphrase4, passphrase5].map((pass, idx) => {
        return { [`pass_${idx + 1}`]: pass };
      });

      toast.loading('Verifying your passphrase...');
      // console.log(setUpToken);

      try {
        const request = await postRequest({
          url: AdminUrls.verifyPassphrase,
          token: ``,
          data: {
            passphrase: newPassphrase,
            username,
            location: {
              lat: 33.1,
              long: 12.1,
            },
            deviceInfo: {
              deviceId: '123452',
              deviceName: 'Tecno',
              deviceType: 'Android',
            },
          },
        });

        toast.dismiss();

        if (request.success) {
          toast.success(request.message);

          setPassphrase1('');
          setPassphrase2('');
          setPassphrase3('');
          setPassphrase4('');
          setPassphrase5('');
          Cookies.set('token', request.token);
          // console.log(request.data);
          // toast.success('Additional Security has been implemented, Please login');
          router.push('/dashboard');
        } else {
          toast.error(request.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/**heading */}
        <div className="flex w-full justify-between items-center">
          <Image src={RydeProLogo} alt="" width={70} height={100} />
          <button
            onClick={(e: React.FormEvent) => {
              // setAdditionalSecurity({
              //   ...additionalSecurity,
              //   isMethodActive: true,
              //   isPincodeOrPassphraseActive: false,
              // });
              setNav({
                ...nav,
                isPincodeOrPasswordPageActive: false,
                isPasswordPageActive: true,
              });
            }}
            type="button"
            title="Back"
            className="w-[120px] flex gap-3 h-[48px] justify-center rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] items-center text-[#0E0E0E]"
          >
            <span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.3544 13.8537C10.1594 14.0493 9.84285 14.0499 9.64724 13.855L4.16276 8.39C3.94705 8.17505 3.94705 7.82574 4.16276 7.6108L9.64725 2.14582C9.84285 1.9509 10.1594 1.95147 10.3544 2.14708C10.5493 2.34269 10.5487 2.65927 10.3531 2.85418L5.18851 8.0004L10.3531 13.1466C10.5487 13.3415 10.5493 13.6581 10.3544 13.8537Z"
                  fill="#0E0E0E"
                />
              </svg>
            </span>
            <span>Back</span>
          </button>
        </div>
        {/**content */}
        <div className={`flex w-full mt-20 px-10 justify-center items-center ${styles['slide-in']}`}>
          <div className="container flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] leading-[24px] font-medium text-[#0E0E0E]">Additional Security</span>
              <h2 className="text-[24px] leading-[32px] font-medium text-[#0E0E0E]">Pincode/Passphrase</h2>
              <span className="text-base leading-[24px] font-normal text-[#3C3C3C]">
                Please enter your pincode/passphrase
              </span>
              <div className="flex flex-row gap-4 mt-1">
                <Component
                  text="Pincode"
                  isClicked={type.pincode}
                  onClick={() => {
                    if (pincodeVerified) return toast.error('Pincode already verified');
                  }}
                />
                <Component
                  text="Passphrase"
                  isClicked={type.passphrase}
                  onClick={() => {
                    toast.error('Please verify your pincode to proceed.');
                  }}
                />
              </div>
            </div>
            {/**pincode */}
            {type.pincode && (
              <div className="mt-4 flex flex-col gap-4">
                {/**Enter pincode */}
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Pincode</span>
                  <div className="flex gap-6 relative">
                    {Array(6)
                      .fill('')
                      .map((_, idx) => (
                        <input
                          key={idx}
                          ref={(el: any) => (inputsRef.current[idx] = el)}
                          className="focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder-inputcolor rounded-[4px] text-[20px]  border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]"
                          maxLength={1}
                          type="text"
                          inputMode="numeric"
                          placeholder="*"
                          pattern="[0-9]*"
                          onChange={(e) => handleChange(e, idx)}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
            {/**passphrase */}
            <div className="flex mt-4">
              {type.passphrase && (
                <div className="grid grid-cols-2 grid-rows-3 gap-6 mt-4">
                  {/**passphrase1 */}
                  <label htmlFor="passphrase1" className="flex flex-col gap-2">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 1</span>
                    <input
                      className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                      type="text"
                      id="passphrase1"
                      placeholder="Passphrase 1"
                      value={passphrase1}
                      onChange={(e) => setPassphrase1(e.target.value)}
                    />
                  </label>
                  {/**passphrase2 */}
                  <label htmlFor="passphrase2" className="flex flex-col gap-2">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 2</span>
                    <input
                      className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                      type="text"
                      id="passphrase2"
                      placeholder="Passphrase 2"
                      value={passphrase2}
                      onChange={(e) => setPassphrase2(e.target.value)}
                    />
                  </label>
                  {/**passphrase3 */}
                  <label htmlFor="passphrase3" className="flex flex-col gap-2">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 3</span>
                    <input
                      className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                      type="text"
                      id="passphrase3"
                      placeholder="Passphrase 3"
                      value={passphrase3}
                      onChange={(e) => setPassphrase3(e.target.value)}
                    />
                  </label>
                  {/**passphrase4 */}
                  <label htmlFor="passphrase4" className="flex flex-col gap-2">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 4</span>
                    <input
                      className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                      type="text"
                      id="passphrase4"
                      placeholder="Passphrase"
                      value={passphrase4}
                      onChange={(e) => setPassphrase4(e.target.value)}
                    />
                  </label>
                  {/**passphrase 5 */}
                  <label htmlFor="passphrase5" className="flex flex-col gap-2">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 5</span>
                    <input
                      className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                      type="text"
                      id="passphrase5"
                      placeholder="Passphrase 5"
                      value={passphrase5}
                      onChange={(e) => setPassphrase5(e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]"
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
