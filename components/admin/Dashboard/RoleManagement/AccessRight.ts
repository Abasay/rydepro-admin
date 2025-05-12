import { AccessRightSection } from './types/access';

export const initialAccessRights: AccessRightSection[] = [
  {
    id: 'personal',
    title: 'Personal Documents',
    documents: [
      {
        id: 'driver-license',
        name: 'Driver License Information',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'license-number', name: "Real Driver's License Number", isSelected: false },
              { id: 'state', name: 'State of Issue', isSelected: false },
              { id: 'issue-date', name: 'Issue Date', isSelected: false },
              { id: 'expiration', name: 'Expiration Date', isSelected: false },

              { id: 'front-image', name: 'Front Image View', isSelected: false },
              { id: 'back-image', name: 'Back Image View', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'license-number', name: "Real Driver's License Number", isSelected: false },
              { id: 'state', name: 'State of Issue', isSelected: false },
              { id: 'issue-date', name: 'Issue Date', isSelected: false },
              { id: 'expiration', name: 'Expiration Date', isSelected: false },
              { id: 'front-image', name: 'Front Image View', isSelected: false },
              { id: 'back-image', name: 'Back Image View', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'license-number', name: "Real Driver's License Number", isSelected: false },
              { id: 'state', name: 'State of Issue', isSelected: false },
              { id: 'issue-date', name: 'Issue Date', isSelected: false },
              { id: 'expiration', name: 'Expiration Date', isSelected: false },
              { id: 'front-image', name: 'Front Image View', isSelected: false },
              { id: 'back-image', name: 'Back Image View', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'social-security',
        name: 'Social Security Number',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'ssn-number', name: 'SSN Number', isSelected: false },
              { id: 'ssn-card', name: 'Social Security Card', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'ssn-number', name: 'SSN Number', isSelected: false },
              { id: 'ssn-card', name: 'Social Security Card', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'ssn-number', name: 'SSN Number', isSelected: false },
              { id: 'ssn-card', name: 'Social Security Card', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'residential-address',
        name: 'Residential Address',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'building-number', name: 'Building Number', isSelected: false },
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'apt-suite', name: 'Apt/Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'building-number', name: 'Building Number', isSelected: false },
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'apt-suite', name: 'Apt/Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'building-number', name: 'Building Number', isSelected: false },
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'apt-suite', name: 'Apt/Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'phone-bill',
        name: 'Phone Bill',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'phone-number', name: 'Phone Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'phone-number', name: 'Phone Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'phone-number', name: 'Phone Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'utility-bill',
        name: 'Utility Bill',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'billing-period', name: 'Billing Period', isSelected: false },
              { id: 'amount-due', name: 'Amount Due', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'demographics',
        name: 'Demographics',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'country-of-birth', name: 'Country of Birth', isSelected: false },
              { id: 'other-languages', name: 'Other Languages', isSelected: false },
              { id: 'ethnicity', name: 'Ethnicity', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'country-of-birth', name: 'Country of Birth', isSelected: false },
              { id: 'other-languages', name: 'Other Languages', isSelected: false },
              { id: 'ethnicity', name: 'Ethnicity', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'country-of-birth', name: 'Country of Birth', isSelected: false },
              { id: 'other-languages', name: 'Other Languages', isSelected: false },
              { id: 'ethnicity', name: 'Ethnicity', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'citizenship-residency',
        name: 'Citizenship and Residency',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'us-citizen-birth', name: 'Are you a U.S Citizen by Birth', isSelected: false },
              { id: 'us-citizen-naturalization', name: 'Are you a U.S citizen by Naturalization', isSelected: false },
              { id: 'green-card', name: 'Green Card/Work Permit', isSelected: false },
              { id: 'proof-information', name: 'Proof of Information', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'us-citizen-birth', name: 'Are you a U.S Citizen by Birth', isSelected: false },
              { id: 'us-citizen-naturalization', name: 'Are you a U.S citizen by Naturalization', isSelected: false },
              { id: 'green-card', name: 'Green Card/Work Permit', isSelected: false },
              { id: 'proof-information', name: 'Proof of Information', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'us-citizen-birth', name: 'Are you a U.S Citizen by Birth', isSelected: false },
              { id: 'us-citizen-naturalization', name: 'Are you a U.S citizen by Naturalization', isSelected: false },
              { id: 'green-card', name: 'Green Card/Work Permit', isSelected: false },
              { id: 'proof-information', name: 'Proof of Information', isSelected: false },
            ],
          },
        },
      },
    ],
    closeModal: false,
  },
  {
    id: 'company-information',
    title: 'Company Information',
    documents: [
      {
        id: 'company-documentation',
        name: 'Company Documentation',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'company-structure', name: 'Company Structure', isSelected: false },
              { id: 'company-name', name: 'Company Name', isSelected: false },
              { id: 'date-of-incorporation', name: 'Date of Incorporation', isSelected: false },
              { id: 'tax-id', name: 'Tax ID', isSelected: false },
              { id: 'state-of-incorporation', name: 'State of Incorporation', isSelected: false },
              {
                id: 'business-same-as-residential',
                name: 'Is Your Business the Same as Residential Address',
                isSelected: false,
              },
              { id: 'irs-ein-tin-verification', name: 'IRS EIN/TIN Verification Letter', isSelected: false },
              {
                id: 'certificate-of-good-standing',
                name: 'Current Certificate of Good Standing (CGS)',
                isSelected: false,
              },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'company-structure', name: 'Company Structure', isSelected: false },

              { id: 'company-name', name: 'Company Name', isSelected: false },
              { id: 'date-of-incorporation', name: 'Date of Incorporation', isSelected: false },
              { id: 'tax-id', name: 'Tax ID', isSelected: false },
              { id: 'state-of-incorporation', name: 'State of Incorporation', isSelected: false },
              {
                id: 'business-same-as-residential',
                name: 'Is Your Business the Same as Residential Address',
                isSelected: false,
              },
              { id: 'irs-ein-tin-verification', name: 'IRS EIN/TIN Verification Letter', isSelected: false },
              {
                id: 'certificate-of-good-standing',
                name: 'Current Certificate of Good Standing (CGS)',
                isSelected: false,
              },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'company-structure', name: 'Company Structure', isSelected: false },
              { id: 'company-name', name: 'Company Name', isSelected: false },
              { id: 'date-of-incorporation', name: 'Date of Incorporation', isSelected: false },
              { id: 'tax-id', name: 'Tax ID', isSelected: false },
              { id: 'state-of-incorporation', name: 'State of Incorporation', isSelected: false },
              {
                id: 'business-same-as-residential',
                name: 'Is Your Business the Same as Residential Address',
                isSelected: false,
              },
              { id: 'irs-ein-tin-verification', name: 'IRS EIN/TIN Verification Letter', isSelected: false },
              {
                id: 'certificate-of-good-standing',
                name: 'Current Certificate of Good Standing (CGS)',
                isSelected: false,
              },
            ],
          },
        },
      },
      {
        id: 'registered-business-address',
        name: 'Registered Business Address',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'suite', name: 'Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'suite', name: 'Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'street-address', name: 'Street Address', isSelected: false },
              { id: 'suite', name: 'Suite', isSelected: false },
              { id: 'city', name: 'City', isSelected: false },
              { id: 'state', name: 'State', isSelected: false },
              { id: 'region-county', name: 'Region/County', isSelected: false },
              { id: 'postal-code', name: 'Postal Code/Zip Code', isSelected: false },
              { id: 'country', name: 'Country', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'proof-of-business-address',
        name: 'Proof of Business Address',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'phone-bill', name: 'Phone Bill', isSelected: false },
              { id: 'utility-bill', name: 'Utility Bill', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'phone-bill', name: 'Phone Bill', isSelected: false },
              { id: 'utility-bill', name: 'Utility Bill', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'phone-bill', name: 'Phone Bill', isSelected: false },
              { id: 'utility-bill', name: 'Utility Bill', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'airport-permit-certificate',
        name: 'Airport Permit Certificate',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'certificate-image', name: 'Certificate Image', isSelected: false },
              { id: 'airport-location', name: 'Airport Location', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'certificate-image', name: 'Certificate Image', isSelected: false },
              { id: 'airport-location', name: 'Airport Location', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'certificate-image', name: 'Certificate Image', isSelected: false },
              { id: 'airport-location', name: 'Airport Location', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'business-certification',
        name: 'Business Certification (Optional)',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'dvbe', name: 'Disabled Veteran Business Enterprise State Local (DVBE)', isSelected: false },
              { id: 'mbe', name: 'Minority Business Enterprise (MBE)', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'dvbe', name: 'Disabled Veteran Business Enterprise State Local (DVBE)', isSelected: false },
              { id: 'mbe', name: 'Minority Business Enterprise (MBE)', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'dvbe', name: 'Disabled Veteran Business Enterprise State Local (DVBE)', isSelected: false },
              { id: 'mbe', name: 'Minority Business Enterprise (MBE)', isSelected: false },
            ],
          },
        },
      },
    ],
    closeModal: false,
  },
  {
    id: 'vehicle',
    title: 'Vehicles',
    documents: [
      {
        id: 'vehicle-insurance-certificate',
        name: 'Vehicle Insurance Certificate',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'insurance-carrier-name', name: 'Insurance Carrier Name', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'insurance-image', name: 'Insurance Image', isSelected: false },
              { id: 'vehicle-coi', name: 'Vehicle Certificate of Liability Insurance (COI)', isSelected: false },
              { id: 'coi-expiration-date', name: 'COI Expiration Date', isSelected: false },
              { id: 'type-of-insurance', name: 'Type of Insurance', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'insurance-carrier-name', name: 'Insurance Carrier Name', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'insurance-image', name: 'Insurance Image', isSelected: false },
              { id: 'vehicle-coi', name: 'Vehicle Certificate of Liability Insurance (COI)', isSelected: false },
              { id: 'coi-expiration-date', name: 'COI Expiration Date', isSelected: false },
              { id: 'type-of-insurance', name: 'Type of Insurance', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'insurance-carrier-name', name: 'Insurance Carrier Name', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'insurance-image', name: 'Insurance Image', isSelected: false },
              { id: 'vehicle-coi', name: 'Vehicle Certificate of Liability Insurance (COI)', isSelected: false },
              { id: 'coi-expiration-date', name: 'COI Expiration Date', isSelected: false },
              { id: 'type-of-insurance', name: 'Type of Insurance', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'vehicle-information',
        name: 'Vehicle Information',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'vehicle-make', name: 'Vehicle Make', isSelected: false },
              { id: 'vehicle-model', name: 'Vehicle Model', isSelected: false },
              { id: 'vehicle-year', name: 'Vehicle Year', isSelected: false },
              { id: 'license-plate-number', name: 'License Plate Number', isSelected: false },
              { id: 'license-plate-state', name: 'License Plate State', isSelected: false },
              { id: 'vin-number', name: 'VIN Number', isSelected: false },
              { id: 'front-image-view', name: 'Front Image View', isSelected: false },
              { id: 'back-image-view', name: 'Back Image View', isSelected: false },
              { id: 'right-side-image-view', name: 'Right Side Image View', isSelected: false },
              { id: 'left-side-image-view', name: 'Left Side Image View', isSelected: false },
              { id: 'door-vin', name: 'Door VIN', isSelected: false },
              { id: 'glass-vin', name: 'Glass VIN', isSelected: false },
              { id: 'vehicle-registration-card', name: 'Vehicle Registration Card', isSelected: false },
              {
                id: 'vehicle-registration-card-expiration-date',
                name: 'Vehicle Registration Card Expiration Date',
                isSelected: false,
              },
              { id: 'vehicle-insurance-card', name: 'Vehicle Insurance Card', isSelected: false },
              {
                id: 'vehicle-insurance-card-expiration-date',
                name: 'Vehicle Insurance Card Expiration Date',
                isSelected: false,
              },
              { id: 'airport-permit-number', name: 'Airport Permit Number', isSelected: false },
              { id: 'airport-area', name: 'Airport Area', isSelected: false },
              { id: 'vehicle-inspection', name: 'Vehicle Inspection', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'vehicle-make', name: 'Vehicle Make', isSelected: false },
              { id: 'vehicle-model', name: 'Vehicle Model', isSelected: false },
              { id: 'vehicle-year', name: 'Vehicle Year', isSelected: false },
              { id: 'license-plate-number', name: 'License Plate Number', isSelected: false },
              { id: 'license-plate-state', name: 'License Plate State', isSelected: false },
              { id: 'vin-number', name: 'VIN Number', isSelected: false },
              { id: 'front-image-view', name: 'Front Image View', isSelected: false },
              { id: 'back-image-view', name: 'Back Image View', isSelected: false },
              { id: 'right-side-image-view', name: 'Right Side Image View', isSelected: false },
              { id: 'left-side-image-view', name: 'Left Side Image View', isSelected: false },
              { id: 'door-vin', name: 'Door VIN', isSelected: false },
              { id: 'glass-vin', name: 'Glass VIN', isSelected: false },
              { id: 'vehicle-registration-card', name: 'Vehicle Registration Card', isSelected: false },
              {
                id: 'vehicle-registration-card-expiration-date',
                name: 'Vehicle Registration Card Expiration Date',
                isSelected: false,
              },
              { id: 'vehicle-insurance-card', name: 'Vehicle Insurance Card', isSelected: false },
              {
                id: 'vehicle-insurance-card-expiration-date',
                name: 'Vehicle Insurance Card Expiration Date',
                isSelected: false,
              },
              { id: 'airport-permit-number', name: 'Airport Permit Number', isSelected: false },
              { id: 'airport-area', name: 'Airport Area', isSelected: false },
              { id: 'vehicle-inspection', name: 'Vehicle Inspection', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'vehicle-make', name: 'Vehicle Make', isSelected: false },
              { id: 'vehicle-model', name: 'Vehicle Model', isSelected: false },
              { id: 'vehicle-year', name: 'Vehicle Year', isSelected: false },
              { id: 'license-plate-number', name: 'License Plate Number', isSelected: false },
              { id: 'license-plate-state', name: 'License Plate State', isSelected: false },
              { id: 'vin-number', name: 'VIN Number', isSelected: false },
              { id: 'front-image-view', name: 'Front Image View', isSelected: false },
              { id: 'back-image-view', name: 'Back Image View', isSelected: false },
              { id: 'right-side-image-view', name: 'Right Side Image View', isSelected: false },
              { id: 'left-side-image-view', name: 'Left Side Image View', isSelected: false },
              { id: 'door-vin', name: 'Door VIN', isSelected: false },
              { id: 'glass-vin', name: 'Glass VIN', isSelected: false },
              { id: 'vehicle-registration-card', name: 'Vehicle Registration Card', isSelected: false },
              {
                id: 'vehicle-registration-card-expiration-date',
                name: 'Vehicle Registration Card Expiration Date',
                isSelected: false,
              },
              { id: 'vehicle-insurance-card', name: 'Vehicle Insurance Card', isSelected: false },
              {
                id: 'vehicle-insurance-card-expiration-date',
                name: 'Vehicle Insurance Card Expiration Date',
                isSelected: false,
              },
              { id: 'airport-permit-number', name: 'Airport Permit Number', isSelected: false },
              { id: 'airport-area', name: 'Airport Area', isSelected: false },
              { id: 'vehicle-inspection', name: 'Vehicle Inspection', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'operator-information',
        name: 'Operator Information',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'operator-id', name: 'Operator ID', isSelected: false },
              { id: 'operator-name', name: 'Operator Name', isSelected: false },
              { id: 'operator-email', name: 'Operator Email', isSelected: false },
              { id: 'operator-phone-number', name: 'Operator Phone Number', isSelected: false },
              { id: 'country-code', name: 'Country Code', isSelected: false },
              { id: 'assign-vehicle-plate-number', name: 'Assign Vehicle Plate Number', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'operator-id', name: 'Operator ID', isSelected: false },
              { id: 'operator-name', name: 'Operator Name', isSelected: false },
              { id: 'operator-email', name: 'Operator Email', isSelected: false },
              { id: 'operator-phone-number', name: 'Operator Phone Number', isSelected: false },
              { id: 'country-code', name: 'Country Code', isSelected: false },
              { id: 'assign-vehicle-plate-number', name: 'Assign Vehicle Plate Number', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'operator-id', name: 'Operator ID', isSelected: false },
              { id: 'operator-name', name: 'Operator Name', isSelected: false },
              { id: 'operator-email', name: 'Operator Email', isSelected: false },
              { id: 'operator-phone-number', name: 'Operator Phone Number', isSelected: false },
              { id: 'country-code', name: 'Country Code', isSelected: false },
              { id: 'assign-vehicle-plate-number', name: 'Assign Vehicle Plate Number', isSelected: false },
            ],
          },
        },
      },
    ],
    closeModal: false,
  },
  {
    id: 'background-checks',
    title: 'Background Checks',
    documents: [
      {
        id: 'mv-dmv-picture',
        name: 'MV or DMV Picture',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [{ id: 'picture', name: 'Picture', isSelected: false }],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [{ id: 'picture', name: 'Picture', isSelected: false }],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [{ id: 'picture', name: 'Picture', isSelected: false }],
          },
        },
      },
      {
        id: 'checkr',
        name: 'Checkr',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'checkr-report', name: 'Checkr Report', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'checkr-report', name: 'Checkr Report', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'checkr-report', name: 'Checkr Report', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'live-submission',
        name: 'Proof of Live Submission',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'live-submission-image', name: 'Live Submission Image', isSelected: false },
              { id: 'date-of-scan', name: 'Date of Scan', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'live-submission-image', name: 'Live Submission Image', isSelected: false },
              { id: 'date-of-scan', name: 'Date of Scan', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'live-submission-image', name: 'Live Submission Image', isSelected: false },
              { id: 'date-of-scan', name: 'Date of Scan', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'live-scan-report',
        name: 'Live Scan Report Information',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [{ id: 'date-of-scan', name: 'Date of Scan', isSelected: false }],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [{ id: 'date-of-scan', name: 'Date of Scan', isSelected: false }],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [{ id: 'date-of-scan', name: 'Date of Scan', isSelected: false }],
          },
        },
      },
    ],
    closeModal: false,
  },
  {
    id: 'deposit',
    title: 'Deposit',
    documents: [
      {
        id: 'deposit',
        name: 'Deposit',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'social-security-number', name: 'Social Security Number', isSelected: false },
              { id: 'tax-id-number', name: 'Tax ID Number', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'social-security-number', name: 'Social Security Number', isSelected: false },
              { id: 'tax-id-number', name: 'Tax ID Number', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'social-security-number', name: 'Social Security Number', isSelected: false },
              { id: 'tax-id-number', name: 'Tax ID Number', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'bank-account-details',
        name: 'Bank Account Details',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'bank-name', name: 'Bank Name', isSelected: false },
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'address', name: 'Address', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'bank-name', name: 'Bank Name', isSelected: false },
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'address', name: 'Address', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'bank-name', name: 'Bank Name', isSelected: false },
              { id: 'account-number', name: 'Account Number', isSelected: false },
              { id: 'address', name: 'Address', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'debit-card-details',
        name: 'Debit Card Details',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'debit-card-number', name: 'Debit Card Number', isSelected: false },
              { id: 'cvv', name: 'CVV', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'zip-code', name: 'Zip Code', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'debit-card-number', name: 'Debit Card Number', isSelected: false },
              { id: 'cvv', name: 'CVV', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'zip-code', name: 'Zip Code', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'first-name', name: 'First Name', isSelected: false },
              { id: 'middle-name', name: 'Middle Name', isSelected: false },
              { id: 'last-name', name: 'Last Name', isSelected: false },
              { id: 'debit-card-number', name: 'Debit Card Number', isSelected: false },
              { id: 'cvv', name: 'CVV', isSelected: false },
              { id: 'expiration-date', name: 'Expiration Date', isSelected: false },
              { id: 'zip-code', name: 'Zip Code', isSelected: false },
            ],
          },
        },
      },
    ],
    closeModal: false,
  },
  {
    id: 'optional',
    title: 'Optional',
    documents: [
      {
        id: 'military-service',
        name: 'Military Service',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              {
                id: 'served-in-military',
                name: 'Did You Serve or Currently Serving in the US Military',
                isSelected: false,
              },
              { id: 'service-branch', name: 'Choose Service Branch', isSelected: false },
              { id: 'active-or-reservist', name: 'Are you currently Active or Reservist', isSelected: false },
              { id: 'type-of-discharge', name: 'Type of Discharge', isSelected: false },
              { id: 'discharge-dates', name: 'Discharge Dates', isSelected: false },
              { id: 'discharge-papers', name: 'Discharge Papers', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              {
                id: 'served-in-military',
                name: 'Did You Serve or Currently Serving in the US Military',
                isSelected: false,
              },
              { id: 'service-branch', name: 'Choose Service Branch', isSelected: false },
              { id: 'active-or-reservist', name: 'Are you currently Active or Reservist', isSelected: false },
              { id: 'type-of-discharge', name: 'Type of Discharge', isSelected: false },
              { id: 'discharge-dates', name: 'Discharge Dates', isSelected: false },
              { id: 'discharge-papers', name: 'Discharge Papers', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              {
                id: 'served-in-military',
                name: 'Did You Serve or Currently Serving in the US Military',
                isSelected: false,
              },
              { id: 'service-branch', name: 'Choose Service Branch', isSelected: false },
              { id: 'active-or-reservist', name: 'Are you currently Active or Reservist', isSelected: false },
              { id: 'type-of-discharge', name: 'Type of Discharge', isSelected: false },
              { id: 'discharge-dates', name: 'Discharge Dates', isSelected: false },
              { id: 'discharge-papers', name: 'Discharge Papers', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'law-enforcement-service',
        name: 'Law Enforcement/Federal Agent Service',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              { id: 'service-as-officer', name: 'Service as a Law Enforcement Officer', isSelected: false },
              { id: 'agency', name: 'Agency', isSelected: false },
              { id: 'others', name: 'Others', isSelected: false },
              { id: 'active-status', name: 'Are you Active?', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              { id: 'service-as-officer', name: 'Service as a Law Enforcement Officer', isSelected: false },
              { id: 'agency', name: 'Agency', isSelected: false },
              { id: 'others', name: 'Others', isSelected: false },
              { id: 'active-status', name: 'Are you Active?', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              { id: 'service-as-officer', name: 'Service as a Law Enforcement Officer', isSelected: false },
              { id: 'agency', name: 'Agency', isSelected: false },
              { id: 'others', name: 'Others', isSelected: false },
              { id: 'active-status', name: 'Are you Active?', isSelected: false },
            ],
          },
        },
      },
      {
        id: 'security-clearance',
        name: 'Security Clearance',
        isSelected: false,
        permissions: {
          view: {
            id: 'view',
            name: 'View',
            fields: [
              {
                id: 'top-secret-clearance',
                name: 'Did you hold or currently hold Top-Secret Clearance',
                isSelected: false,
              },
              { id: 'type-of-clearance', name: 'Type of Clearance', isSelected: false },
              { id: 'issuing-agency', name: 'The Agency Responsible for Issuing the Clearance', isSelected: false },
            ],
          },
          printEmail: {
            id: 'print',
            name: 'Print/Email',
            fields: [
              {
                id: 'top-secret-clearance',
                name: 'Did you hold or currently hold Top-Secret Clearance',
                isSelected: false,
              },
              { id: 'type-of-clearance', name: 'Type of Clearance', isSelected: false },
              { id: 'issuing-agency', name: 'The Agency Responsible for Issuing the Clearance', isSelected: false },
            ],
          },
          edit: {
            id: 'edit',
            name: 'Edit',
            fields: [
              {
                id: 'top-secret-clearance',
                name: 'Did you hold or currently hold Top-Secret Clearance',
                isSelected: false,
              },
              { id: 'type-of-clearance', name: 'Type of Clearance', isSelected: false },
              { id: 'issuing-agency', name: 'The Agency Responsible for Issuing the Clearance', isSelected: false },
            ],
          },
        },
      },
    ],
    closeModal: false,
  },
];
