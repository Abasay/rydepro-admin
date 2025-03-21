'use client';
import Image from 'next/image';
import bgImg from '@/public/newBg.jpeg';
import RydeProLogo from '@/public/RydeproLogo.png';
import icon from './icon.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useEffect, useState } from 'react';
import GeneralDesign from '../../GeneralDesign';
import { useSignInContext } from '@/contexts/SignUpContext';
import Link from 'next/link';
import {
  validateLowerCase,
  validateNumber,
  validatePassword,
  validateSpecialSymbols,
  validateUpperCase,
} from '@/utils/passwordCheck';
import toast from 'react-hot-toast';
import { postRequest } from '@/utils/requests';
import styles from '@/styles/common.module.css';
import { AdminUrls } from '@/utils/urls';

const AdminSignUp = () => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const { userDetails, setUserDetails, navigation, setNavigation } = useSignInContext();
  const [password, setPassword] = useState<string>('');
  const [errors, setError] = useState<any>('');
  const [signingUp, setSigningUp] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email } = userDetails;

    // Field validation errors
    let fielderrs: any = {};

    if (!username) fielderrs.username = 'Username is required';
    if (!email) fielderrs.email = 'Email is required';
    if (!password) fielderrs.password = 'Password is required';

    if (email && (!email.includes('@') || !email.includes('.') || email.length < 9)) {
      fielderrs.email = 'Not a valid email, must include @ and . and be at least 9 characters long';
    }

    // Password validations
    if (password.length < 12) {
      fielderrs.password = 'Password must be at least 12 characters long';
    }
    if (!validateUpperCase(password)) {
      fielderrs.password = 'Password must contain at least one uppercase letter';
    }
    if (!validateLowerCase(password)) {
      fielderrs.password = 'Password must contain at least one lowercase letter';
    }
    if (!validateSpecialSymbols(password)) {
      fielderrs.password = 'Password must contain at least one special character';
    }
    if (!validateNumber(password)) {
      fielderrs.password = 'Password must contain at least one number';
    }

    // Check for any errors
    if (Object.keys(fielderrs).length > 0) {
      setError(fielderrs);
      toast.error(fielderrs.email || fielderrs.username || fielderrs.password);
      return;
    }

    setSigningUp(true);

    try {
      // Making the API request for admin signup
      const response = await postRequest({
        url: AdminUrls.signupOtp,
        token: '', // No token required for signup
        data: {
          username,
          email,
          password,
          // recaptchaToken,
        },
      });

      if (response.success) {
        toast.success('Account created successfully! Check your email for verification.');
        setNavigation({ ...navigation, issignup: false, issignupotp: true });
      } else {
        if (response.message.includes('OTP code already sent')) {
          toast.success('OTP code has been sent, please check your mail.');
          setNavigation({ ...navigation, issignup: false, issignupotp: true });
          return;
        }
        toast.error(response?.message || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during signup.');
      console.error('Signup Error:', error);
    } finally {
      setSigningUp(false);
    }
  };

  useEffect(() => {
    console.log(recaptchaToken);
  }, [recaptchaToken]);
  return (
    <>
      <div className={`flex flex-col items-center }`}>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <Link href={'/login'}>
            <button
              type='button'
              title='Sign In'
              className='w-[120px] hover:bg-black hover:text-white transition-all delay-0 duration-500 h-[48px] rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] text-[#0E0E0E]'
            >
              Sign In
            </button>
          </Link>
        </div>
        {/**content */}
        <div className='w-full flex flex-col justify-center mt-16  items-center'>
          <div className='flex flex-col container max-w-[480px] gap-6'>
            <div className='flex flex-col gap-1'>
              <span className='text-[#0E0E0E] text-base leading-[24px] font-[500px]'>Create an Account</span>
              <h2 className='text-[#0E0E0E] text-[24px] leading-[32px] font-medium mt-1'>Welcome to RydePro!</h2>
              <span className='text-[#3C3C3C] text-[16px] leading-[24px]'>
                We&apos;re happy you&apos;re willing to begin this amazing journey with us.
              </span>
            </div>
            {/**User Inputs */}
            <div className='mt-2 flex flex-col gap-6'>
              {/**Email address */}
              <label htmlFor='email' className='flex flex-col gap-[8px]'>
                <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Email Address</span>
                <input
                  name='email'
                  type='email'
                  id='email'
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder='johndoe@gmail.com'
                  className='h-[56px] outline-none border-b-[1px] p-[16px] border-[#DADADA] rounded-[8px] text-base text-[#0E0E0E] placeholder:text-[#8A8A8A] leading-[24px] font-[400px]'
                />
              </label>
              {/**Username */}
              <label htmlFor='' className='flex flex-col gap-[8px]'>
                <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Username</span>
                <input
                  name='username'
                  type='text'
                  id='username'
                  value={userDetails.username}
                  onChange={handleChange}
                  placeholder='John Doe'
                  className='h-[56px] outline-none border-b-[1px] p-[16px] border-[#DADADA] rounded-[8px] text-base text-[#0E0E0E] placeholder:text-[#8A8A8A] leading-[24px] font-[400px]'
                />
              </label>
              {/**Password */}
              <div className='flex flex-col gap-2'>
                <label htmlFor='' className=' flex flex-col gap-[8px] relative'>
                  <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Password</span>
                  <input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={password}
                    onChange={(e: { target: { value: string } }) => {
                      setPassword(e.target.value);
                    }}
                    placeholder='**********'
                    className='h-[56px]  outline-none border-b-[1px] p-[16px] border-[#DADADA] rounded-[8px] text-base text-[#0E0E0E] placeholder:text-[#8A8A8A] leading-[24px] font-[400px]'
                  />

                  <span
                    className=' absolute -bottom-3 right-5 h-full grid place-content-center cursor-pointer '
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      ''
                    ) : (
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        className=' h-5 w-5'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M1.25909 9.60214C1.94254 6.32689 4.79437 4 8.00002 4C11.2057 4 14.0574 6.32688 14.7409 9.60215C14.7974 9.87246 15.0622 10.0459 15.3325 9.98946C15.6029 9.93304 15.7763 9.66817 15.7199 9.39785C14.9425 5.67312 11.6934 3 8.00002 3C4.3066 3 1.05742 5.67311 0.280175 9.39786C0.223767 9.66818 0.397177 9.93305 0.667497 9.98946C0.937817 10.0459 1.20268 9.87246 1.25909 9.60214ZM8 6C6.067 6 4.5 7.567 4.5 9.5C4.5 11.433 6.067 13 8 13C9.933 13 11.5 11.433 11.5 9.5C11.5 7.567 9.933 6 8 6ZM5.5 9.5C5.5 8.11929 6.61929 7 8 7C9.38071 7 10.5 8.11929 10.5 9.5C10.5 10.8807 9.38071 12 8 12C6.61929 12 5.5 10.8807 5.5 9.5Z'
                          fill='#111111'
                        />
                      </svg>
                    )}
                  </span>
                </label>
                <div className='flex items-start gap-1'>
                  <Image src={icon} alt='' width={20} height={20} />
                  <span className='text-[#3C3C3C] text-[12px] leading-[16px] font-[400]'>
                    Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, & 1
                    special character
                  </span>
                </div>
                {/**recaptcha */}
                <div className='my-2 w-full'>
                  {/* <ReCAPTCHA
                    className='w-full rounded-xl'
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Ensure to add this to your .env.local
                    onChange={(token: any) => setRecaptchaToken(token)}
                  /> */}
                </div>
                {/**Create Account Button */}
                <button
                  type='submit'
                  onClick={handleSubmit}
                  disabled={signingUp}
                  className='h-[56px] p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
                >
                  {signingUp ? 'Creating your Account' : 'Create Account'}
                </button>
                {/**text */}
                <span className='mt-8 text-base leading-[24px] text-center text-[#3C3C3C]'>
                  Already have an account? Click here to{' '}
                  <Link href={'/login'} className='no-underline font-medium text-[#0E0E0E]'>
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const image = {
  background: `url(${bgImg.src})`,
  backgroundPosition: 'top',
  filter: 'brightness(50%)',
  backgroundSize: 'cover',
};

export default AdminSignUp;
