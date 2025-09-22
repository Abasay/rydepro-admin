import { useState } from 'react';
import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { CardHeader, CardTitle } from '@/components/admin/Dashboard/LucideUI/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/admin/Dashboard/LucideUI/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/admin/Dashboard/LucideUI/tabs';
import { Badge } from '@/components/admin/Dashboard/LucideUI/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/Dashboard/LucideUI/select';
import { CheckCircle, Star, ThumbsUp } from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  serviceType: string;
  departureDate: string;
  departureTime: string;
  vehicle: string;
  price: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

interface DriverInfo {
  id: string;
  name: string;
  photo: string;
  driverId: string;
  vehicleMake: string;
  licenseNumber: string;
  vehiclePlateNumber: string;
  vehicleImages: {
    front: string;
    back: string;
    leftSide: string;
    rightSide: string;
  };
}

interface FeedbackData {
  rideStatus: 'Upcoming' | 'Completed' | 'Cancelled';
  timeLeft?: string;
  refundDate?: string;
  dateTime?: string;
  rating?: number;
  feedbackText?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingId: 'IND0001',
    serviceType: 'One Way',
    departureDate: '25th Sep, 2025',
    departureTime: '05:30 AM',
    vehicle: 'Premier Electric Sedan',
    price: '$300',
    status: 'Upcoming',
  },
  {
    id: '2',
    bookingId: 'IND0002',
    serviceType: 'Hourly Trip',
    departureDate: '20th Sep, 2025',
    departureTime: '09:30 AM',
    vehicle: 'Luxury SUV',
    price: '$275',
    status: 'Completed',
  },
  {
    id: '3',
    bookingId: 'IND0003',
    serviceType: 'Round Trip',
    departureDate: '02th Sep, 2025',
    departureTime: '07:15 AM',
    vehicle: 'Luxury SUV',
    price: '$500',
    status: 'Completed',
  },
];

const mockDriverInfo: DriverInfo = {
  id: '1',
  name: 'John Doe',
  photo: '/driver-avatar.jpg',
  driverId: 'ABCD1234',
  vehicleMake: 'Toyota Corolla',
  licenseNumber: '1234567890',
  vehiclePlateNumber: '345ADC76',
  vehicleImages: {
    front: '/placeholder.svg',
    back: '/placeholder.svg',
    leftSide: '/placeholder.svg',
    rightSide: '/placeholder.svg',
  },
};

// Mock feedback data based on booking status
const getFeedbackData = (bookingStatus: 'Upcoming' | 'Completed' | 'Cancelled'): FeedbackData => {
  switch (bookingStatus) {
    case 'Upcoming':
      return {
        rideStatus: 'Upcoming',
        timeLeft: '30:09:59',
      };
    case 'Cancelled':
      return {
        rideStatus: 'Cancelled',
        refundDate: '05 Aug, 2025',
      };
    case 'Completed':
      return {
        rideStatus: 'Completed',
        dateTime: '05 Aug, 2025; 2:00 PM',
        rating: 5,
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      };
    default:
      return {
        rideStatus: 'Upcoming',
        timeLeft: '30:09:59',
      };
  }
};

