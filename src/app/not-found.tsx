import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className='bg-white flex flex-col min-h-[100%] justify-center'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href='/'>Go back to Home</Link>
    </div>
  );
};

export default NotFound;
