'use client';
import React from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import { useSignInContext } from '@/contexts/SignUpContext';
import toast from 'react-hot-toast';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import { useRouter } from 'next/navigation';

const ConfirmPassphrase = () => {
  const {
    additionalSecurity,
    setAdditionalSecurity,
    pinCode,
    setPinCode,
    passphrase,
    setPassphrase,
    setUpToken,
    userDetails,
  } = useSignInContext();

  const [passphrase1, setPassphrase1] = React.useState<string>('');
  const [passphrase2, setPassphrase2] = React.useState<string>('');
  const [passphrase3, setPassphrase3] = React.useState<string>('');
  const [passphrase4, setPassphrase4] = React.useState<string>('');
  const [passphrase5, setPassphrase5] = React.useState<string>('');

  const router = useRouter();

  const handleCreatePassphraseAndPinCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pinCode.length < 6) {
      toast.error('Pincode must be 6 characters');
      return;
    }
    if (isNaN(Number(pinCode))) {
      toast.error('Pincode must be a number');
      return;
    }

    if (passphrase.length < 5) {
      toast.error('Please enter all passphrases.');
      return;
    }

    const sortPassphrase = passphrase.map((item) => Object.values(item)[0]);
    const sortPassphrase1 = [passphrase1, passphrase2, passphrase3, passphrase4, passphrase5];
    // console.log(sortPassphrase.join(''));
    if (sortPassphrase.join('') !== sortPassphrase1.join('')) {
      toast.error('Passphrase does not match');
      return;
    }

    const newPassphrase = passphrase.map((pass, idx) => {
      return { [`pass_${idx + 1}`]: pass.text.trim() };
    });

    toast.loading('Creating your pincode and passphrase...');
    // console.log(setUpToken);

    try {
      const request = await postRequest({
        url: AdminUrls.setupPassPhraseandPin,
        token: `${setUpToken}`,
        data: {
          passphrase: newPassphrase,
          pinCode,
          username: userDetails.username,
        },
      });

      toast.dismiss();

      if (request.success) {
        toast.success(request.message);

        const { isBiometricSelected } = additionalSecurity;
        // if (isBiometricSelected) {
        //   setAdditionalSecurity({
        //     ...additionalSecurity,
        //     isMethodActive: false,
        //     isConfirmPassphraseActive: false,
        //     isBiometricActive: true,
        //   });
        // } else {
        //   console.log(passphrase);
        //   // toast.success('Additional Security has been implemented');
        //   // setTimeout(() => {
        //   //   window.location.href = '/dashboard';
        //   // }, 2000);
        // }
        setPassphrase([]);
        setPinCode('');
        setPassphrase1('');
        setPassphrase2('');
        setPassphrase3('');
        setPassphrase4('');
        setPassphrase5('');
        // toast.success('Additional Security has been implemented, Please login');
        router.push('/login');
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
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
              setAdditionalSecurity({
                ...additionalSecurity,
                isPincodeOrPassphraseActive: true,
                isConfirmPassphraseActive: false,
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
        <div
          className={`w-full flex justify-center items-center mx-auto mt-20 px-10 ${
            additionalSecurity.isConfirmPassphraseActive && styles['fade-in']
          }`}
        >
          <div className="flex flex-col gap-2 min-w-[480px]">
            <div className="flex flex-col">
              <span className="text-base leading-[24px] font-medium text-[#0E0E0E]">Additional Security</span>
              <h2 className="text-[24px] leading-[32px] font-medium text-[#0E0E0E]">Confirm Passphrase</h2>
              <span className="text-base leading-[24px] font-normal text-[#3C3C3C]">
                Please enter your corresponding passphrase
              </span>
            </div>
            {/**input fields */}
            <div className="grid grid-cols-2 grid-rows-3 gap-6 mt-4">
              {/**passphrase1 */}
              <label htmlFor="passphrase1" className="flex flex-col gap-2">
                <span className="text-[14px] leading-[20px] font-medium text-[#0E0E0E]">Passphrase 1</span>
                <input
                  className="h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]"
                  type="text"
                  id="passphrase1"
                  placeholder="Passphrase"
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
                  placeholder="Passphrase"
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
                  placeholder="Passphrase"
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
                  placeholder="Passphrase"
                  value={passphrase5}
                  onChange={(e) => setPassphrase5(e.target.value)}
                />
              </label>
            </div>
            {/**Proceed */}
            <div className="  mx-auto">
              <button
                type="submit"
                onClick={(e: React.FormEvent) => {
                  e.preventDefault();

                  handleCreatePassphraseAndPinCode(e);
                }}
                className="h-[56px] min-w-[480px] max-w-[600px] mx-auto mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassphrase;
