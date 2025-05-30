import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { useFormik } from 'formik';
import Input from '@/components/admin/Dashboard/Zone/Input';
import { ChevronDown } from 'lucide-react';
import CustomModal from '@/components/admin/Dashboard/LucideUI/CustomModal';
import { Select } from '@/components/UI/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/admin/Dashboard/LucideUI/select';
import CustomDatePicker from '@/components/admin/Dashboard/LucideUI/CustomDate';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { useVariables } from '@/contexts/VariablesContext';
import { POST_REQUEST } from '@/utils/lib/server-requests';
import { URLS } from '@/utils/lib/urls';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ExtraConfig = () => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [openVehicle, setOpenVehicle] = useState(false);
  const [openService, setOpenService] = useState(false);

  const { vehicles, zones, services, activeFormula, getServices, getVariables, getVehicles, getZones, activeVariable } =
    useDashboardContext();
  const { setSuccessText, setErrorText } = useDB();
  const { feeSections } = useVariables();

  const formik = useFormik({
    initialValues: {
      zoneFrom: '',
      zoneTo: '',
      vehicleCategory: { vehicleType: '', vehicleTier: '' },
      serviceName: '',
      startHour: '07:00AM',
      endHour: '07:00AM',
      startDate: '',
      endDate: '',
      weekDays: [],
      minHours: '',
      maxHours: '',
      mileRestrictions: '',
      timeRestrictions: '',
      minFare: '',
      maxFare: '',
      variable: '',
      waitTime: {
        minimum: '',
        maximum: '',
      },
      peakHours: {
        startHour: '07:00AM',
        endHour: '07:00AM',
        startDate: '',
        endDate: '',
        dateSpecific: '',
        variable: '',
        weekDays: [],
      },
      surge: {
        startHour: '07:00AM',
        endHour: '07:00AM',
        startDate: '',
        endDate: '',
        dateSpecific: '',
        variable: '',
        weekDays: [],
      },
      distanceUnit: 'miles',
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        pricingFee: feeSections,
        formulaName: activeFormula,
        activeVariable: activeVariable,
      };

      const url = URLS.BASE_URL_ADMIN + URLS.setPricing;

      await POST_REQUEST(url, payload, Cookies.get('token') || '')
        .then((result) => {
          if (result.success) {
            setSuccessText(result?.message || 'Pricing set successfully');
            setTimeout(() => {
              setSuccessText('');
            }, 3000);
          } else {
            setErrorText(result?.message || result.msg);
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          }
        })
        .catch((err) => {
          setErrorText(err?.message || 'Something went wrong');
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        });
      console.log(values);
    },
  });

  useEffect(() => {
    getVehicles();
    getServices();
    getZones();
  }, []);
  return (
    <>
      <div className=" flex flex-col gap-5">
        <div className="flex flex-wrap gap-4">
          <Wrapper>
            <div className="">
              <h3 className=" text-sm font-medium mb-4 text-[#000000] ">Zone</h3>
              <div className="flex gap-4 items-center">
                <div className="min-w-[250px]">
                  <Select onValueChange={(value) => formik.setFieldValue('zoneFrom', value)}>
                    <SelectTrigger className="w-full border-b border-[#DADADA]">
                      <SelectValue placeholder="Select Zone From" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {zones.map((zone) => (
                        <SelectItem key={zone.zoneName} value={zone.zoneName}>
                          {zone.zoneName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-[250px]">
                  <Select onValueChange={(value) => formik.setFieldValue('zoneTo', value)}>
                    <SelectTrigger className="w-full border-b border-[#DADADA]">
                      <SelectValue placeholder="Select Zone To" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {zones.map((zone) => (
                        <SelectItem key={zone.zoneName} value={zone.zoneName}>
                          {zone.zoneName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Wrapper>

          <Wrapper>
            <div className="">
              <h3 className="text-sm  mb-4  font-medium text-[#000000]">Vehicle Category</h3>
              <Select
                onValueChange={(value) => {
                  const vehicle = vehicles.find(
                    (vehicle) => vehicle.vehicleTiers + ' ' + vehicle.vehicleType === value
                  );
                  formik.setFieldValue('vehicleCategory', {
                    vehicleType: vehicle?.vehicleType,
                    vehicleTier: vehicle?.vehicleTiers,
                  });
                }}
              >
                <SelectTrigger className="w-full border-b border-[#DADADA] min-w-[250px]">
                  <SelectValue placeholder="Select Vehicle" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.vehicleTiers} value={vehicle.vehicleTiers + ' ' + vehicle.vehicleType}>
                      {vehicle.vehicleTiers + ' ' + vehicle.vehicleType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="">
              <HeaderText text="Service Type" className="mb-4" />
              <Select onValueChange={(value) => formik.setFieldValue('serviceName', value)}>
                <SelectTrigger className="w-full border-b border-[#DADADA] min-w-[250px]">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {services.map((service) => (
                    <SelectItem key={service.serviceName} value={service.serviceName}>
                      {service.serviceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex gap-2 mt-4"></div>
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  formik.values.distanceUnit === 'miles' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => formik.setFieldValue('distanceUnit', 'miles')}
              >
                Miles
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  formik.values.distanceUnit === 'km' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => formik.setFieldValue('distanceUnit', 'km')}
              >
                KM
              </button>
            </div>
          </Wrapper>

          <Wrapper>
            <div className=" flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="Start Hour" />
              <CustomModal
                labelText={formik.values.startHour}
                modalCard={
                  <Select onValueChange={(value) => formik.setFieldValue('startHour', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="07:00AM" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="End Hour" />
              <CustomModal
                labelText={formik.values.endHour}
                modalCard={
                  <Select onValueChange={(value) => formik.setFieldValue('endHour', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="07:00AM" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
          </Wrapper>

          <Wrapper>
            <div className="flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="Start Date" />
              <div>
                <CustomModal
                  labelText={formik.values.startDate ? new Date(formik.values.startDate).toDateString() : 'mm/dd/yyyy'}
                  modalCard={
                    <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('startDate', value)} />
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="End Date" />
              <div>
                <CustomModal
                  labelText={formik.values.endDate ? new Date(formik.values.endDate).toDateString() : 'mm/dd/yyyy'}
                  modalCard={<CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('endDate', value)} />}
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className=" flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="Week Days" />

              <div>
                <CustomModal
                  labelText={formik.values.weekDays.join(', ')}
                  modalCard={
                    <Select
                      onValueChange={(value: string) => {
                        const currentWeekDays = formik.values.weekDays as string[];
                        const updatedWeekDays = currentWeekDays.includes(value)
                          ? currentWeekDays.filter((day: string) => day !== value)
                          : [...currentWeekDays, value];
                        formik.setFieldValue('weekDays', updatedWeekDays);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Week Days" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {WEEKDAYS.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                />
              </div>
            </div>
          </Wrapper>
          {/* Hourly */}
          <Wrapper>
            <div className=" flex flex-col gap-2.5">
              <HeaderText text="Hourly" />
              <div className=" flex gap-2.5">
                <Input
                  type="number"
                  placeholder="Enter Min Hours"
                  value={formik.values.minHours}
                  onChange={(e) => formik.setFieldValue('minHours', e.target.value)}
                  labelText="Min Hours"
                  // important={true}
                  name={'minHours'}
                />
                <Input
                  type="number"
                  placeholder="Enter Max Hours"
                  value={formik.values.maxHours}
                  onChange={(e) => formik.setFieldValue('maxHours', e.target.value)}
                  labelText="Max Hours"
                  name="maxHours"
                />
              </div>
            </div>
          </Wrapper>

          {/* Restrictions */}
          <Wrapper>
            {' '}
            <Input
              type="number"
              placeholder="Enter Mile Restrictions"
              value={formik.values.mileRestrictions}
              onChange={(e) => formik.setFieldValue('mileRestrictions', e.target.value)}
              labelText="Mile Restrictions"
              name="mileRestrictions"
            />
            <Input
              type="number"
              placeholder="Enter Time Restrictions"
              value={formik.values.timeRestrictions}
              onChange={(e) => formik.setFieldValue('timeRestrictions', e.target.value)}
              labelText="Time Restrictions"
              name="timeRestrictions"
            />
          </Wrapper>

          {/* Max Fare and Variables */}
          <Wrapper>
            {' '}
            <Input
              type="number"
              placeholder="Enter Max Fare"
              value={formik.values.maxFare}
              onChange={(e) => formik.setFieldValue('maxFare', e.target.value)}
              labelText="Max Fare"
              name="maxFare"
            />{' '}
            <Input
              type="number"
              placeholder="Enter Variable"
              value={formik.values.variable}
              onChange={(e) => formik.setFieldValue('variable', e.target.value)}
              labelText="Variable"
              name="variable"
            />
          </Wrapper>

          {/* PEAK HOURS */}
        </div>{' '}
        <h2 className=" w-full rounded-[10px] p-2.5  text-2xl bg-[#0E0E0E] text-[#FFFFFF] mb-5">Peak Hours</h2>
        <div className="flex flex-wrap gap-4">
          <Wrapper>
            <div className=" flex flex-col gap-2.5  pb-1 ">
              <HeaderText text="Start Hour" />
              <CustomModal
                labelText={formik.values.peakHours.startHour}
                modalCard={
                  <Select onValueChange={(value) => formik.setFieldValue('peakHours.startHour', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="07:00AM" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col gap-2.5  ">
              <HeaderText text="End Hour" />
              <CustomModal
                labelText={formik.values.peakHours.endHour}
                modalCard={
                  <Select onValueChange={(value) => formik.setFieldValue('peakHours.endHour', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="07:00AM" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
          </Wrapper>

          <Wrapper>
            <div className="flex flex-col gap-2.5  ">
              <HeaderText text="Start Date" />
              <CustomModal
                labelText={
                  formik.values.peakHours.startDate
                    ? new Date(formik.values.peakHours.startDate).toDateString()
                    : 'mm/dd/yyyy'
                }
                modalCard={
                  <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('peakHours.startDate', value)} />
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col gap-2.5  ">
              <HeaderText text="End Date" />
              <CustomModal
                labelText={
                  formik.values.peakHours.endDate
                    ? new Date(formik.values.peakHours.endDate).toDateString()
                    : 'mm/dd/yyyy'
                }
                modalCard={
                  <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('peakHours.endDate', value)} />
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col gap-2.5  ">
              <HeaderText text="Week Days" />
              <CustomModal
                labelText={formik.values.peakHours.weekDays.join(', ')}
                modalCard={
                  <Select
                    onValueChange={(value: string) => {
                      const currentWeekDays = formik.values.peakHours.weekDays as string[];
                      const updatedWeekDays = currentWeekDays.includes(value)
                        ? currentWeekDays.filter((day: string) => day !== value)
                        : [...currentWeekDays, value];
                      formik.setFieldValue('peakHours.weekDays', updatedWeekDays);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Week Days" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {WEEKDAYS.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              />
            </div>
          </Wrapper>

          <Wrapper>
            <div className="flex flex-col gap-2.5  ">
              <HeaderText text="Date Specific" />
              <CustomModal
                labelText={
                  formik.values.peakHours.dateSpecific
                    ? new Date(formik.values.peakHours.dateSpecific).toDateString()
                    : 'mm/dd/yyyy'
                }
                modalCard={
                  <CustomDatePicker
                    handleDateSelect={(value) => formik.setFieldValue('peakHours.dateSpecific', value)}
                  />
                }
                ModalIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                      fill="#212121"
                    />
                  </svg>
                }
              />
            </div>{' '}
            <Input
              type="number"
              placeholder="Enter Variable"
              value={formik.values.peakHours.variable}
              onChange={(e) => formik.setFieldValue('peakHours.variable', e.target.value)}
              labelText="Variable"
              name="peakHoursVariable"
            />
          </Wrapper>
        </div>
        <h2 className=" w-full rounded-[10px] p-2.5  text-2xl bg-[#0E0E0E] text-[#FFFFFF] mb-5">Wait Time</h2>
        <div className="flex flex-wrap gap-4 ">
          <Wrapper>
            {' '}
            <Input
              type="number"
              placeholder="Enter Minimum Wait Time"
              value={formik.values.waitTime.minimum}
              onChange={(e) => formik.setFieldValue('waitTime.minimum', e.target.value)}
              labelText="Minimum Wait Time"
              name="minimumWaitTime"
            />{' '}
            <Input
              type="number"
              placeholder="Enter Maximum Wait Time"
              value={formik.values.waitTime.maximum}
              onChange={(e) => formik.setFieldValue('waitTime.maximum', e.target.value)}
              labelText="Maximum Wait Time"
              name="maximumWaitTime"
            />
          </Wrapper>
        </div>
        <h2 className=" w-full rounded-[10px] p-2.5  text-2xl bg-[#0E0E0E] text-[#FFFFFF] mb-5">Surge</h2>
        <div className="flex flex-wrap gap-4 ">
          <>
            <Wrapper>
              <div className="flex flex-col gap-2.5 ">
                <HeaderText text="Start Hour" />
                <CustomModal
                  labelText={formik.values.surge.startHour}
                  modalCard={
                    <Select onValueChange={(value) => formik.setFieldValue('surge.startHour', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="07:00AM" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {HOURS.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 ">
                <HeaderText text="End Hour" />
                <CustomModal
                  labelText={formik.values.surge.endHour}
                  modalCard={
                    <Select onValueChange={(value) => formik.setFieldValue('surge.endHour', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="07:00AM" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {HOURS.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM9.5 5C9.74546 5 9.94961 5.17688 9.99194 5.41012L10 5.5V10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7455 12.8231 10.9496 12.5899 10.9919L12.5 11H9.5C9.25454 11 9.05039 10.8231 9.00806 10.5899L9 10.5V5.5C9 5.22386 9.22386 5 9.5 5Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
            </Wrapper>

            <Wrapper>
              <div className="flex flex-col gap-2.5 ">
                <HeaderText text="Start Date" />
                <CustomModal
                  labelText={
                    formik.values.surge.startDate
                      ? new Date(formik.values.surge.startDate).toDateString()
                      : 'mm/dd/yyyy'
                  }
                  modalCard={
                    <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('surge.startDate', value)} />
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 ">
                <HeaderText text="End Date" />
                <CustomModal
                  labelText={
                    formik.values.surge.endDate ? new Date(formik.values.surge.endDate).toDateString() : 'mm/dd/yyyy'
                  }
                  modalCard={
                    <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('surge.endDate', value)} />
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13.5523 11 14 10.5523 14 10C14 9.44771 13.5523 9 13 9C12.4477 9 12 9.44771 12 10C12 10.5523 12.4477 11 13 11ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 ">
                <HeaderText text="Week Days" />
                <CustomModal
                  labelText={formik.values.surge.weekDays.join(', ')}
                  modalCard={
                    <Select
                      onValueChange={(value: string) => {
                        const currentWeekDays = formik.values.surge.weekDays as string[];
                        const updatedWeekDays = currentWeekDays.includes(value)
                          ? currentWeekDays.filter((day: string) => day !== value)
                          : [...currentWeekDays, value];
                        formik.setFieldValue('surge.weekDays', updatedWeekDays);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Week Days" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {WEEKDAYS.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                />
              </div>
            </Wrapper>

            <Wrapper>
              <div className="flex flex-col gap-2.5  pb-1 border-b border-[#DADADA]]">
                <HeaderText text="Date Specific" />
                <CustomModal
                  labelText={
                    formik.values.surge.dateSpecific
                      ? new Date(formik.values.surge.dateSpecific).toDateString()
                      : 'mm/dd/yyyy'
                  }
                  modalCard={
                    <CustomDatePicker handleDateSelect={(value) => formik.setFieldValue('surge.dateSpecific', value)} />
                  }
                  ModalIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44771 7.55228 9 7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44771 9 10C9 10.5523 9.44771 11 10 11ZM11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13C9 12.4477 9.44771 12 10 12C10.5523 12 11 12.4477 11 13ZM13 11C13 11.5523 13.5523 12 14 12C14 12.4477 13.5523 12 13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14ZM17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V5.5ZM4 7H16V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V7ZM5.5 4H14.5C15.3284 4 16 4.67157 16 5.5V6H4V5.5C4 4.67157 4.67157 4 5.5 4Z"
                        fill="#212121"
                      />
                    </svg>
                  }
                />
              </div>{' '}
              <Input
                type="number"
                placeholder="Enter Variable"
                value={formik.values.surge.variable}
                onChange={(e) => formik.setFieldValue('surge.variable', e.target.value)}
                labelText="Variable"
                name="surgeVariable"
              />
            </Wrapper>
          </>
        </div>
        <div className=" flex w-full justify-center">
          <button
            onClick={() => formik.handleSubmit()}
            // disabled={
            //   formik.isSubmitting ||
            //   Object.values(formik.values).some(
            //     (value) =>
            //       value === '' ||
            //       (Array.isArray(value) && value.length === 0) ||
            //       (typeof value === 'object' &&
            //         value !== null &&
            //         Object.values(value).some((innerValue) => innerValue === ''))
            //   )
            // }
            className=" bg-[#0E0E0E] text-[#FFFFFF] py-2 px-4 w-[400px] border rounded-lg disabled:bg-[#D0D0D0]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ExtraConfig;

const HeaderText = ({ text, className }: { text: string; className?: string }) => {
  return <h3 className={`text-sm font-medium text-[#000000] ${className}`}>{text}</h3>;
};
