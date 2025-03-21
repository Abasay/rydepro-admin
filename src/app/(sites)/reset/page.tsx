import Reset from '@/components/admin/ForgotPassword/index';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset password page',
};

const ResetAccount = () => {
  return <Reset />;
};

export default ResetAccount;
