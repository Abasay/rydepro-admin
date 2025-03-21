import { Driver } from './DriversTable';
import {
  Organization,
  UsersGeneral,
  backgroundChecks,
  deposit,
  companyInformation,
  optionalInfo,
  vehicleInformation,
  personalDocs,
} from './Filters';

export type Filters = {
  [key: string]: string[] | string; // Matches the structure of your filters
};

const items = [
  ...Object.values(Organization)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(UsersGeneral)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(backgroundChecks)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(deposit)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(companyInformation)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(optionalInfo)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(vehicleInformation)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
  ...Object.values(personalDocs)
    .map((item) =>
      item.subTitle.map((sub) => {
        return {
          name: sub.name,
          isSelect: sub.isSelect,
          hasInput: sub.hasInput,
        };
      })
    )
    .flat(),
];

console.log(items);

export const filterDrivers = (users: any[], filters: Filters): Driver[] => {
  // Helper to parse date strings
  const parseDate = (dateStr: string) => {
    return new Date(
      dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1') // Remove ordinal indicators
    );
  };
  return users.filter((user) => {
    // Check each filter condition
    for (let [key, values] of Object.entries(filters)) {
      // Skip empty filters
      if (!values || (Array.isArray(values) && values.length === 0)) {
        continue;
      }

      if (!Array.isArray(values)) values = [values];
      // console.log(values);

      if (
        [...values].some((value: string) =>
          items.some(
            (item) =>
              item.name === value &&
              item.hasInput &&
              item.isSelect &&
              key !== 'Gender'
          )
        )
      )
        continue;
      switch (key) {
        case 'Account Type':
          if (!values.includes(user[key])) return false;
          // console.log()
          break;
        case 'User ID':
          // console.log(values);
          // console.log(user[key]);
          if (!values.includes(user[key])) return false;
          break;

        case 'Email Address & Phone Number':
          const splitKey = key.split('&');
          const email = splitKey[0].trim();
          const phone = splitKey[1].trim();
          console.log(email, phone);
          console.log(user[email]);
          if (
            !(values as []).some((name: string) =>
              user[email].toLowerCase().includes(name.toLowerCase())
            ) &&
            !(values as []).some((name: string) =>
              user[phone].toLowerCase().includes(name.toLowerCase())
            )
          )
            return false;

          break;

        // case 'Email Address':
        //   if (
        //     !(values as []).some((name: string) =>
        //       user[key].toLowerCase().includes(name.toLowerCase())
        //     )
        //   )
        //     return false;
        //   break;
        case 'Display Name':
          // console.log(values);
          // console.log(user[key]);
          if (
            !(values as []).some((name: string) =>
              user[key].toLowerCase().includes(name?.toLowerCase())
            )
          )
            return false;
          break;
        case 'Name':
          // console.log(values);
          // console.log(user[key]);
          if (
            !(values as []).some((name: string) =>
              user[key].toLowerCase().includes(name.toLowerCase())
            )
          )
            return false;
          break;

        case 'Registered Date':
          let dates = values as string[];
          let registeredDate = new Date(user[key].split(' / ')[0]);
          // Handle exact date match
          let exactDate = dates.find(
            (d) => !d.includes('Past') && !d.includes(' - ')
          );
          if (exactDate) {
            let parsedExactDate = new Date(
              exactDate.split(' / ')[0].replace(/(\d+)(st|nd|rd|th)/, '$1')
            );
            console.log(parsedExactDate);
            if (registeredDate.getTime() !== parsedExactDate.getTime()) {
              return false; // Exact date does not match
            }
          }

          if (
            dates.includes('Past 7 Days') &&
            !isDateWithinRange(registeredDate, 7)
          )
            return false;

          if (
            dates.includes('Past 14 Days') &&
            !isDateWithinRange(registeredDate, 14)
          ) {
            console.log('Past 14 Days', registeredDate);
            return false;
          }

          if (
            dates.includes('Past 30 Days') &&
            !isDateWithinRange(registeredDate, 30)
          ) {
            return false;
          }
          let customDateRange = dates.find((d) => d.includes(' - '));
          console.log(customDateRange);
          if (customDateRange) {
            let [start, end] = customDateRange
              .split(' - ')
              .map((d) => new Date(d.replace(/(\d+)(st|nd|rd|th)/, '$1')));
            if (!(registeredDate >= start && registeredDate <= end))
              return false;
          }
          break;
        case 'Last Booking':
          let dates1 = values as string[];
          let lastBooking = new Date(user[key].split(' / ')[0]);
          // Handle exact date match
          let exactDate1 = dates1.find(
            (d) => !d.includes('Past') && !d.includes(' - ')
          );
          if (exactDate1) {
            let parsedExactDate1 = new Date(
              exactDate1.split(' / ')[0].replace(/(\d+)(st|nd|rd|th)/, '$1')
            );
            console.log(parsedExactDate1);
            if (lastBooking.getTime() !== parsedExactDate1.getTime()) {
              return false; // Exact date does not match
            }
          }

          if (
            dates1.includes('Past 7 Days') &&
            !isDateWithinRange(lastBooking, 7)
          )
            return false;

          if (
            dates1.includes('Past 14 Days') &&
            !isDateWithinRange(lastBooking, 14)
          ) {
            console.log('Past 14 Days', lastBooking);
            return false;
          }

          if (
            dates1.includes('Past 30 Days') &&
            !isDateWithinRange(lastBooking, 30)
          ) {
            return false;
          }
          let customDateRange1 = dates1.find((d) => d.includes(' - '));
          console.log(customDateRange1);
          if (customDateRange1) {
            let [start, end] = customDateRange1
              .split(' - ')
              .map((d) => new Date(d.replace(/(\d+)(st|nd|rd|th)/, '$1')));
            if (!(lastBooking >= start && lastBooking <= end)) return false;
          }
          break;
        // case 'DOB':
        //   let userDOB = new Date(user.dob); // Convert user's DOB to Date

        //   return (values as []).some((filter: string) => {
        //     if (filter.includes(' - ')) {
        //       // Handle date range
        //       const [start, end] = filter.split(' - ').map(parseDate);
        //       return userDOB >= start && userDOB <= end;
        //     } else {
        //       // Handle specific date
        //       const specificDate = parseDate(filter);
        //       return userDOB.getTime() === specificDate.getTime();
        //     }
        //   });
        //   break;

        case 'Date of Birth & Age':
          // console.log('Good'.replaceAll())
          const userDOB1 = new Date(
            user[key]
              .replaceAll('th', '')
              .replaceAll('st', '')
              .replaceAll('nd', '')
              .replaceAll('rd', '')
          ); // Convert user's DOB to Date
          console.log(user[key]);
          console.log(values);

          return (values as []).some((filter: string) => {
            if (filter.includes(' - ')) {
              // Handle date range
              const [start, end] = filter.split(' - ').map(parseDate);
              return userDOB1 >= start && userDOB1 <= end;
            } else {
              // Handle specific date
              const specificDate = parseDate(filter);
              return userDOB1.getTime() === specificDate.getTime();
            }
          });
          break;
        case 'Accessibility':
          if (!values.includes(user[key])) return false;
          break;

        case 'Other Languages':
          // console.log(user[key], key);
          if (!values.includes(user[key])) return false;
          break;

        case 'Gender':
          console.log(user[key]);
          if (!values.includes(user[key])) return false;
          break;

        case 'Ratings':
          if (!values.includes(user[key])) return false;
          break;

        case 'Status':
          if (!values.includes(user[key])) return false;
          break;

        case 'Demographics':
          if (!values.includes(user[key])) return false;
          break;

        case 'Social Security':
          if (!values.includes(user[key])) return false;
          break;
        case 'Driver License Information':
          if (!values.includes(user[key])) return false;

        // case 'Vehicle Information':
        case 'Residential Address':
          if (
            !(values as []).some((name: string) =>
              user[key].toLowerCase().includes(name.toLowerCase())
            )
          )
            return false;

          break;
        case 'Registered Business Address':
          if (!values.includes(user[key])) return false;
          break;
        case 'Military Service':
          if (!values.includes(user[key])) return false;
          break;
        case 'Deposit Details':
          if (!values.includes(user[key])) return false;
          break;

        case 'Livery Certification':
          if (!values.includes(user[key])) return false;
          break;

        case 'MV or DMV Report':
          if (!values.includes(user[key])) return false;
          break;
        // Add more cases for each filter as needed

        default:
          // Handle any unmapped filters or log them for debugging
          break;
      }
    }

    return true; // All filters passed
  });
};

// Utility function to check date range
const isDateWithinRange = (date: Date, days: number): boolean => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - days);
  return date >= pastDate;
};
