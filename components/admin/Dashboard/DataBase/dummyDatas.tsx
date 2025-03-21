// export const drivers: any[] = [
//   {
//     'Country of Birth': 'Nigeria',
//     'Citizen and Residency': '', // No direct data
//     'Social Security': '', // No direct data
//     'Residential Address': 'Alakija, Lagos',
//     'Vehicle Information': '', // No direct data
//     'Registered Date': '08 Nov 2024 / 9:12am WAT',
//     'Account Type': 'Individual',
//     'First Name': 'Michael',
//     Name: 'Michael Ajala Akinlola',
//     'Last Name': 'Akinlola',
//     'Middle Name': 'Ajala',
//     Alias: 'Mikeay',
//     'User ID_0': '', // No direct data
//     'User ID': 'IND0001',
//     Accessibility: 'Deaf',
//     'Date of Birth & Age': '01 Jan 1999',
//     Gender: 'Male',
//     'Social Security Number': '', // No direct data
//     'Street Address': 'Alakija, Lagos',
//     Demographics: 'Nigeria',
//     'Company Documentation': '', // No direct data
//     'Company Name': '', // No direct data
//     'Deposit Information': '', // No direct data
//     'Account Name': '', // No direct data
//     'Bank Name': '', // No direct data
//     'Routing Number': '', // No direct data
//   },
//   {
//     'Country of Birth': 'Nigeria',
//     'Citizen and Residency': '', // No direct data
//     'Social Security': '', // No direct data
//     'Residential Address': 'Garki, Abuja',
//     'Vehicle Information': '', // No direct data
//     'Registered Date': '08 Nov 2024 / 11:15am WAT',
//     'Account Type': 'Individual',
//     'First Name': 'Jane',
//     Name: 'Jane Doe',
//     'Last Name': 'Doe',
//     'Middle Name': '',
//     Alias: 'JaneD',
//     'User ID_0': '', // No direct data
//     'User ID': 'IND0002',
//     Accessibility: 'Service Dog',
//     'Date of Birth & Age': '15 Feb 1985',
//     Gender: 'Female',
//     'Social Security Number': '', // No direct data
//     'Street Address': 'Garki, Abuja',
//     Demographics: 'Nigeria',
//     'Company Documentation': '', // No direct data
//     'Company Name': '', // No direct data
//     'Deposit Information': '', // No direct data
//     'Account Name': '', // No direct data
//     'Bank Name': '', // No direct data
//     'Routing Number': '', // No direct data
//   },
//   {
//     'Country of Birth': 'Nigeria',
//     'Citizen and Residency': '', // No direct data
//     'Social Security': '', // No direct data
//     'Residential Address': 'Garki, Abuja',
//     'Vehicle Information': '', // No direct data
//     'Registered Date': '08 Nov 2024 / 11:15am WAT',
//     'Account Type': 'Individual',
//     'First Name': 'Jane',
//     Name: 'Jane Doe',
//     'Last Name': 'Doe',
//     'Middle Name': '',
//     Alias: 'JaneD',
//     'User ID_0': '', // No direct data
//     'User ID': 'IND0002',
//     Accessibility: 'Blind',
//     'Date of Birth & Age': '15 Feb 1985',
//     Gender: 'Female',
//     'Social Security Number': '', // No direct data
//     'Street Address': 'Garki, Abuja',
//     Demographics: 'Nigeria',
//     'Company Documentation': '', // No direct data
//     'Company Name': '', // No direct data
//     'Deposit Information': '', // No direct data
//     'Account Name': '', // No direct data
//     'Bank Name': '', // No direct data
//     'Routing Number': '', // No direct data
//   },
// ];

