// pages/terms-editor.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TermsResponse {
  content: string;
}

const TermsEditor = () => {
  const [content, setContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Fetch existing terms on load
    const fetchTerms = async () => {
      try {
        const response = await axios.get<TermsResponse>(
          'http://localhost:5050/api/dashboard/admin/terms'
        );
        if (response.data) {
          setContent((response.data as any).terms[0].content);
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };
    fetchTerms();
  }, []);

  const handleSave = async () => {
    try {
      const endpoint = isEditing
        ? 'http://localhost:5050/api/dashboard/admin/update-terms'
        : 'http://localhost:5050/api/dashboard/admin/create-terms';
      await axios.post(endpoint, { content });
      alert(
        isEditing
          ? 'Terms updated successfully!'
          : 'Terms created successfully!'
      );
    } catch (error) {
      console.error('Error saving terms:', error);
      alert('An error occurred while saving.');
    }
  };

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>
        {isEditing ? 'Update Terms' : 'Create Terms'}
      </h2>
      <textarea
        className='w-full h-60 p-3 border border-gray-300 rounded-md'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Enter terms and conditions here...'
      />
      <button
        className='mt-4 bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600'
        onClick={handleSave}
      >
        {isEditing ? 'Update Terms' : 'Create Terms'}
      </button>
    </div>
  );
};

export default TermsEditor;
