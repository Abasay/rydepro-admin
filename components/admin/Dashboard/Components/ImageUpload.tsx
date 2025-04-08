import { useDB } from '@/contexts/DBContext';
import { FILE_UPLOAD_POST_REQUEST } from '@/utils/lib/server-requests';
import { URLS } from '@/utils/lib/urls';
import { postRequest } from '@/utils/requests';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageUploadProps {
  title: string;
  setValue: (value: string) => void;
  value: string;
  vehicleTier: string;
  vehicleType: string;
  updateValue: boolean;
  setUpdateValue: (value: boolean) => void;
}

export default function ImageUpload({
  title,
  setValue,
  value,
  vehicleTier,
  vehicleType,
  updateValue,
  setUpdateValue,
}: ImageUploadProps) {
  console.log(value);
  const [image, setImage] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);
  const { errorText, setErrorText, successText, setSuccessText } = useDB();

  useEffect(() => {
    if (updateValue) setImage(value);
  }, [value]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateValue(false);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append('image', file);
      reader.onload = async () => {
        const imageData = reader.result as string;

        console.log(imageData.length);

        // if (imageData.length > 2097152) {
        //   alert('Image size should not exceed 2MB');
        //   return;
        // }

        const url =
          URLS.BASE_URL_ADMIN +
          URLS.uploadImg +
          `?name=${title}` +
          `&vehicleTier=${vehicleTier}` +
          `&vehicleType=${vehicleType}`;

        setUploading(true);

        await FILE_UPLOAD_POST_REQUEST(url, formData, Cookies.get('token') || '')
          .then((result: any) => {
            console.log(result);
            if (result.success) {
              setImage(imageData);
              setValue(result.data.imageFilePath);
              if (fileInputRef.current) fileInputRef.current.value = '';

              setSuccessText('Image Uploaded Successfully');
              setTimeout(() => {
                setSuccessText('');
              }, 3000);
            } else {
              setErrorText('Error Uploading Image');
              setTimeout(() => {
                setErrorText('');
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
            if (fileInputRef.current) fileInputRef.current.value = '';
            setErrorText('Error Uploading Image');
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          })
          .finally(() => {
            setUploading(false);
          });

        // Update parent state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex flex-col gap-1 items-start border-gray-400 rounded-lg p-4 pl-0 w-80">
        <h3 className="text-sm font-medium text-[#0E0E0E] mb-2">{title}</h3>
        <div
          className="w-full h-40 bg-[#8A8A8A] border-[1.5px] border-dashed border-[#F8F8F8] flex flex-col items-center justify-center relative cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <Image src={image} alt="Uploaded Image" className="w-full h-full object-cover" width={160} height={160} />
          ) : (
            <div className="flex gap-1 items-center">
              <p className="text-[#0E0E0E] font-bold text-sm">No Image Available</p>
              <span className="text-gray-500 text-xs">↓</span>
            </div>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
        {uploading && <p className=" text-sm font-bold">Uploading...</p>}{' '}
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="text-sm text-[#000000]">Allowed Dimensions: 16x16 px</p>
        <p className="text-sm text-[#000000]">Maximum Size: 2MB</p>
        <p className="text-sm text-[#000000]">Preferred Formats: JPEG, JPG, PNG</p>
      </div>
    </div>
  );
}