export const drivers: any[] = Array.from({ length: 15 }, (_, index) => ({
  'S/N': index + 1,
  'Account Type': index % 2 === 0 ? 'Livery Company' : 'TNC',
  'User ID': `DR${1000 + index}`,
  Accessibility: index % 3 === 0 ? 'Deaf' : 'None',
  Name: `John Doe ${index + 1}`,
  'Display Name': `JohnD${index + 1}`,
  'Date of Birth & Age': new Date(Date.now() - index * 86400000)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/(\d+)(?=\s)/, (day) => {
      if (day.endsWith('1') && !day.endsWith('11')) return `${day}st`;
      if (day.endsWith('2') && !day.endsWith('12')) return `${day}nd`;
      if (day.endsWith('3') && !day.endsWith('13')) return `${day}rd`;
      return `${day}th`;
    }),
  'Activity Details': index % 2 === 0 ? 'Active' : 'Inactive',
  'Email Address': `user${index + 1}@example.com`,
  'Phone Number': `+234-800-${String(index + 1).padStart(4, '0')}`,
  Gender: index % 2 === 0 ? 'Male' : 'Female',
  'Other Languages': index % 2 === 0 ? 'Yoruba' : 'Igbo',
  'Driver License Information': `DL${2000 + index}`,
  'Social Security': `SSN${3000 + index}`,
  'Residential Address': `Street ${index + 1}, Lagos`,
  'Proof of Residential Address': 'Nil',
  Demographics: index % 2 === 0 ? 'Nigeria' : 'USA',
  'Country of Birth': index % 2 === 0 ? 'Nigeria' : 'USA',
  Citizenship: index % 3 === 0 ? 'Citizen' : 'Resident',
  'Company Documentation': index % 2 === 0 ? 'Doc Available' : '',
  'Registered Business Address': `Office ${index + 1}, Lagos`,
  'Proof of Business Address': 'Nil',
  'Livery Certification': `LiveryCert${index + 1}`,
  'Airport Permit Certificates': `Permit${index + 1}`,
  'Business Certification': 'Nil',
  'Vehicle Insurance Certificate': `InsuranceCert${index + 1}`,
  'Vehicle Information and Images': `VehicleImg${index + 1}`,
  'Approved Drivers': `ApprovedDriver${index + 1}`,
  'MV or DMV Report': index % 2 === 0 ? 'Available' : 'Unavailable',
  Checkr: `Checker${index + 1}`,
  'Proof of Live Scan Submission': `ScanProof${index + 1}`,
  'Submit LSR Information': 'Yes',
  'Live Scan Final Report': `Report${index + 1}`,
  'Deposit Details': '123456',
  'Military Service': index % 2 === 0 ? 'None' : 'Veteran',
  'Law Enforcement/Federal Agent Service': index % 2 === 0 ? 'EFCC' : 'NDLEA',
  'Security Clearance': index % 3 === 0 ? 'Top Secret' : 'None',
  Ratings: index % 2 === 0 ? 'Excellent' : 'Good',
  'Last Booking': new Date(Date.now() - (index + 10) * 86400000).toLocaleString(
    'en-GB',
    { timeZone: 'Africa/Lagos' }
  ),
  Status: index % 2 === 0 ? 'Online' : 'Offline',
  Country: 'Nigeria',
  State: index % 2 === 0 ? 'Lagos' : 'Abuja',
  City: index % 2 === 0 ? 'Lagos' : 'Abuja',
  'Referred By': `REF${index + 1}`,
  'Registered Date': new Date(Date.now() - index * 86400000).toLocaleString(
    'en-GB',
    { timeZone: 'Africa/Lagos' }
  ),
})).concat(
  Array.from({ length: 10 }, (_, index) => ({
    'S/N': index + 16,
    'Account Type': 'Chauffeur Drivers',
    'User ID': `CH${2000 + index}`,
    Accessibility: 'None',
    Name: `Chauffeur Driver ${index + 1}`,
    'Display Name': `Chauffeur${index + 1}`,
    'Date of Birth & Age': new Date(Date.now() - (index + 15) * 86400000)
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .replace(/(\d+)(?=\s)/, (day) => {
        if (day.endsWith('1') && !day.endsWith('11')) return `${day}st`;
        if (day.endsWith('2') && !day.endsWith('12')) return `${day}nd`;
        if (day.endsWith('3') && !day.endsWith('13')) return `${day}rd`;
        return `${day}th`;
      }),
    'Activity Details': 'Active',
    'Other Languages': 'English',
    'Email Address': `chauffeur${index + 1}@example.com`,
    'Phone Number': `+234-800-${String(index + 16).padStart(4, '0')}`,
    Gender: 'Male',
    'Driver License Information': `DL${3000 + index}`,
    'Social Security': `SSN${4000 + index}`,
    'Residential Address': `Street ${index + 16}, Lagos`,
    'Proof of Residential Address': 'Nil',
    Demographics: 'Nigeria',
    'Country of Birth': 'Nigeria',
    Citizenship: 'Citizen',
    'Company Documentation': 'Doc Available',
    'Registered Business Address': `Office ${index + 16}, Lagos`,
    'Proof of Business Address': 'Nil',
    'Livery Certification': `LiveryCert${index + 16}`,
    'Airport Permit Certificates': `Permit${index + 16}`,
    'Business Certification': 'Nil',
    'Vehicle Insurance Certificate': `InsuranceCert${index + 16}`,
    'Vehicle Information and Images': `VehicleImg${index + 16}`,
    'Approved Drivers': `ApprovedDriver${index + 16}`,
    'MV or DMV Report': 'Available',
    Checkr: `Checker${index + 16}`,
    'Proof of Live Scan Submission': `ScanProof${index + 16}`,
    'Submit LSR Information': 'Yes',
    'Live Scan Final Report': `Report${index + 16}`,
    'Deposit Details': '123456',
    'Military Service': 'None',
    'Law Enforcement/Federal Agent Service': 'EFCC',
    'Security Clearance': 'Top Secret',
    Ratings: 'Excellent',
    'Last Booking': new Date(Date.now() - (index + 25) * 86400000).toLocaleString(
      'en-GB',
      { timeZone: 'Africa/Lagos' }
    ),
    Status: 'Online',
    Country: 'Nigeria',
    State: 'Lagos',
    City: 'Lagos',
    'Referred By': `REF${index + 16}`,
    'Registered Date': new Date(Date.now() - (index + 15) * 86400000).toLocaleString(
      'en-GB',
      { timeZone: 'Africa/Lagos' }
    ),
  }))
);

