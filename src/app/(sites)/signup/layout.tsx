import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });
import { SignInProvider } from '@/contexts/SignUpContext';
import { ResetProvider } from '@/contexts/ResetContext';
import { LogInProvider } from '@/contexts/LoginContext';

export const metadata: Metadata = {
  title: 'RydePro - SignUp',
  description: '',
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignInProvider>
      <ResetProvider>
        <LogInProvider>
          {children}
          <Toaster />
        </LogInProvider>
      </ResetProvider>
    </SignInProvider>
  );
}
