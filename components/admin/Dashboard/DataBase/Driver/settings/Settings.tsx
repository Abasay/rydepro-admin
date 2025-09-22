import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Badge } from '@/components/admin/Dashboard/LucideUI/badge';

export const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Account Security */}
      <Card className=" border border-[#00000080] rounded-[20px] p-5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-medium">
            Account Security
            <Button size="icon" className="h-8 w-8 rounded-full bg-primary">
              <span className="text-xs text-primary-foreground">?</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
            <span className="font-medium">Biometric Setup</span>
            <span>No</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
            <span className="font-medium">Pin</span>
            <span>No</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
            <span className="font-medium">Passphrase</span>
            <span>No</span>
          </div>

          <div className="pt-4">
            <h4 className="font-semibold mb-4">Password Management</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 ">
                <span>Google Account</span>
                <span className="">johndoe@gmail.com</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
                <span>Account Password</span>
                <span className="">••••••••</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
                <span>Account Recovery Code</span>
                <span>No</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-semibold mb-4">Device Management</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[#00000080] pb-4">
                <span>Active Device 1</span>
                <div className="text-right text-sm ">
                  <div>Samsung SM-G990U</div>
                  <div>Jun 12, 2024 Los Angeles, CA</div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="font-semibold mb-4">Privacy Control</h4>

          <div className="text-center py-12">
            <span className="text-lg font-semibold">Privacy Control Disabled</span>
          </div>
          <h4 className="font-semibold mb-4">Notification</h4>

          <div className="space-y-4 ">
            <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
              <span>Commision Level</span>
              <span className="">50%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
              <span className="font-medium">Ride Notification</span>
              <span>Disabled</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#00000080]">
              <span className="font-medium">Financials Notification</span>
              <span>Disabled</span>
            </div>
            <div className="flex items-center justify-between py-3 ">
              <span className="font-medium">Shared Account</span>
              <span>Disabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
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
