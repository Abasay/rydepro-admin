import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import { LogInProvider } from '@/contexts/LoginContext';
import { ResetProvider } from '@/contexts/ResetContext';
import { SignInProvider } from '@/contexts/SignUpContext';

import 'react-toastify/dist/ReactToastify.css';
import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';
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
    <html lang='en'>
      <body>
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
      </body>
    </html>
  );
}
