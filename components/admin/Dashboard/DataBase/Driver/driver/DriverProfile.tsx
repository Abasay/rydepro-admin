import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/Dashboard/LucideUI/select';
import { Home, AlertTriangle } from 'lucide-react';
import driverAvatar from '/driver-avatar.jpg';

export const DriverProfile = () => {
  return (
    <div className="space-y-6">
      {/* Driver Status Table */}
      <div className="bg-card border border-[#D0D0D0] border-dashed rounded-lg overflow-hidden px-4">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-border text-sm font-medium text-primary">
          <div>Operators Last Login</div>
          <div>Last Seen</div>
          <div>Membership Type</div>
          <div>Update Date</div>
          <div>Operator ID</div>
          <div>Years to Date</div>
          <div>Current Status</div>
        </div>
        <div className="grid grid-cols-7 gap-4 p-4 text-sm text-[#8A8A8A]">
          <div>18 - 07-04, 21:14</div>
          <div>18 - 07-04, 21:14</div>
          <div>Chauffeur</div>
          <div>04/14/2024</div>
          <div>LA824YS25(FC/FC/TNC)</div>
          <div>6 months</div>
          <div className="text-green-600">Online</div>
        </div>
      </div>

      {/* Chauffeur Setup Badge */}
      <div className="bg-black text-white p-5 rounded-[40px] inline-flex items-center justify-between w-full">
        <span className="text-lg font-medium">Chauffeur Setup</span>
        <span className="text-sm font-light">Chauffeur</span>
      </div>

      {/* Personal Information */}
      <Card className=" border border-[#00000080] rounded-[20px] p">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
          <div className="flex gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <Avatar
                className="w-[250px] max-w-[250px] h-[255px] rounded-[20px] bg-white drop-shadow-md shadow-md"
                style={{
                  boxShadow: '0px 4px 10px 0px #00000040',
                }}
              >
                <AvatarImage src={'/driver-avatar.jpg'} alt="John Doe - Professional Driver" />
                <AvatarFallback className="text-2xl bg-muted">JD</AvatarFallback>
              </Avatar>
            </div>

            {/* Personal Details */}
            <div className="flex-1 grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">First Name</span>
                  <span className="">John</span>
                </div>
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">Last Name</span>
                  <span className="">Doe</span>
                </div>
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">Middle Initial</span>
                  <span className="">A</span>
                </div>
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">Display Name</span>
                  <span className="">James Doe</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">Gender</span>
                  <span className="">Male</span>
                </div>
                <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                  <span className="text-primary font-medium">Date of Birth</span>
                  <span className="">09/09/1999</span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-primary font-medium">Other Language Spoken</span>
                  <span className="">French, Deutsch</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residency Information */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Residency</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 border-b border-[#0000004D]">
              <span className=" w-7 h-7 grid place-content-center rounded-full bg-[#F5F5F5]">
                <Home className="w-5 h-5 text-primary" />
              </span>
              <div className="flex-1">
                <span className="text-primary font-medium">Home</span>
              </div>
              <span className="">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
            </div>
            <div className="flex items-center gap-3 px-4">
              <span className=" w-7 h-7 grid place-content-center rounded-full bg-[#F5F5F5]">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </span>

              <div className="flex-1">
                <span className="text-primary font-medium">Emergency Address</span>
              </div>
              <span className="">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Location */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Operating Location</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Country</span>
              <span className="">USA</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">State</span>
              <span className="">Los Angeles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary font-medium">City/County</span>
              <span className="">Compton</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Time */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Operational Time</h3>
            <Select defaultValue="daily">
              <SelectTrigger className="w-48 bg-black text-white rounded-[40px] px-5 py-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily - May 22, 2025</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium ">Idle Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Navigation Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Passenger Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Down Time</span>
                <span className="">08:30:45</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Wait Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Booking Prep Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">90 Mins Prep Time</span>
                <span className="">08:30:45</span>
              </div>
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Airport Time</span>
                <span className="">08:30:45</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4 mt-6">
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Download Data
        </Button>
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Suspend User
        </Button>
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Ban User
        </Button>
      </div>
    </div>
  );
};
