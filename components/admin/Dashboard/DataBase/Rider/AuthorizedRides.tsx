import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';

export const AuthorizedRides = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Authorized Rides</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Jane Doe</h4>
                  <p className="text-sm text-muted-foreground">janedoe@gmail.com</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 345-2345</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Invited on Apr 23, 2025 03:34pm</p>
                <Button size="sm">View Permissions</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Jessica Alba</h4>
                  <p className="text-sm text-muted-foreground">jessicaalba@gmail.com</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 234-8432</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Invited on May 02, 2025 08:15pm</p>
                <Button size="sm">View Permissions</Button>
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
