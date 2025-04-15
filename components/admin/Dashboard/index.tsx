'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Dashboard/Sidebar/sidebar';
import Header from '@/components/admin/Dashboard/header/header';
import { useDashboardContext } from '@/contexts/DashboardContext';
import styles from '@/styles/common.module.css';
import AdditionalSecurityPopUp from '@/components/admin/Dashboard/additionalSecurityPopUp';
import PrivateKey from '@/components/admin/Dashboard/VerificationPopUps/privateKey';
import Passphrase from '@/components/admin/Dashboard/VerificationPopUps/passphrase';
import Biometrics from '@/components/admin/Dashboard/VerificationPopUps/biometrics';
import Pincode from '@/components/admin/Dashboard/VerificationPopUps/pincode';
import { CASES } from '@/components/admin/Dashboard/ENUMS/enums';
import Settings from './Settings';
import Alert from './EnableOrDisableSecurity/alert';
import DBHeader from './header/DBHeader';
import Users from './DataBase/Users';
import Drivers from './DataBase/Drivers';
import { DBProvider, useDB } from '@/contexts/DBContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import { useLogInContext } from '@/contexts/LoginContext';
import Success from './VerificationPopUps/Success';
import BookingTable from './DataBase/BookingTable';
import VehicleTable from './Vehicle/VehicleTable';
import Setup from './Vehicle/Setup';
import { Dialog, DialogContent } from '@/components/UI/dialog';
import ServiceTable from './Services/ServiceTable';
import ServiceSetup from './Services/Setup';
import { URLS } from '@/utils/lib/urls';
import SuccessModal from '../Success';
import ErrorModal from '../ErrorModal';
import { DELETE_REQUEST, GET_REQUEST, POST_REQUEST } from '@/utils/lib/server-requests';
import Zone from './Zone';
import ZoneTable from './Zone/Table';
import { SideBarProps } from './Sidebar/SideBarComponent';

import VariableSetup from './Pricing/Variables';
import VariableCreate from './Pricing/Variables/Setup';
import FormulaSetup from './Pricing/Formulas';
import FormulaCreate from './Pricing/Formulas/Setup';
import { useVariables, VariablesProvider } from '@/contexts/VariablesContext';
import FormulaPricing from './Pricing/ZonePricing/FormulaPricing';
import ZonePricing from './Pricing/ZonePricing';
import dynamic from 'next/dynamic';

const OverpassMap = dynamic(() => import('./Zone/OverpassMapWithInput'), { ssr: false });

const USERHEADERS = ['All Users', 'Individual', 'Organization'];
export const DRIVERHEADERS = ['All Drivers', 'Livery Company', 'Chauffeur Drivers', 'TNC'];

