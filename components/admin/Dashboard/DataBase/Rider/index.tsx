import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/admin/Dashboard/LucideUI/tabs';
import { BookingHistory } from '@/components/admin/Dashboard/DataBase/Driver/booking/BookingHistory';
import { Financials } from '@/components/admin/Dashboard/DataBase/Driver/financials/Financials';
import { Settings } from '@/components/admin/Dashboard/DataBase/Driver/settings/Settings';
import { cn } from '@/utils';
import { RiderProfile } from './RiderProfile';
import { Bookings } from './Bookings';
import { RidePreferences } from './RidePreferences';
import { AuthorizedRides } from './AuthorizedRides';
import { Accessibility } from './Accessibility';

const SingleRider = ({ riderType }: { riderType: 'organization' | 'rider' | 'both' }) => {
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
              riderType === 'organization' ? 'grid-cols-9' : 'grid-cols-7'
            )}
          >
            <TabsTrigger
              value="account"
              className="text-sm text-[#8A8A8A] data-[state=active]:border-b-2 pb-5 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Bookings
            </TabsTrigger>

            <TabsTrigger
              value="ride-preferences"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Ride Preferences
            </TabsTrigger>
            <TabsTrigger
              value="authorized-riders"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Authorized Rides
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Financials
            </TabsTrigger>
            {
              <TabsTrigger
                value="accessibility"
                className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
              >
                Accessibility
              </TabsTrigger>
            }
            <TabsTrigger
              value="settings"
              className="text-sm text-[#8A8A8A] pb-5 data-[state=active]:border-b-2 data-[state=active]:border-b-primary border-b-2 border-[#EBEBEB] rounded-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <RiderProfile />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Bookings />
          </TabsContent>

          <TabsContent value="ride-preferences" className="space-y-6">
            <RidePreferences />
          </TabsContent>

          <TabsContent value="authorized-riders" className="space-y-6">
            <AuthorizedRides />
          </TabsContent>

          {
            <TabsContent value="accessibility" className="space-y-6">
              <Accessibility />
            </TabsContent>
          }

          <TabsContent value="booking" className="space-y-6">
            <BookingHistory />
          </TabsContent>

          {/* <TabsContent value="settings" className="space-y-6">
          </TabsContent> */}

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

export default SingleRider;
