import { LogInProvider } from '@/contexts/LoginContext';
import { ResetProvider } from '@/contexts/ResetContext';
import { SignInProvider } from '@/contexts/SignUpContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import GoogleCaptchaWrapper from '../../GoogleCaptchaWrapper';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RydePro - Login',
  description: '',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ''}
    //   scriptProps={{
    //     async: true, // Load script asynchronously
    //     defer: true, // Defer loading until after DOM parsing
    //     appendTo: 'head', // Append script to the <head>
    //   }}
    // >
    //   <SignInProvider>
    //     <LogInProvider>
    //       <ResetProvider>
    //         {' '}
    //         {children}
    //         <Toaster />
    //       </ResetProvider>
    //     </LogInProvider>
    //   </SignInProvider>
    // </GoogleReCaptchaProvider>

    <GoogleCaptchaWrapper>
      <SignInProvider>
        <LogInProvider>
          <ResetProvider>
            {' '}
            {children}
            <Toaster />
          </ResetProvider>
        </LogInProvider>
      </SignInProvider>
    </GoogleCaptchaWrapper>
  );
}
