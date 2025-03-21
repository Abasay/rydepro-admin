import React, { useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import fingerIcon from './fingerIcon.svg';
import Component from '@/components/Button/button';
import Fingerprint from './fingerprint';
import { useCamera } from './camera';
import { useResetContext } from '@/contexts/ResetContext';
import styles from '@/styles/common.module.css';

const Biometrics = () => {
  const { nav, setNav } = useResetContext();
  const [type, setType] = useState({
    fingerPrint: true,
    faceID: false,
  });
  const [message, setMessage] = useState<string>('');
  const { videoRef, cameraActive } = useCamera();

  const handleCaptureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    // Send imageData to backend for facial recognition
    fetch('/api/face-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Face authentication failed.'));
  };

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (type.faceID) {
      handleCaptureImage();
    } else {
      setMessage('Fingerprint authentication in progress...');
    }
    //conditional testing to simulate between pages
    setNav({
      ...nav,
      isForgotPasswordPageActive: false,
      isRecoveryPageActive: false,
      isVerifyingIdentityPageActive: false,
      isPincodeOrPassphrasePageActive: false,
      isOTPPageActive: false,
      isBiometricPageActive: false,
      isNewPasswordPageActive: true,
    });
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <button
            onClick={() => {
              //conditional testing to simulate between pages
              setNav({
                ...nav,
                isForgotPasswordPageActive: false,
                isRecoveryPageActive: false,
                isVerifyingIdentityPageActive: false,
                isPincodeOrPassphrasePageActive: false,
                isOTPPageActive: true,
                isBiometricPageActive: false,
              });
            }}
            type='button'
            title='Back'
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
        <div className={`w-full flex justify-center items-center mx-auto mt-20 px-10 ${styles['slide-from-bottom']}`}>
          <div className='flex flex-col gap-2 container'>
            <div className='flex flex-col'>
              <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Biometrics</h2>
              <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
                Please verify your Fingerprint or Face ID.
              </span>
              <div className='flex flex-row gap-4 mt-4'>
                <Component
                  text='Fingerprint'
                  isClicked={type.fingerPrint}
                  onClick={() => {
                    setType(() => {
                      return { fingerPrint: true, faceID: false };
                    });
                  }}
                />
                <Component
                  text='Face ID'
                  isClicked={type.faceID}
                  onClick={() => {
                    setType(() => {
                      return { fingerPrint: false, faceID: true };
                    });
                  }}
                />
              </div>
            </div>
            {/**sub-content */}
            <div className='mt-14 flex items-center justify-center'>
              {type.fingerPrint && (
                <div className='flex flex-col justify-center items-center gap-8'>
                  <span className='text-base leading-[24px] text-center text-[#000000] font-normal'>
                    Please scan your finger on the fingerprint reader
                  </span>
                  <Fingerprint color='#111111' />
                  <span className=''>{message}</span>
                </div>
              )}
              {type.faceID && (
                <div className='flex flex-col justify-center items-center gap-8'>
                  <span className='text-base leading-[24px] text-center text-[#000000] font-normal'>
                    Please look into the camera and hold still
                  </span>
                  <video
                    ref={videoRef}
                    autoPlay
                    className='w-[200px] h-[200px] bg-[#EBEBEB] border-[#D0D0D0] border-[1px] rounded-[12px]'
                  />
                  <span className=''>{message}</span>
                </div>
              )}
            </div>
            {/**Proceed */}
            <button
              type='submit'
              onClick={proceed}
              className='h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#8A8A8A] text-base leading-[24px] text-[#FAF6F6]'
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Biometrics;