export const BookingHistory = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleImageView = (imageSrc: string, title: string) => {
    setSelectedImage({ src: imageSrc, title });
    setImageModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-[#FFF7E5] text-[#D4A539]';
      case 'Completed':
        return 'bg-[#059B141A] text-[#059B14]';
      case 'Cancelled':
        return 'bg-[#FFEBEB] text-[#E11D48]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Booking History</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 bg-black text-white rounded-[40px] px-5 py-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b font-medium  bg-[#F8F8F8]">
                  <th className="text-left py-3 px-4 font-semibold">S/N</th>
                  <th className="text-left py-3 px-4 font-semibold">Booking ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Service Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Departure Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Departure Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Vehicle(s)</th>
                  {/* <th className="text-left py-3 px-4 font-semibold">Service Fee</th> */}
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <td className="py-4 px-4 font-medium">{index + 1}</td>
                    <td className="py-4 px-4 font-medium">{booking.bookingId}</td>
                    <td className="py-4 px-4 font-medium">{booking.serviceType}</td>
                    <td className="py-4 px-4 font-medium">{booking.departureDate}</td>
                    <td className="py-4 px-4 font-medium">{booking.departureTime}</td>
                    <td className="py-4 px-4 font-medium">{booking.vehicle}</td>
                    {/* <td className="py-4 px-4 font-medium">{booking.price}</td> */}
                    <td className="py-4 px-4 font-medium">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirmation ID: {selectedBooking?.bookingId}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="booking-info" className="w-full">
            <TabsList className="grid w-full grid-cols-6 h-full p-2 max-h-[56px]">
              <TabsTrigger
                value="booking-info"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Booking Information
              </TabsTrigger>
              <TabsTrigger
                value="vehicle-details"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Vehicle Details
              </TabsTrigger>
              <TabsTrigger
                value="extra-options"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Extra Options
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Payment
              </TabsTrigger>
              <TabsTrigger
                value="driver-info"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Driver Information
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
              >
                Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="booking-info" className="space-y-6 border border-[#00000080] rounded-[20px] p-5">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    <span className="font-medium">Service Type</span>
                    <span>One Way Trip</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Departure Point</span>
                    <span>JW Marriot Hotel</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Dropoff Point</span>
                    <span>LAX Terminal 1</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Stop 1</span>
                    <span>Costco Tires</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Stop 2</span>
                    <span>Starbucks Cafe</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Departure Date</span>
                    <span>25 March, 2025</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Departure Time</span>
                    <span>07:00 AM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Distance/Expected Ride Time</span>
                    <span>25 Miles/ 45 Mins</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Passengers</span>
                    <span>2 [Adult 25 - 35 Years]</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Luggage</span>
                    <span>1 [Heavy]</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#0000004D]">
                    {' '}
                    <span className="font-medium">Accessibility</span>
                    <span>Wheelchair</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="flex justify-between py-3 border-b border-[#0000004D]">
                  {' '}
                  <span className="font-medium">Additional Vehicle</span>
                  <span>None</span>
                </div>

                <div className="flex justify-between py-3 border-b border-[#0000004D]">
                  {' '}
                  <span className="font-medium">Multi Destination</span>
                  <span>No</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehicle-details" className="space-y-6 border border-[#00000080] rounded-[20px] p-5">
              <div className=" flex gap-6 justify-center items-center ">
                <div className=" h-full grid place-content-center w-full max-w-[345px] border">
                  <h3 className="text-xl font-semibold mb-6">Standard Sedan</h3>
                  <div className="flex justify-center mb-6">
                    <img src="/placeholder.svg" alt="Standard Sedan" className="w-64 h-32 object-contain" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 w-full mx-auto">
                  <div className="space-y-2">
                    <div className="flex justify-between py-3 border-b border-[#0000004D]">
                      {' '}
                      <span>Estimated Fee</span>
                      <span className="font-semibold">07:00 AM</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#0000004D]">
                      {' '}
                      <span>Max Passengers</span>
                      <span className="font-semibold">25 Miles/ 45 Mins</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-left">Official Wait Time</h4>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>For cruise</span>
                        <span>60 Mins</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>For Airport International</span>
                        <span>60 Mins</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>For Airport Domestic</span>
                        <span>60 Mins</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>For Intercity</span>
                        <span>5 Mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="extra-options" className="space-y-6 border border-[#00000080] rounded-[20px] p-5">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Vehicle 1</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        {' '}
                        <span>Need Child Seat</span>
                        <span>1 Child Seat, 2 Booster</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 border-b border-[#0000004D] py-3">Flight Details</h3>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Flight Type</span>
                        <span>Commercial</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Flight Date</span>
                        <span>16th Aug, 2025</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Pickup Time</span>
                        <span>10:00AM</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Flight Number</span>
                        <span>ABCDE12345</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Airline</span>
                        <span>JFK Airline</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Airport Preferences</span>
                        <span>Pickup (Curbside)</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        <span>Additional Information</span>
                        <span>Government</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-[#0000004D]">
                        {' '}
                        <span>Refreshments</span>
                        <span>2 Sparkling Water [Mineral]</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-[#0000004D] py-3">
                          Preferred Driver
                        </h3>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>AM</AvatarFallback>
                              </Avatar>
                              <span>Ajala Michael</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Driver ID: 12345678</span>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold pb-3 border-b border-[#0000004D]">Book For a user</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-3 border-b border-[#0000004D]">
                            <span>Email Address</span>
                            <span>johndoe@gmail.com</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-[#0000004D]">
                            <span>Phone Number</span>
                            <span>+1 (234) 567 - 8901</span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span>Preferred Contact Option</span>
                            <span>Email</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fare Details</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3 pb-6">
                      <h4 className="font-semibold pb-3 border-b border-[#0000004D]">RYDEPRO Fees</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Base Rate</span>
                          <span>$50.00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Cost Per Mile (28.5)</span>
                          <span>$42.75</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Peak Time Fee</span>
                          <span>$15.00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Wait Time Fee</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Driver Gratuity</span>
                          <span>$50.00</span>
                        </div>
                      </div>
                      <div className="mt-6 space-y-3 py-5">
                        <h4 className="font-semibold pb-3 border-b border-[#0000004D]">Discounts & Promotions</h4>
                        <div className="flex justify-between text-green-600">
                          <span>Corporate Discount (CORP20)</span>
                          <span>-$30.00</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Loyalty Points Applied</span>
                          <span>-$10.00</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span>Subtotal</span>
                          <span>$170.00</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span className="font-semibold">Total Discounts</span>
                          <span className="font-semibold">-$40.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold pb-3 border-b border-[#0000004D]">Airport Fees</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Airport Pickup Fees</span>
                          <span>$5.00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Airport Meet and Greet Service</span>
                          <span>$25.00</span>
                        </div>
                      </div>
                      <h4 className="font-semibold mt-4">Platform Fees</h4>
                      <div className="space-y-2 pb-8 ">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Service Fees</span>
                          <span>$10.00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Booking fee</span>
                          <span>$5.00</span>
                        </div>
                      </div>
                      <h4 className="font-semibold mt-8 pb-4 border-b border-[#0000004D]">Government & Insurance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>State Tax</span>
                          <span>$8.75</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>City Tax</span>
                          <span>$5.50</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          {' '}
                          <span>Rider Insurance Fee</span>
                          <span>$3.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white p-5 rounded-[20px] 4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Final Total</span>
                      <span className="text-2xl font-bold">$150</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-[#0000004D]">
                      <span>Card Details</span>
                      <span>•••• •••• •••• •••• **/** ••••</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Gemstone</span>
                      <span>25</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="driver-info"
              className="space-y-6 border border-[#00000080] rounded-[20px] p-5 w-full h-full max-h-[600px] overflow-auto"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Driver Information</h3>

                {/* Vehicle 1 Section */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">Vehicle 1</h4>

                  <div className="flex gap-8">
                    {/* Driver Photo Section */}
                    <div className="flex-shrink-0">
                      <h5 className="font-medium mb-4 text-center">Driver Photo</h5>
                      <div
                        className="w-[280px] h-[320px] bg-white rounded-[20px]  p-4 flex items-center justify-center"
                        style={{
                          boxShadow: '0px 4px 10px 0px #00000040',
                        }}
                      >
                        <Avatar className="w-[250px] h-[280px] rounded-[16px]">
                          <AvatarImage src={mockDriverInfo.photo} alt="Driver Photo" className="object-cover" />
                          <AvatarFallback className="text-2xl bg-muted rounded-[16px]">
                            {mockDriverInfo.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Driver Details Section */}
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Driver ID</span>
                          <span>{mockDriverInfo.driverId}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Vehicle Make</span>
                          <span>{mockDriverInfo.vehicleMake}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Driver&apos;s License Number</span>
                          <span>{mockDriverInfo.licenseNumber}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Vehicle Plate Number</span>
                          <span>{mockDriverInfo.vehiclePlateNumber}</span>
                        </div>

                        {/* Vehicle Images Section */}
                        <div className="space-y-6">
                          <h5 className="font-medium">Vehicle Images</h5>

                          {/* Front and Back Images */}
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <h6 className="">Front Image</h6>
                              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                                    onClick={() => handleImageView(mockDriverInfo.vehicleImages.back, 'Back Image')}
                                  >
                                    View Image
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h6 className="">Back Image</h6>
                              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                                    onClick={() => handleImageView(mockDriverInfo.vehicleImages.back, 'Back Image')}
                                  >
                                    View Image
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Left and Right Side Images */}
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <h6 className="">Left Side Image</h6>
                              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                                    onClick={() => handleImageView(mockDriverInfo.vehicleImages.back, 'Back Image')}
                                  >
                                    View Image
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h6 className="">Right Side Image</h6>
                              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                                    onClick={() => handleImageView(mockDriverInfo.vehicleImages.back, 'Back Image')}
                                  >
                                    View Image
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6 border border-[#00000080] rounded-[20px] p-5">
              {(() => {
                const feedbackData = getFeedbackData(selectedBooking?.status || 'Upcoming');

                return (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-6">Feedback</h3>

                    {/* Upcoming Status */}
                    {feedbackData.rideStatus === 'Upcoming' && (
                      <div className="text-center py-12">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold">Ride Upcoming</h4>
                          <p className="text-muted-foreground">
                            Time Left: <span className="font-medium">{feedbackData.timeLeft}</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Cancelled Status */}
                    {feedbackData.rideStatus === 'Cancelled' && (
                      <div className="space-y-6">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Ride Status</span>
                          <span className="text-red-500 font-medium">Cancelled</span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="font-medium">Refund Date</span>
                          <span>{feedbackData.refundDate}</span>
                        </div>
                      </div>
                    )}

                    {/* Completed Status */}
                    {feedbackData.rideStatus === 'Completed' && (
                      <div className="space-y-6">
                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Ride Status</span>
                          <span className="text-green-500 font-medium">Completed</span>
                        </div>

                        <div className="flex justify-between py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Date & Time</span>
                          <span>{feedbackData.dateTime}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-[#0000004D]">
                          <span className="font-medium">Ratings</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= (feedbackData.rating || 0)
                                      ? 'fill-green-500 text-green-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="font-medium">Feedback</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feedbackData.feedbackText}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {selectedImage && (
              <div className="max-w-full max-h-[70vh] overflow-hidden rounded-lg">
                <Avatar className="w-full h-full max-w-[600px] max-h-[400px]">
                  <AvatarImage
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="object-contain w-full h-full"
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <div className="w-32 h-20 bg-gray-600 rounded mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Image not available</p>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
