import { useState } from 'react';
import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/admin/Dashboard/LucideUI/dialog';

interface BusinessData {
  liveryBusinessInfo: {
    companyName: string;
    taxId: string;
    dateOfIncorporation: string;
    stateOfIncorporation: string;
    irsEinLetter: string;
    certificateOfGoodStanding: string;
  };
  businessAddress: {
    street: string;
    city: string;
    state: string;
    residencyDocument1: string;
    residencyDocument2: string;
  };
  liveryCertificate: {
    liveryNumber: string;
    expirationDate: string;
    certificatePhoto: string;
  };
  commercialSubcarrier: {
    liveryNumber: string;
    expirationDate: string;
    certificatePhoto: string;
  };
}

const mockBusinessData: BusinessData = {
  liveryBusinessInfo: {
    companyName: 'Able Delivery Company',
    taxId: 'JH47YD8383J8474',
    dateOfIncorporation: 'Jan 05, 2025',
    stateOfIncorporation: 'Miami',
    irsEinLetter: '/placeholder.svg',
    certificateOfGoodStanding: '/placeholder.svg',
  },
  businessAddress: {
    street: 'Amsterdam St',
    city: 'Miami',
    state: 'Florida',
    residencyDocument1: '/placeholder.svg',
    residencyDocument2: '/placeholder.svg',
  },
  liveryCertificate: {
    liveryNumber: '8575-7839-3774',
    expirationDate: 'Dec 25, 2025',
    certificatePhoto: '/placeholder.svg',
  },
  commercialSubcarrier: {
    liveryNumber: '8575-7839-3774',
    expirationDate: 'Dec 25, 2025',
    certificatePhoto: '/placeholder.svg',
  },
};

export const BusinessInfo = () => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const handleImageView = (imageSrc: string, title: string) => {
    setSelectedImage({ src: imageSrc, title });
    setImageModalOpen(true);
  };

  return (
    <>
      <Card className="border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6 space-y-8">
          {/* Livery Business Info Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Livery Business Info</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Company Name</span>
                <span className="">{mockBusinessData.liveryBusinessInfo.companyName}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Tax ID (EIN)</span>
                <span className="">{mockBusinessData.liveryBusinessInfo.taxId}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Date of Incorporation</span>
                <span className="">{mockBusinessData.liveryBusinessInfo.dateOfIncorporation}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">State of Incorporation</span>
                <span className="">{mockBusinessData.liveryBusinessInfo.stateOfIncorporation}</span>
              </div>
            </div>

            {/* Document Images */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h5 className="">IRS EIN Letter</h5>
                <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                      onClick={() =>
                        handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')
                      }
                    >
                      View Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="">Certificate of Good Standing (COGS)</h5>
                <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                      onClick={() =>
                        handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')
                      }
                    >
                      View Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Address Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Business Address</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Street</span>
                <span className="">{mockBusinessData.businessAddress.street}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">City</span>
                <span className="">{mockBusinessData.businessAddress.city}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">State</span>
                <span className="">{mockBusinessData.businessAddress.state}</span>
              </div>
            </div>

            {/* Residency Documents */}
            <div className="space-y-3">
              <h5 className="">Residency Document</h5>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                      onClick={() =>
                        handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')
                      }
                    >
                      View Image
                    </Button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                      onClick={() =>
                        handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')
                      }
                    >
                      View Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Livery Certificate and Compliance Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Livery Certificate and Compliance</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Livery Number</span>
                <span className="">{mockBusinessData.liveryCertificate.liveryNumber}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Expiration Date</span>
                <span className="">{mockBusinessData.liveryCertificate.expirationDate}</span>
              </div>
            </div>

            {/* Certificate Photo */}
            <div className="space-y-3">
              <h5 className="">Certificate Photo</h5>
              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px] max-w-full">
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                    onClick={() => handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')}
                  >
                    View Image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Subcarrier Acknowledgment Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Commercial Subcarrier Acknowledgment</h3>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Livery Number</span>
                <span className="">{mockBusinessData.commercialSubcarrier.liveryNumber}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0000004D]">
                <span className="font-medium ">Expiration Date</span>
                <span className="">{mockBusinessData.commercialSubcarrier.expirationDate}</span>
              </div>
            </div>

            {/* Certificate Photo */}
            <div className="space-y-3">
              <h5 className="">Certificate Photo</h5>
              <div className="border-2 border-dashed border-[#00000040] rounded-[12px] p-6 flex flex-col items-center justify-center min-h-[200px] max-w-full">
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-[#8A8A8A] text-white hover:bg-[#7A7A7A]"
                    onClick={() => handleImageView(mockBusinessData.liveryBusinessInfo.irsEinLetter, 'IRS EIN Letter')}
                  >
                    View Image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button variant="outline" className="border border-[#00000040] text-black hover:bg-gray-50">
              Download Data
            </Button>
            <Button variant="outline" className="border border-[#00000040] text-black hover:bg-gray-50">
              Suspend User
            </Button>
            <Button variant="outline" className="border border-[#00000040] text-black hover:bg-gray-50">
              Ban User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <img src={selectedImage?.src} alt={selectedImage?.title} className="max-w-full max-h-96 object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
