import guardIcon from '@/components/admin/Dashboard/svgs/guard.svg';
import logIcon from '@/components/admin/Dashboard/svgs/loggedIn.svg';
import verfiedGuard from '@/components/admin/Dashboard/svgs/verifiedGuard.svg';
import questionGuard from '@/components/admin/Dashboard/svgs/questionGuard.svg';
import lockGuard from '@/components/admin/Dashboard/svgs/lockGuard.svg';
import keyIcon from '@/components/admin/Dashboard/svgs/key.svg';
import pncodeIcon from '@/components/admin/Dashboard/svgs/pincode.svg';
import passphraseIcon from '@/components/admin/Dashboard/svgs/passphrase.svg';

export const settingsOptions: { text: string; img: any }[] = [
  {
    text: 'Additional Security Settings',
    img: guardIcon,
  },
  {
    text: 'View Your Logged In Devices',
    img: logIcon,
  },
  {
    text: 'Others',
    img: guardIcon,
  },
  {
    text: 'Others',
    img: guardIcon,
  },
  {
    text: 'Others',
    img: guardIcon,
  },
];

export const additionalSecurityOptions: { text: string; img: any }[] = [
  {
    text: 'Change Security Settings',
    img: questionGuard,
  },
  {
    text: 'Enable/Disable Security Settings',
    img: verfiedGuard,
  },
];

export const popUpOptions: { text: string; img: any }[] = [
  {
    text: 'Private Key',
    img: keyIcon,
  },
  {
    text: 'Pincode',
    img: pncodeIcon,
  },
  {
    text: 'Pass Phrase',
    img: passphraseIcon,
  },
  {
    text: 'Biometrics',
    img: lockGuard,
  },
];

export const changeSecurityOptions: { text: string; img: any }[] = [
  {
    text: 'Change Private Key',
    img: keyIcon,
  },
  {
    text: 'Change Password',
    img: pncodeIcon,
  },
  {
    text: 'Change Pincode',
    img: pncodeIcon,
  },
  {
    text: 'Change Passphrase',
    img: passphraseIcon,
  },
];
