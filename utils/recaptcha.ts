// utils/recaptcha.ts

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const executeRecaptcha = async (
  action: string
): Promise<string | null> => {
  if (typeof window !== 'undefined' && window.grecaptcha) {
    return await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
      { action }
    );
  }
  console.log('In executeRecaptcha');
  return null;
};
