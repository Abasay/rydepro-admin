import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/admin/Dashboard/LucideUI/tabs';
import { DriverProfile } from '@/components/admin/Dashboard/DataBase/Driver/driver/DriverProfile';
import { VehicleManagement } from '@/components/admin/Dashboard/DataBase/Driver/vehicle/VehicleManagement';
import { BookingHistory } from '@/components/admin/Dashboard/DataBase/Driver/booking/BookingHistory';
import { OtherInformation } from '@/components/admin/Dashboard/DataBase/Driver/other/OtherInformation';
import { Financials } from '@/components/admin/Dashboard/DataBase/Driver/financials/Financials';
import { Settings } from '@/components/admin/Dashboard/DataBase/Driver/settings/Settings';
import { ChauffeurList } from '@/components/admin/Dashboard/DataBase/Driver/chauffeur/ChauffeurList';
import { BusinessInfo } from '@/components/admin/Dashboard/DataBase/Driver/business/BusinessInfo';
import { cn } from '@/utils';

const SingleDriver = ({ driverType }: { driverType: 'chauffeur' | 'tnc' | 'both' }) => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className=" p-6">
      <div className=" mx-auto">
        {/* Driver Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Driver ID: <span className="text-primary">#ABCD1234</span>
          </h1>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white">
          <TabsList
            className={cn(
              'grid w-full grid-cols-6 bg-white rounded-[12px] p-2 h-full',
              driverType === 'tnc' ? 'grid-cols-9' : 'grid-cols-7'
            )}
          >
            <TabsTrigger
              value="account"
              className="text-sm text-[#8A8A8A] data-[state=active]:border-b-2 pb-5 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="vehicles"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Vehicle(s)
            </TabsTrigger>
            {driverType === 'tnc' && (
              <TabsTrigger
                value="chauffeur"
                className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
              >
                Chauffeur
              </TabsTrigger>
            )}
            <TabsTrigger
              value="booking"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Booking History
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Other Information
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Financials
            </TabsTrigger>
            {driverType === 'tnc' && (
              <TabsTrigger
                value="business"
                className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
              >
                Business
              </TabsTrigger>
            )}
            <TabsTrigger
              value="settings"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <DriverProfile />
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            <VehicleManagement />
          </TabsContent>

          {driverType === 'tnc' && (
            <TabsContent value="chauffeur" className="space-y-6">
              <ChauffeurList />
            </TabsContent>
          )}

          {driverType === 'tnc' && (
            <TabsContent value="business" className="space-y-6">
              <BusinessInfo />
            </TabsContent>
          )}

          <TabsContent value="booking" className="space-y-6">
            <BookingHistory />
          </TabsContent>

          <TabsContent value="other" className="space-y-6">
            <OtherInformation />
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <Financials />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleDriver;
