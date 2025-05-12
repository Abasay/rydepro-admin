import React, { JSX } from 'react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Select from 'react-select';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  // SelectListRender: React.ReactNode;
  selectList: any[];
  handleSelect?: (select: { label: string; value: string }) => void;
  selectPlaceholder: string;
  fieldValue?: string;
}

const SelectWithTypeHead: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  icon,
  className,
  // SelectListRender,
  selectList,
  handleSelect,
  selectPlaceholder,
  fieldValue,
}) => {
  console.log('selectList', selectList);
  return (
    <div className={`flex flex-col gap-2 ${className} relative`}>
      <label className="font-satoshi font-medium text-sm text-[#3C3C3C] flex gap-2 items-center">{label}</label>
      <div className="flex items-center border-b border-[#DADADA]  rounded-lg  ">
        {/* {icon && <span className="mr-2">{icon}</span>} */}
        {/* <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-full mt-0  border-none  outline-none rounded-[4px] bg-white text-[#3C3C3C]">
            <SelectValue
              placeholder={selectPlaceholder}
              className=" placeholder:text-[#8A8A8A]"
              defaultValue={fieldValue}
            />
          </SelectTrigger>
          <SelectContent className="w-full bg-white">
            <input
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              className="w-full font-satoshi text-text-primary placeholder:text-[#8A8A8A] text-base focus:outline-none pt-1  px-2"
            />
            {SelectListRender}
          </SelectContent>
        </Select> */}
        <Select
          options={selectList}
          screenReaderStatus={() => 'Select an option'}
          onChange={(e) => {
            if (handleSelect) handleSelect(e);
          }}
          placeholder={selectPlaceholder}
          className="w-full mt-[6px]  rounded-[4px]  text-[#3C3C3C]"
          styles={{
            control: (base) => ({
              ...base,
              border: 'none',
              boxShadow: 'none',
              '&:hover': {
                border: 'none',
              },
              color: '#3C3C3C',
            }),
            placeholder: (base) => ({
              ...base,
              color: '#8A8A8A',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#3C3C3C',
              '&:hover': {
                backgroundColor: '#D0D0D0',
              },
            }),
          }}
        />
      </div>
      {touched && error && <p className="absolute -bottom-5 text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectWithTypeHead;
