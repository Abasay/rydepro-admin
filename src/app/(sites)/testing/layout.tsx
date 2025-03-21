import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { SignInProvider } from '@/contexts/SignUpContext';
import { LogInProvider } from '@/contexts/LoginContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Testing',
  description: 'Testing',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignInProvider>
      <LogInProvider>
        {children}
        <Toaster />
      </LogInProvider>
    </SignInProvider>
  );
}
