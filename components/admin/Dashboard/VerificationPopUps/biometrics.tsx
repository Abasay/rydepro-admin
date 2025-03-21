import React, { useState } from 'react';
import PopUp from '@/components/admin/Dashboard/PopUp/popUpDesign';
import Component from '@/components/Button/button';
import { useCamera } from '@/components/admin/AdminSignUp/AdditionalSecurity/Biometrics/camera';
import styles from '@/styles/common.module.css';
import Fingerprint from '@/components/admin/AdminSignUp/AdditionalSecurity/Biometrics/fingerprint';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { useLogInContext } from '@/contexts/LoginContext';
import toast from 'react-hot-toast';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { postRequest } from '@/utils/requests';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

const Biometrics = () => {
  const [type, setType] = useState({
    fingerPrint: true,
    faceID: false,
  });
  const [message, setMessage] = useState<string>('');
  const { videoRef, cameraActive } = useCamera();
  const { settings, setSettings } = useDashboardContext();
  const { userLoginCredentials } = useLogInContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, employeeID } = userLoginCredentials;

    if (!username) return toast.error('Username is required.');

    toast.loading('Verifying Passkey...');
    try {
      const response = await postRequest({
        url: AdminUrls.verifySecurities,
        token: Cookies.get('token') || '',
        data: {
          username,
          employeeId: employeeID,
          value: '',
          securityType: 'init-webAuthn',
        },
      });

      if (response.success) {
        const startRegistrationWebAuth = await startAuthentication({
          optionsJSON: response.options.data.options,
        });

        try {
          const verifyAuth = await postRequest({
            url: AdminUrls.verifySecurities,
            token: Cookies.get('token') || '',
            data: {
              username,
              employeeId: employeeID,
              value: startRegistrationWebAuth,
              securityType: 'verify-webAuthn',
            },
          });

          toast.dismiss();

          if (verifyAuth.success) {
            toast.success('Biometrics verified successfully');
            // setSettings({ biometrics: true });
            setSettings({
              ...settings,
              additionalSecurity: {
                ...settings.additionalSecurity,
                isSecurityVerified: true,
                isPopUpOpened: false,
              },
            });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.message);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occured, please try again');
    } finally {
      // toast.dismiss();
    }
  };

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
  return (
    <PopUp className='min-h-[521px]'>
      <form action='' method='post' onSubmit={handleSubmit} className='w-[480px] flex flex-col gap-[4px]'>
        <div className=' flex flex-col gap-[32px]'>
          <div className='gap-[8px] flex flex-col h-[92px]'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Verification</span>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Biometrics</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Please verify your identity with your Fingerprint or Face ID.
            </span>
          </div>
          <div className={`w-full flex -mt-3 ${styles['slide-from-bottom']}`}>
            <div className='flex flex-col container'>
              <div className='flex flex-col'>
                <div className='flex flex-row gap-4'>
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
                      // setIsFaceID(true);
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
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
          className={`h-[56px] mt-10 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-[#FAF6F6] text-base leading-[24px] `}
        >
          Proceed
        </button>
      </form>
    </PopUp>
  );
};

export default Biometrics;
