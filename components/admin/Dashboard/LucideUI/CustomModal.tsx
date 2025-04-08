import { Button } from '@/components//admin/Dashboard/LucideUI/button';
import React, { JSX } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/admin/Dashboard/LucideUI/popover';

interface CustomModalProps {
  labelText: string;
  modalCard: React.ReactNode;
  ModalIcon?: JSX.Element;
}

const CustomModal: React.FC<CustomModalProps> = ({ labelText, modalCard, ModalIcon }) => {
  return (
    <Popover>
      <PopoverTrigger className="w-full overflow-hidden border-b border-[#DADADA] min-w-[177px]">
        <div className={`w-full text-start flex justify-between items-center `}>
          <Button
            variant="ghost"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
            className={`text-base p-0 flex items-center text-[#0E0E0E] justify-between hover:bg-transparent font-normal
               `}
          >
            <span>{labelText}</span>
          </Button>
          {ModalIcon && ModalIcon}
          {/* <div className={`  bg-[#EBEBEB] w-full h-[1px] mt-1 `}></div> */}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full  border-0 bg-white">
        {modalCard}
      </PopoverContent>
    </Popover>
  );
};

export default CustomModal;
