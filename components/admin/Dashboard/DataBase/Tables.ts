import { Header } from '@/types/DashboardTypes/tables';

export const headers: Header[] = [
  {
    data: '',
    className: 'flex items-start gap-12 min-w-[1124px] mr-12 ',
    subHeaders: [
      {
        data: 'S/N',
        className: 'pb-1 min-w-12 max-w-12 flex gap-2 items-center',
        hasIcon: true,
      },
      { data: 'Account Type', className: 'pb-1 min-w-[124px] max-w-[124px]' },
      {
        data: 'Driver ID',
        className: 'pb-1 min-w-[164px] max-w-[164px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Accessibility',
        className: 'pb-1 min-w-[140px] max-w-[140px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Name',
        className: 'pb-1 min-w-[200px] max-w-[200px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Display Name',
        className: 'pb-1 min-w-[128px] max-[128px] flex gap-2',
        hasIcon: true,
      },
    ],
  },
  {
    data: '',
    className: ' flex gap-12 min-w-[3096px] ',
    subHeaders: [
      {
        data: 'Other Languages',
        className:
          'pb-1 items-center flex gap-2  text-[#0E0E0E]   min-w-[164px] max-w-[164px]',
        hasIcon: true,
      },
      {
        data: 'DOB',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Gender',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Email Address',
        className: 'pb-1 items-center min-w-[200px] max-w-[200px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Phone Number',
        className: 'pb-1 items-center min-w-[138px] max-w-[138px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Country',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'State',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'City',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Referred By',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Registered Date / Time',
        className: 'pb-1 items-center min-w-[210px] max-w-[210px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Activity Details',
        className: 'pb-1 items-center min-w-[320px] max-w-[320px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Ratings',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Last Booking',
        className: 'pb-1 items-center min-w-[200px] max-w-[200px] flex gap-2',
        hasIcon: true,
      },
      {
        data: 'Status',
        className: 'pb-1 items-center min-w-[124px] max-w-[124px] flex gap-2',
        hasIcon: true,
      },
    ],
  },
  {
    data: '',
    externalContainer: true,
    className: ' flex flex-col gap-1 items-center ',
    containerContent: {
      data: '',
      className: ' flex gap-12 items-end min-w-[6900px] ',
      externalContainer: true,
      containerContent: [
        {
          data: '',
          className:
            ' flex flex-col items-center min-w-[1548px] max-w-[1548px] gap-1',
          headerText: 'Personal Document',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12 ',
            externalContainer: true,
            subHeaders: [
              {
                data: 'Driver License Information',
                className: 'min-w-[220px] max-w-[220px]',
              },
              {
                data: 'Social Security',
                className: 'min-w-[154px] max-w-[154px] flex gap-2',
                hasIcon: true,
              },
              {
                data: 'Residential Address',
                className: 'min-w-[212px] max-w-[212px]',
              },
              {
                data: 'Proof of Residential Address',
                className: 'min-w-[250px] max-w-[250px]',
              },
              {
                data: 'Demographics',
                className: 'min-w-[138px] max-w-[138px]',
              },
              {
                data: 'Country of Birth',
                className: 'min-w-[150px] max-w-[150px] flex gap-2',
                hasIcon: true,
              },
              {
                data: 'Citizenship',
                className: 'min-w-[250px] max-w-[250px]',
              },
            ],
          },
        },
        {
          data: '',
          className:
            ' flex flex-col items-center bg-[#EAFCEC] min-w-[1615px] max-w-[1880px] gap-1',
          headerText: 'Company Information',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12  items-center',
            externalContainer: true,
            subHeaders: [
              {
                data: 'Company Documentation',
                className: 'text-sm min-w-[340px] max-w-[340px]',
              },
              {
                data: 'Registered Business Address',
                className: 'min-w-[230px] max-w-[230px]',
              },
              {
                data: 'Proof of Business Address',
                className: 'min-w-[214px] max-w-[214px]',
              },
              {
                data: 'Livery Certification',
                className: 'min-w-[310px] max-w-[310px]',
              },
              {
                data: 'Airport Permit Certificates',
                className: 'min-w-[220px] max-w-[220px]',
              },
              {
                data: 'Business Certification',
                className: 'min-w-[310px] max-w-[310px]',
              },
            ],
          },
        },
        {
          data: '',
          className:
            ' flex flex-col items-center bg-[#FFE5E9] min-w-[770px] max-w-[770px] gap-1',
          headerText: 'Vehicle Information',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12  items-center',
            externalContainer: true,
            subHeaders: [
              {
                data: 'Vehicle Insurance Certificate',
                className: 'text-sm min-w-[234px] max-w-[124px]',
              },
              {
                data: 'Vehicle Information and Images',
                className: 'min-w-[254px] max-w-[254px]',
              },
              {
                data: 'Approved Drivers',
                className: 'min-w-[184px] max-w-[184px]',
              },
            ],
          },
        },
        {
          data: '',
          className:
            ' flex flex-col items-center bg-[#FFF7E5] min-w-[1047px] max-w-[1547px] gap-1',
          headerText: 'Background Check',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12  items-center',
            externalContainer: true,
            subHeaders: [
              {
                data: 'MV or DMV Report',
                className: 'text-sm min-w-[164px] max-w-[164px]',
              },
              {
                data: 'Checkr',
                className: 'min-w-[190px] max-w-[190px]',
              },
              {
                data: 'Proof of Live Scan Submission',
                className: 'min-w-[268px] max-w-[268px]',
              },
              {
                data: 'Submit LSR Information',
                className: 'min-w-[189px] max-w-[189px]',
              },
              {
                data: 'Live Scan Final Report',
                className: 'min-w-[188px] max-w-[188px]',
              },
            ],
          },
        },
        {
          data: '',
          className:
            ' flex flex-col items-start bg-[#D7EED9] min-w-[200px] max-w-[200px] gap-1',
          headerText: 'Deposit Information',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12  items-center',
            externalContainer: true,
            subHeaders: [
              {
                data: 'Deposit Details',
                className: 'text-sm min-w-[124px] max-w-[124px]',
              },
            ],
          },
        },
        {
          data: '',
          className:
            ' flex flex-col items-center bg-[#FFF7E5] min-w-[1092px] max-w-[1047px] gap-1',
          headerText: 'Optional Information',
          externalContainer: true,
          containerContent: {
            data: '',
            className: ' flex gap-12  items-center',
            externalContainer: true,
            subHeaders: [
              {
                data: 'Military Service',
                className: 'text-sm min-w-[240px] max-w-[240px]',
              },
              {
                data: 'Law Enforcement/Federal Agent Service',
                className: 'min-w-[320px] max-w-[320px]',
              },
              {
                data: 'Security Clearance',
                className: 'min-w-[440px] max-w-[440px]',
              },
            ],
          },
        },
      ],
    },
  },
];
