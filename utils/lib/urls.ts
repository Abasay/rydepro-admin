//LIST OF THE ENDPOINTS USED IN THE APPLICATION

import { get } from 'http';

export const URLS = {
  userSignIn: '/auth/login', // User Sign In
  userSignUp: '/auth/signup', // User Sign Up

  adminSignUp: '/auth/admin/signup', // Admin Sign Up
  adminSignUpOtp: '/auth/admin/request-otp',
  adminVerifyOtp: '/auth/admin/verify-otp',
  createPassPhrase: '/auth/admin/signup/create-passphrase',
  createPinCode: '/auth/admin/signup/create-pincode',
  createProfile: '/auth/admin/signup/create-profile',
  create2FA: '/auth/admin/signup/create-2fa',
  verify2FA: '/auth/admin/verify-2fa',
  getAuthsEnabled: '/auth/admin/auths-enabled',

  //ADMIN LOG IN
  adminLogin: '/auth/admin/login', // Admin Sign Up
  adminLogInOtp: '/auth/admin/login/request-otp',
  adminVerifyLogInOtp: '/auth/admin/login/verify-otp',
  verifyPassPhrase: '/auth/admin/login/verify-passphrase',
  verifyPinCode: '/auth/admin/login/verify-pincode',

  //RESET PASSWORD
  resetPassword: '/auth/admin/reset-password', // Reset Password
  confirmCredentials: '/auth/admin/reset/confirm-credentials', // Confirm Credentials
  confirmToken: '/auth/admin/reset/confirm-token', // Confirm Token
  createNewPassword: '/auth/admin/reset/create-new-password', // Create New Password

  confirmProfileFull: '/auth/admin/reset/verify-full-profile',

  //RESET
  requestResetOtp: '/auth/admin/reset/request-otp',
  verifyResetOtp: '/auth/admin/reset/verify-otp',
  verifyPasswordReset: '/auth/admin/reset/verify-password',
  verifyPassPhraseReset: '/auth/admin/reset/verify-passphrase',
  verifyPinCodeReset: '/auth/admin/reset/verify-pincode',

  //RESET PASSPHRASE
  createNewPassphrase: '/auth/admin/reset/create-new-passphrase',

  //RESET PINCODE
  createNewPinCode: '/auth/admin/reset/create-new-pincode',

  //ADMIN DASHBOARD
  getAdmin: '/dashboard/admin', // Get Admin
  getUsers: '/dashboard/admin/users', // Get Users (add a parameter to specify the type of user)
  getMetrics: '/dashboard/admin/metrics', // Get Metrics

  priceSetup: '/price/setup', // Price Setup
  priceUpdate: '/price/update-price', // Price Update
  getPrices: '/price/get-prices', // Get Prices
  updateZonal: '/price/update-zonal', // Update Zonal
  updateZonalPrices: '/price/update-zonal-prices', // Update Zonal Prices

  BASE_URL_ADMIN: process.env.NEXT_PUBLIC_BASEURL_ADMIN,

  //ADMIN DASHBOARDS
  createVehicle: '/admin/vehicles/create-vehicle',
  updateVehicle: '/admin/vehicles/update-vehicle',
  deleteVehicle: '/admin/vehicles/delete-vehicle',
  createService: '/admin/services/create-service',
  updateService: '/admin/services/update-service',
  deleteService: '/admin/services/delete-service',
  getServices: '/admin/services/get-services',
  getVehicles: '/admin/vehicles/admin-vehicles',
  uploadImg: '/admin/vehicles/upload-image',
  getVehicle: '/admin/vehicles/get-vehicle',

  //ZONES AND PRICEINGS
  getZones: '/admin/zones/zone-list',
  createZone: '/admin/zones/add-zone',
  createVariables: '/api/pricing/set-variables',
  updateVariables: '/api/pricing/update-variable/',
  getVariables: '/api/pricing/get-variables',
  createFormula: '/api/pricing/set-formula',
  formulas: '/api/pricing/get-formulas',
  getFeeSections: '/api/pricing/get-categories',
  setPricing: '/api/pricing/set-zone-pricing',
  deleteZone: '/admin/zones/delete-zone/',
  deleteVariable: '/api/pricing/delete-variable/',
  deleteFeeType: '/api/pricing/delete-fee/',
  deleteFormula: '/api/pricing/delete-formula/',
  updateFormula: '/api/pricing/update-formula/',
  getPricings: '/api/pricing/all-pricings',
  deletePricing: '/api/pricing/delete-pricing/',
};
