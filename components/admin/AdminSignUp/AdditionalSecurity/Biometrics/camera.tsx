import { useState, useRef, useEffect } from 'react';
import { useSignInContext } from '@/contexts/SignUpContext';

export const useCamera = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<any>(null);
  const { isFaceID, setIsFaceID } = useSignInContext();

  useEffect(() => {
    const startCamera = async () => {
      if (isFaceID) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        } catch (error) {
          console.error('Error accessing the camera:', error);
        }
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, []);

  return { videoRef, cameraActive };
};
