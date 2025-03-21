import mobileIcon from '@/components/admin/Dashboard/LoggedInDevices/svgs/mobile.svg';
import laptopIcon from '@/components/admin/Dashboard/LoggedInDevices/svgs/laptop.svg';

export const LoggedInDevicesDummyData: {
  img: any;
  model: string;
  deviceType: string;
  time: string;
  date: string;
  platform: string;
  coordinates: { lat: number; lng: number };
  city: string;
  country: string;
}[] = [
  {
    img: mobileIcon,
    model: 'Samsung S20 Ultra',
    deviceType: 'Mobile Phone',
    time: '10:20am',
    date: 'October 1st, 2024',
    platform: 'Google Chrome',
    coordinates: { lat: -12.28676, lng: 64.32226 },
    city: 'Lagos',
    country: 'Nigeria',
  },
  {
    img: laptopIcon,
    model: 'HP Envy Laptop',
    deviceType: 'Windows Laptop',
    time: '10:20am',
    date: 'October 1st, 2024',
    platform: 'Google Chrome',
    coordinates: { lat: -12.28676, lng: 64.32226 },
    city: 'Lagos',
    country: 'Nigeria',
  },
];
