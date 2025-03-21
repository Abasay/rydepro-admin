// pages/terms.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TermsResponse {
  content: string;
}

const TermsPage = () => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get<TermsResponse>(
          'http://localhost:5050/api/dashboard/admin/terms'
        );
        console.log(response);
        if (response.data) {
          setContent((response.data as any).terms[0].content);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };
    fetchTerms();
  }, []);

  if (!content) {
    return (
      <p className='p-6 text-center'>Terms and Conditions are not available.</p>
    );
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Terms and Conditions</h1>
      <div className='whitespace-pre-line'>{content}</div>
    </div>
  );
};

export default TermsPage;