type User = {
  [key: string]: string | number;
};

// Helper function to generate random data
const randomElement = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const generateDate = () => {
  const now = new Date();
  const randomDate = new Date(
    now.getTime() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000
  ); // last 5 years
  return randomDate.toLocaleString('en-GB', { timeZone: 'Africa/Lagos' });
};

const randomDateOfBirth = (): string => {
  const start = new Date(1960, 0, 1); // Start date: 1 Jan 1960
  const end = new Date(2010, 11, 31); // End date: 31 Dec 2010
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); // e.g., 01 Jan 1999
};

const randomTimestamp = (): string => {
  const start = new Date(2024, 0, 1); // Start date: 1 Jan 2024
  const end = new Date(); // Current date
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const datePart = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }); // e.g., 08 Nov 2024

  const timePart = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }); // e.g., 9:12 AM

  return `${datePart} / ${timePart} WAT`;
};

export const generateUsers = (count: number): User[] => {
  const names = [
    'Michael Ajala Akinlola',
    'Jane Doe',
    'John Smith',
    'Ngozi Okeke',
    'Adeola Balogun',
    'Fatima Hassan',
    'Chinwe Chukwuemeka',
    'Kunle Adebayo',
    'Abdulrahman Sanni',
    'Grace Williams',
    'Samuel Johnson',
    'Aisha Mohammed',
    'Bolanle Olatunji',
    'Emeka Nwosu',
    'Tobi Alabi',
    'Efe Oghenekaro',
    'Victoria Uche',
    'Ahmed Musa',
    'Yetunde Bello',
    'Chinedu Obiora',
  ];

  const cities = [
    'Lagos',
    'Abuja',
    'Ibadan',
    'Port Harcourt',
    'Kano',
    'Enugu',
    'Jos',
    'Calabar',
    'Uyo',
    'Onitsha',
    'Abeokuta',
    'Owerri',
    'Akure',
    'Warri',
    'Minna',
    'Kaduna',
    'Zaria',
    'Ikeja',
    'Makurdi',
    'Osogbo',
  ];

  const states = [
    'Lagos',
    'Abuja',
    'Oyo',
    'Rivers',
    'Kano',
    'Enugu',
    'Plateau',
    'Cross River',
    'Akwa Ibom',
    'Anambra',
    'Ogun',
    'Imo',
    'Ondo',
    'Delta',
    'Niger',
    'Kaduna',
    'Edo',
    'Benue',
    'Osun',
    'Ekiti',
  ];

  const devices = [
    'Dell Latitude',
    'HP Pavillion',
    'MacBook Pro',
    'Acer Aspire',
    'Lenovo ThinkPad',
    'Microsoft Surface',
    'Asus ROG',
    'Chromebook Pixel',
    'Samsung Galaxy Book',
    'Alienware M15',
  ];

  const ratings = ['Excellent', 'Good', 'Average', 'Poor'];

  const languages = [
    'English',
    'French',
    'Spanish',
    'Yoruba',
    'Igbo',
    'Hausa',
    'Pidgin',
    'German',
    'Italian',
    'Portuguese',
  ];
  const accessibilityOptions = ['Deaf', 'Blind', 'Service Dog', 'None'];

  const emails = [
    'michael.akinlola@gmail.com',
    'jane.doe@example.com',
    'john.smith@yahoo.com',
    'ngozi.okeke@outlook.com',
    'adeola.balogun@gmail.com',
    'fatima.hassan@hotmail.com',
    'chinwe.chukwuemeka@example.com',
    'kunle.adebayo@gmail.com',
    'abdulrahman.sanni@yahoo.com',
    'grace.williams@outlook.com',
    'samuel.johnson@gmail.com',
    'aisha.mohammed@yahoo.com',
    'bolanle.olatunji@hotmail.com',
    'emeka.nwosu@example.com',
    'tobi.alabi@gmail.com',
    'efe.oghenekaro@yahoo.com',
    'victoria.uche@hotmail.com',
    'ahmed.musa@example.com',
    'yetunde.bello@gmail.com',
    'chinedu.obiora@yahoo.com',
  ];

  const phones = [
    '+234-810-123-4567',
    '+234-802-345-6789',
    '+234-809-987-6543',
    '+234-813-765-4321',
    '+234-805-567-8901',
    '+234-807-654-3210',
    '+234-808-456-7890',
    '+234-816-789-0123',
    '+234-818-890-1234',
    '+234-803-123-0987',
    '+234-814-234-5678',
    '+234-806-345-6789',
    '+234-812-456-7890',
    '+234-817-567-8901',
    '+234-819-678-9012',
    '+234-815-789-0123',
    '+234-811-890-1234',
    '+234-818-234-5678',
    '+234-802-567-8901',
    '+234-813-678-9012',
  ];

  return Array.from({ length: count }, (_, id) => {
    const name = randomElement(names);
    const firstName = name.split(' ')[0];
    return {
      Id: id + 1,
      'Account Type': randomElement(['Individual', 'Organization']),
      'User ID': `IND${String(id + 1).padStart(4, '0')}`,
      Accessibility: randomElement(accessibilityOptions),
      Name: name,
      'Display Name': firstName,
      'Other Languages': randomElement(languages),
      'Date of Birth & Age': randomDateOfBirth(),
      Gender: randomElement(['Male', 'Female', 'Other']),
      'Email Address': `${firstName.toLowerCase()}${id}@example.com`,
      'Phone Number': `+234-810-3${Math.floor(Math.random() * 100000)}`,
      Country: 'Nigeria',
      State: randomElement(states),
      City: randomElement(cities),
      'Referred By': `REF${Math.floor(Math.random() * 1000)}`,
      'Registered Date': randomTimestamp(),
      'Last Booking': randomTimestamp(),
      Status: randomElement(['Online', 'Offline']),
      Ratings: randomElement(ratings),
      'Activity Details': `Device Coordinate: ${randomElement(cities)}, ${(
        Math.random() * 40
      ).toFixed(4)}, ${(-Math.random() * 50).toFixed(
        4
      )}, Device Name: ${randomElement(devices)}, App`,
    };
  });
};

// // Generate 100 dummy users
// const users = generateUsers(100);
// console.log(users);
