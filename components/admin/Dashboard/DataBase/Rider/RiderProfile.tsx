import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';
import { Home, Briefcase, CreditCard, AlertTriangle, Phone, User } from 'lucide-react';

export const RiderProfile = () => {
  return (
    <div className="space-y-6">
      {/* Operator Information Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Operators Last Login</th>
                  <th className="text-left py-2 px-4 font-medium">Last Seen</th>
                  <th className="text-left py-2 px-4 font-medium">Membership Type</th>
                  <th className="text-left py-2 px-4 font-medium">Update Date</th>
                  <th className="text-left py-2 px-4 font-medium">Operator ID</th>
                  <th className="text-left py-2 px-4 font-medium">Years to Date</th>
                  <th className="text-left py-2 px-4 font-medium">Current Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 text-muted-foreground">18: 07:04, 21:14</td>
                  <td className="py-2 px-4 text-muted-foreground">18: 07:04, 21:14</td>
                  <td className="py-2 px-4 text-muted-foreground">Individual</td>
                  <td className="py-2 px-4 text-muted-foreground">04/14/2024</td>
                  <td className="py-2 px-4 text-muted-foreground">LA824Y525(PC/PCI/TNC)</td>
                  <td className="py-2 px-4 text-muted-foreground">6 months</td>
                  <td className="py-2 px-4 text-muted-foreground">Online</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">First Name</span>
                <span className="font-medium">John</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Last Name</span>
                <span className="font-medium">Doe</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Middle Initial</span>
                <span className="font-medium">A</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Display Name</span>
                <span className="font-medium">James Doe</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium">Male</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-medium">09/09/1999</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Other Language Spoken</span>
                <span className="font-medium">French, Detutsch</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residency */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Residency</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Home</span>
              </div>
              <span className="font-medium">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Work</span>
              </div>
              <span className="font-medium text-muted-foreground">Empty</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Billing Address</span>
              </div>
              <span className="font-medium">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Emergency Address</span>
              </div>
              <span className="font-medium">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Primary Phone number</span>
              </div>
              <span className="font-medium">+1 (555) 234 - 3456</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Secondary Phone Number</span>
              </div>
              <span className="font-medium text-muted-foreground">Empty</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Emergency Phone Number</span>
              </div>
              <span className="font-medium">+1 (555) 234 - 9343</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real ID Verification */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Real ID Verification</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">User Photo</h4>
              <Avatar className="w-32 h-32">
                <AvatarImage src="/lovable-uploads/db099662-b3ca-4a42-9f79-ec5b45079110.png" />
                <AvatarFallback>
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verification Status</span>
                  <span className="text-green-600 font-medium">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verification Date</span>
                  <span className="font-medium">02nd Feb, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document Type</span>
                  <span className="font-medium">Driver&apos;s License</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-2">Document Image</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Front Image</span>
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                      <Button variant="secondary" size="sm">
                        View Image
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Back Image</span>
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                      <Button variant="secondary" size="sm">
                        View Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline">Download Data</Button>
        <Button variant="outline">Suspend User</Button>
        <Button variant="outline">Ban User</Button>
      </div>
    </div>
  );
};
