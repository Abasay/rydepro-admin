export type JobTitle = {
  title: string;
  count: number;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type EmployeeLoginInfo = {
  lastLogin: string;
  lastSeen: string;
  department: string;
  jobTitle: string;
  updateDate: string;
  operatorId: string;
  currentStatus: string;
};

export type PersonalInfo = {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dob: string;
  gender: string;
  primaryPhone: string;
  secondaryPhone: string;
  emergencyPhone: string;
  email: string;
  secondEmail: string;
  profileImage: string;
};

export type ResidentialAddress = {
  buildingNumber: string;
  streetAddress: string;
  aptSuite: string;
  city: string;
  state: string;
  region: string;
  postalCode: string;
  country: string;
};

export type Demographics = {
  demographic: string;
  countryOfBirth: string;
  isUsCitizen: boolean;
  hasGreenCard: boolean;
  otherLanguages: string;
  ethnicity: string;
  speaksEnglish: boolean;
  country: string;
};

export type BankInfo = {
  routingNumber: string;
  accountNumber: string;
};

export type EmployeeDetails = {
  loginInfo: EmployeeLoginInfo;
  personalInfo: PersonalInfo;
  residentialAddress: ResidentialAddress;
  demographics: Demographics;
  bankInfo: BankInfo;
};
