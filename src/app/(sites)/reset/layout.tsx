import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });
import { ResetProvider } from '@/contexts/ResetContext';
import { SignInProvider } from '@/contexts/SignUpContext';
import { LogInProvider } from '@/contexts/LoginContext';

export const metadata: Metadata = {
  title: 'RydePro - Reset',
  description: '',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignInProvider>
      <LogInProvider>
        <ResetProvider>
          {children}
          <Toaster />
        </ResetProvider>
      </LogInProvider>
    </SignInProvider>
  );
}
