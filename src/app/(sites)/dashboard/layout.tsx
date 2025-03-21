import { DashboardProvider } from '@/contexts/DashboardContext';
import { DBProvider } from '@/contexts/DBContext';
import { LogInProvider } from '@/contexts/LoginContext';
import { ResetProvider } from '@/contexts/ResetContext';
import { SignInProvider } from '@/contexts/SignUpContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RydePro - Admin Dashboard',
  description: '',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <SignInProvider>
        <LogInProvider>
          <DBProvider>
            <ResetProvider>
              {' '}
              {children}
              <Toaster />
            </ResetProvider>
          </DBProvider>
        </LogInProvider>
      </SignInProvider>
    </DashboardProvider>
  );
}
