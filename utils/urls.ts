export const AdminUrls = {
  signupOtp: '/auth/admin/signup-otp',
  resendOtp: '/auth/admin/resend-otp',
  verifyOtp: '/auth/admin/verify-otp',
  generatePrivateKeys: '/auth/admin/generate-private-keys',
  verifyPrivateKeys: '/auth/admin/verify-private-keys',
  setupPassPhraseandPin: '/auth/admin/setup-passphrase-pincode',

  //Logging In
  login: '/auth/admin/verify-admin-details',
  verifyPassword: '/auth/admin/verify-password',
  verifyPinCode: '/auth/admin/verify-pincode',
  verifyPassphrase: '/auth/admin/check-passphrase',

  //Dashboard
  getAdmin: '/admin/get-admin',
  changePassword: '/admin/change-password',
  verifySecurities: '/admin/verify-securities',
  changePinCode: '/admin/change-pincode',
  changePassphrase: '/admin/change-passphrase',

  //Forgot Password
  recoveryEmail: '/auth/admin/recovery-email',
  recoveryCode: '/auth/admin/verify-recovery-otp',
  verifyIdentity: '/auth/admin/verify-admin-information',
  verifyPinAndPassphrase: '/auth/admin/verify-passphrase-pincode',
  setPassword: '/auth/admin/set-password',
};
