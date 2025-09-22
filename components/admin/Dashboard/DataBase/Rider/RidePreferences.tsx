import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';

export const RidePreferences = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Ride Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Audio Preferences</span>
              <span className="font-medium">No Music</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Connection</span>
              <span className="font-medium">Bluetooth</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Silent Ride Override</span>
              <span className="font-medium">Yes</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Driver Interaction</span>
              <span className="font-medium">Phone and Chat</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Vehicle Temperature</span>
              <span className="font-medium">24C</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-4">Preferred Driver</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ajala Michael</p>
                  <p className="text-sm text-muted-foreground">Driver ID: 12345678</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ajala Michael</p>
                  <p className="text-sm text-muted-foreground">Driver ID: 12345678</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Frangrance Sensitivity</span>
              <span className="font-medium">Yes</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Emotional Support Animal</span>
              <span className="font-medium">Yes</span>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-muted-foreground block mb-2">Document Image</span>
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
              <Button variant="secondary" size="sm">
                View Image
              </Button>
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