export interface Service {
  _id: string;
  serviceName: string;
  code: string;
  description: string;
  type: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WaitingTimes {
  domestic: string;
  international: string;
  cruise: string;
  intercity: string;
  passengerCapacity: string;
  luggageCapacity: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface Vehicle {
  _id: string;
  vehicleName: string;
  vehicleType: string;
  engineType: string;
  vehicleTiers: string;
  mobileActiveIcon: string;
  mobileInactiveIcon: string;
  mapIcon: string;
  webIcon: string;
  onlineReservationIcon: string;
  passengerCapacity: number;
  luggageCapacity: number;
  rank: string;
  status: boolean;
  description: string;
  colorCode: string;
  hideColor: boolean;
  showOnSchedule: boolean;
  showOnPassengerApp: boolean;
  showOnDriverApp: boolean;
  showOnWeb: boolean;
  showOnDemand: boolean;
  showOnMap: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  waitingTimes: WaitingTimes;
  location: Location;
}

const Dashboard = () => {
  const token = Cookies.get('token') || '';
  const router = useRouter();

  const { userLoginCredentials, setUserLoginCredentials } = useLogInContext();

  const {
    isSettingsClicked,
    setSettings,
    settings,
    authChanged,
    zones,
    setZones,
    setShowFormulaSetup,
    showFormulaSetup,
    formulaOnEdit,
    setFormulaOnEdit,
  } = useDashboardContext();
  const { showVariableSetup, setShowVariableSetup, setVariableOnEdit } = useVariables();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false); // Initialize to false
  const { img, info, text, value, as } = settings.alertData;
  const { activeHeader, setErrorText, setSuccessText, errorText, successText } = useDB();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [showServices, setShowServices] = useState<boolean>(false);

  const [services, setServices] = useState<Service[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [selectedVariable, setSelectedVariable] = useState<any>(null);
  const [showSetup, setShowSetup] = useState<boolean>(false);
  const [selectedFormula, setSelectedFormula] = useState<any>(null);

  const getServices = async () => {
    const url = URLS.BASE_URL_ADMIN + URLS.getServices;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setServices(result.data.services);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVehicles = async () => {
    const url = URLS.BASE_URL_ADMIN + URLS.getVehicles;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setVehicles(result.data.vehicles);
        } else {
          setVehicles([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateVehicle = async (id: string, data: any) => {};

  const deleteVehicle = async (id: string) => {
    const url = URLS.BASE_URL_ADMIN + URLS.deleteVehicle + `/${id}`;
    await DELETE_REQUEST(url, token)
      .then((result) => {
        if (result.success) {
          setSuccessText('Vehicle Deleted Successfully');
          getVehicles();
          setTimeout(() => {
            setSuccessText('');
          }, 3000);
        } else {
          setErrorText(result.message);
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateService = async (id: string, data: any) => {
    const url = URLS.BASE_URL_ADMIN + URLS.updateService + `/${id}`;
    await POST_REQUEST(url, data, token)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteService = async (id: string) => {
    const url = URLS.BASE_URL_ADMIN + URLS.deleteService + `/${id}`;
    await DELETE_REQUEST(url, token)
      .then((result) => {
        if (result.success) {
          setSuccessText('Service Deleted Successfully');
          getServices();
          setTimeout(() => {
            setSuccessText('');
          }, 3000);
        } else {
          setErrorText(result.message);
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServices();
    getVehicles();
  }, []);

  useEffect(() => {
    getVehicles();
  }, [showModal]);

  useEffect(() => {
    getServices();
  }, [showServices]);

  const ConditionalRenering = () => {
    const { PRIVATE_KEY, PASSPHRASE, BIOMETRICS, PIN } = CASES;
    switch (settings.selectedSecurityVerification) {
      case PRIVATE_KEY:
        return <PrivateKey />;
      case PASSPHRASE:
        return <Passphrase />;
      case BIOMETRICS:
        return <Biometrics />;
      case PIN:
        return <Pincode />;
      default:
        break;
    }
  };

  const sideBarRendering = (activeHeader: string) => {
    switch (activeHeader) {
      case 'All Users':
        return <Users />;
      case 'Individual':
        return <Users />;
      case 'Organization':
        return <Users />;
      case 'All Drivers':
        return <Drivers />;
      case 'Livery Company':
        return <Drivers />;
      case 'Chauffeur Drivers':
        return <Drivers />;
      case 'TNC':
        return <Drivers />;
      case 'Booking Table - Admin':
        return <BookingTable />;
      case 'Vehicle':
        return (
          <VehicleTable
            vehicles={vehicles}
            setShowModal={setShowModal}
            setSelectVehicle={setSelectedVehicle}
            deleteVehicle={deleteVehicle}
          />
        );
      case 'Services':
        return (
          <ServiceTable
            services={services}
            setShowSetup={setShowServices}
            setSelectService={setSelectedService}
            deleteService={deleteService}
          />
        );
      case 'Zone':
        return <Zone />;
      case 'Zone List':
        return <ZoneTable zones={[]} />;
      default:
        break;
    }
  };

  const SidebarComponentRenderer = (activeHeader: string) => {
    switch (activeHeader) {
      case 'Zone Setup':
        // return <Zone />;
        return <OverpassMap />;
      case 'Zone List':
        return <ZoneTable zones={zones} />;
      case 'Vehicle Setup':
        return (
          <VehicleTable
            vehicles={vehicles}
            setShowModal={setShowModal}
            setSelectVehicle={setSelectedVehicle}
            deleteVehicle={deleteVehicle}
          />
        );
      case 'Services Setup':
        return (
          <ServiceTable
            services={services}
            setShowSetup={setShowServices}
            setSelectService={setSelectedService}
            deleteService={deleteService}
          />
        );
      case 'Bookings List':
        return <BookingTable />;
      case 'All Users':
        return <Users />;
      case 'Individual':
        return <Users />;
      case 'Organization':
        return <Users />;
      case 'All Drivers':
        return <Drivers />;
      case 'Livery Company':
        return <Drivers />;
      case 'Chauffeur Drivers':
        return <Drivers />;
      case 'TNC':
        return <Drivers />;

      case 'Variable Setup':
        return <VariableSetup setShowSetup={setShowVariableSetup} />;

      case 'Formula Setup':
        return <FormulaSetup setShowSetup={setShowFormulaSetup} />;

      case 'Zone Pricing':
        return (
          <VariablesProvider>
            <ZonePricing />;
          </VariablesProvider>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    // Check window width on client-side only
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
    };

    // Run the width check immediately on mount
    checkWidth();

    // Add event listeners for resize and orientation change
    window.addEventListener('resize', checkWidth);
    window.addEventListener('orientationchange', checkWidth);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('orientationchange', checkWidth);
    };
  }, []);

  if (isLaptop) {
    return (
      <React.Fragment>
        {/* {authChanged && (
          <>
            <div className=' opacity-40 w-full h-full absolute z-50 top-0'></div>
            <Success authChanged={authChanged} />
          </>
        )} */}

        <div className=" absolute -top-10 z-50 w-full mx-auto grid place-content-center">
          {successText && <SuccessModal text={successText} handleClose={() => setSuccessText('')} />}
          {errorText && <ErrorModal text={errorText} handleClose={() => setErrorText('')} />}
        </div>

        <section
          className={`w-full ${
            settings.additionalSecurity.isPopUpOpened || settings.isAlertEnabled || authChanged
              ? 'brightness-75'
              : 'brightness-100'
          } bg-[#F7F7F7]  min-h-screen flex relative  filter transition duration-500 `}
        >
          {showModal && (
            <div className=" absolute border left-[5%] right-[5%] top-[20%] bottom-[10%] border-[#FFFFFF] rounded-3xl z-50 bg-[#FFFFFF] grid place-content-center min-w-[2902px] max-w-[2902px] mx-auto h-[1486px]">
              <Setup setShowModal={setShowModal} selectedVehicle={selectedVehicle} />
            </div>
          )}
          {showModal && (
            <div className=" min-w-full max-3000:min-w-[3000px] max-3000:min-h-[1580px] min-h-full grid place-content-center  h-[100vh] bg-[#00000099] absolute z-40"></div>
          )}{' '}
          <div className="w-full flex gap-0 min-h-screen  border">
            <Sidebar />
            <div className="w-full overflow-scroll scrollbar-hide flex flex-col h-full bg-[#FFFFFF]">
              {/* <Header /> */}
              <DBHeader />
              {/**Settings */}
              {isSettingsClicked && <Settings />}

              {!isSettingsClicked && SidebarComponentRenderer(activeHeader)}

              {/* {USERHEADERS.includes(activeHeader) && <Users />}
              {DRIVERHEADERS.includes(activeHeader) && <Drivers />} */}
              {/* {activeHeader === 'Booking Table - Admin' && <BookingTable />}
              {activeHeader === 'Vehicle' && (
                <VehicleTable
                  vehicles={vehicles}
                  setShowModal={setShowModal}
                  setSelectVehicle={setSelectedVehicle}
                  deleteVehicle={deleteVehicle}
                />
              )}
              {activeHeader === 'Services' && (
                <ServiceTable
                  services={services}
                  setShowSetup={setShowServices}
                  setSelectService={setSelectedService}
                  deleteService={deleteService}
                />
              )} */}
              {/* 
              {activeHeader === 'Zone' && <Zone />}
              {activeHeader === 'Zone List' && <ZoneTable zones={[]} />} */}
              {/* {activeHeader === 'Vehicle' && <Setup />} */}
            </div>
          </div>
        </section>
        {/**pop up */}
        {settings.additionalSecurity.isPopUpOpened && (
          <div className="w-full justify-center absolute top-[134px] h-full items-center flex">
            {' '}
            {settings.selectedSecurityVerification !== '' ? (
              ConditionalRenering()
            ) : (
              <AdditionalSecurityPopUp />
              // <Success authChanged='Password' />
            )}
          </div>
        )}
        {settings.isAlertEnabled && (
          <div className="w-full justify-center absolute top-[134px] items-center flex">
            {settings.isAlertEnabled && (
              <Alert isEnabled={settings.isAlertEnabled} heading={text} text={info} onClick={setSettings} />
            )}
          </div>
        )}
        {authChanged && (
          <div className="w-full justify-center absolute top-[134px] h-full items-center flex">
            <Success authChanged={authChanged} />
          </div>
        )}
        {settings.isSignOutEnabled && (
          <div className={`w-full justify-center absolute top-[134px] items-center flex ${styles['slide-from-top']}`}>
            <Alert isEnabled={settings.isSignOutEnabled} heading={text} text={info} onClick={setSettings} />
          </div>
        )}

        {/* <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
          <DialogContent>
            <Setup />
          </DialogContent>
        </Dialog> */}

        <Dialog
          open={showServices}
          onOpenChange={() => {
            setSelectedService(null);
            setShowServices(false);
          }}
        >
          <DialogContent className="w-[782px] max-w-[782px] p-4 bg-[#F5F5F5]">
            <ServiceSetup setShowSetup={setShowServices} selectedService={selectedService} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={showVariableSetup}
          onOpenChange={() => {
            setSelectedVariable(null);
            setShowVariableSetup(false);
            setVariableOnEdit({
              category: '',
              feeType: '',
              description: '',
              active: false,
              _id: '',
            });
          }}
        >
          <DialogContent className="w-[782px] max-w-[782px] p-4 bg-[#F5F5F5]">
            <VariableCreate setShowSetup={setShowVariableSetup} selectedVariable={selectedVariable} />
          </DialogContent>
        </Dialog>

        {/* <VariablesProvider> */}
        <Dialog
          open={showFormulaSetup}
          onOpenChange={() => {
            setSelectedFormula(null);
            setShowFormulaSetup(false);
            setFormulaOnEdit({
              formulaName: '',
              description: '',
              mainFormula: [],
              isActive: false,
              _id: '',
              __v: 0,
            });
          }}
        >
          <DialogContent className="w-[782px] max-w-[782px] p-4 bg-[#F5F5F5]">
            <FormulaCreate setShowSetup={setShowFormulaSetup} selectedFormula={formulaOnEdit} />
          </DialogContent>
        </Dialog>
        {/* </VariablesProvider> */}
      </React.Fragment>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-center text-gray-700 px-4">
      <p>
        This platform is not optimized for use on mobile phones and Tablets. Please switch to a laptop or desktop. Thank
        you!
      </p>
    </div>
  );
};

const DashboardWrapper = () => {
  return (
    <DBProvider>
      <VariablesProvider>
        <Dashboard />
      </VariablesProvider>
    </DBProvider>
  );
};

export default DashboardWrapper;
