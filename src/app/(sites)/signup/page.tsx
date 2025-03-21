import AdminSignUp from '@/components/admin/AdminSignUp';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up page',
};

const SignupPage = () => {
  return <AdminSignUp />;
};

export default SignupPage;
