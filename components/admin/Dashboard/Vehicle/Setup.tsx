import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Input from '../Components/Input';
import Textarea from '../Components/TextArea';
import ImageUpload from '../Components/ImageUpload';
import Toggle from '../Components/Toggle';
import Button from './Button';
import { ColorCodeSelector } from '../Components/Colors';
import { X } from 'lucide-react';
import { URLS } from '@/utils/lib/urls';
import { postRequest } from '@/utils/requests';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';
import { POST_REQUEST, PUT_REQUEST } from '@/utils/lib/server-requests';
import { Vehicle } from '..';

const Setup = ({
  setShowModal,
  selectedVehicle,
}: {
  setShowModal: (value: boolean) => void;
  selectedVehicle: Vehicle | null;
}) => {
  const { errorText, setErrorText, successText, setSuccessText } = useDB();
  const formik = useFormik({
    initialValues: {
      // vehicleName: '',
      vehicleType: '',
      vehicleTier: '',
      engineType: '',
      rank: '',
      passengerCapacity: '',
      luggageCapacity: '',
      description: '',
      mobileActiveIcon: '',
      mobileInactiveIcon: '',
      mapIcon: '',
      webIcon: '',
      onlineReservationIcon: '',
      showOnSchedule: false,
      showOnMap: false,
      showOnPassengerApp: false,
      showOnDriverApp: false,
      showOnWeb: false,
      showOnDemand: false,
      inActive: false,
      waitTimeInformation: {
        domestic: '',
        international: '',
        cruise: '',
        intercity: '',
        passengers: '',
        luggages: '',
      },
      colorCode: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      // if (
      //   Object.values(values.waitTimeInformation).some((value) => value === '') ||
      //   Object.values(values).some((value) => value === '')
      // ) {
      //   setErrorText('Please fill all the fields');
      //   setTimeout(() => {
      //     setErrorText('');
      //   }, 3000);
      //   return;
      // }

      let url = URLS.BASE_URL_ADMIN + URLS.createVehicle;

      if (selectedVehicle) {
        url = URLS.BASE_URL_ADMIN + URLS.updateVehicle + `/${selectedVehicle._id}`;
      }

      const REQUEST = selectedVehicle ? PUT_REQUEST : POST_REQUEST;

      setSubmitting(true);

      await REQUEST(
        url,
        {
          ...values,
          vehicleTiers: values.vehicleTier,
          vehicleName: 'Sedan',
          waitingTimes: {
            ...values.waitTimeInformation,
            passengerCapacity: values.passengerCapacity,
            luggageCapacity: values.luggageCapacity,
          },
        },
        Cookies.get('token') || ''
      )
        .then((result) => {
          console.log(result);
          if (result.success) {
            setSuccessText(selectedVehicle ? 'Vehicle Updated Successfully' : 'Vehicle Added Successfully');
            setTimeout(() => {
              setShowModal(false);
            }, 3000);
          } else {
            setErrorText(result.message || 'Error Adding Vehicle');
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorText('Error Creating Vehicle');
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const [hideColor, setHideColor] = React.useState(true);
  const [updateValue, setUpdateValue] = React.useState(false);

  useEffect(() => {
    if (selectedVehicle) {
      formik.setValues({
        vehicleType: selectedVehicle.vehicleType,
        vehicleTier: selectedVehicle.vehicleTiers,
        engineType: selectedVehicle.engineType,
        rank: selectedVehicle.rank,
        passengerCapacity: selectedVehicle.passengerCapacity.toFixed(0),
        luggageCapacity: selectedVehicle.luggageCapacity.toFixed(0),
        description: selectedVehicle.description,
        mobileActiveIcon: selectedVehicle.mobileActiveIcon,
        mobileInactiveIcon: selectedVehicle.mobileInactiveIcon,
        mapIcon: selectedVehicle.mapIcon,
        webIcon: selectedVehicle.webIcon,
        onlineReservationIcon: selectedVehicle.onlineReservationIcon,
        showOnSchedule: selectedVehicle.showOnSchedule,
        showOnMap: selectedVehicle.showOnMap,
        showOnPassengerApp: selectedVehicle.showOnPassengerApp,
        showOnDriverApp: selectedVehicle.showOnDriverApp,
        showOnWeb: selectedVehicle.showOnWeb,
        showOnDemand: selectedVehicle.showOnDemand,
        inActive: selectedVehicle.status,
        waitTimeInformation: {
          domestic: selectedVehicle.waitingTimes.domestic,
          international: selectedVehicle.waitingTimes.international,
          cruise: selectedVehicle.waitingTimes.cruise,
          intercity: selectedVehicle.waitingTimes.intercity,
          passengers: selectedVehicle.waitingTimes.passengerCapacity,
          luggages: selectedVehicle.waitingTimes.luggageCapacity,
        },
        colorCode: selectedVehicle.colorCode,
      });

      setUpdateValue(true);
    }
  }, [selectedVehicle]);
  return (
    <section className="  flex flex-col gap-[84px] relative">
      <button className=" absolute -top-16 -right-24" onClick={() => setShowModal(false)}>
        <X />
      </button>
      <div className=" flex justify-end">
        <Toggle
          toggleText="Active"
          active={formik.values.inActive}
          setActive={(value) => formik.setFieldValue('inActive', value)}
        />
      </div>
      <form className=" flex flex-col items-start flex-shrink flex-grow gap-16" onSubmit={formik.handleSubmit}>
        <div className=" flex items-center gap-[65px] flex-wrap w-full">
          <Input
            labelText="Vehicle Type"
            placeholder="Enter Vehicle Type"
            type="text"
            value={formik.values.vehicleType}
            onChange={formik.handleChange}
            htmlFor="vehicleType"
            important
          />

          <Input
            labelText="Vehicle Tier"
            placeholder="Enter Vehicle Tier"
            type="text"
            value={formik.values.vehicleTier}
            onChange={formik.handleChange}
            htmlFor="vehicleTier"
            important
          />

          <Input
            labelText="Engine Type"
            placeholder="Enter Engine Type"
            type="text"
            value={formik.values.engineType}
            onChange={formik.handleChange}
            htmlFor="engineType"
            important
          />

          <Input
            labelText="Rank (1-10)"
            placeholder="Enter Rank"
            type="text"
            value={formik.values.rank}
            onChange={formik.handleChange}
            htmlFor="rank"
            important
          />

          <Input
            labelText="Passenger Capacity(1-30)"
            placeholder="Enter Passenger Capacity"
            type="number"
            value={formik.values.passengerCapacity}
            onChange={formik.handleChange}
            htmlFor="passengerCapacity"
            important
          />

          <Input
            labelText="Luggage Capacity"
            placeholder="Enter Luggage Capacity"
            type="text"
            value={formik.values.luggageCapacity}
            onChange={formik.handleChange}
            htmlFor="luggageCapacity"
            important
          />
        </div>

        <div className=" flex items-end gap-5">
          <Textarea
            labelText="Description"
            placeholder="Enter Description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            htmlFor="description"
            important
            className="w-[747px]"
          />
          <ColorCodeSelector
            setColor={(value) => formik.setFieldValue('colorCode', value)}
            hideColorCode={hideColor}
            setHideColorCode={setHideColor}
          />
        </div>

        <div className=" flex flex-col gap-6 ">
          <p className=" text-sm font-medium text-[#000000]">Wait Time Information</p>
          <div className=" flex items-center gap-[65px] flex-wrap">
            <Input
              labelText="Domestic"
              placeholder="Enter Domestic"
              type="number"
              value={formik.values.waitTimeInformation.domestic}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.domestic', e.target.value)}
              htmlFor="domestic"
            />
            <Input
              labelText="International"
              placeholder="Enter International"
              type="number"
              value={formik.values.waitTimeInformation.international}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.international', e.target.value)}
              htmlFor="international"
            />
            <Input
              labelText="Cruise"
              placeholder="Enter Cruise"
              type="number"
              value={formik.values.waitTimeInformation.cruise}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.cruise', e.target.value)}
              htmlFor="cruise"
            />
            <Input
              labelText="Intercity"
              placeholder="Enter Intercity"
              type="number"
              value={formik.values.waitTimeInformation.intercity}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.intercity', e.target.value)}
              htmlFor="intercity"
            />
            <Input
              labelText="Passengers"
              placeholder="Enter Passengers"
              type="number"
              value={formik.values.waitTimeInformation.passengers}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.passengers', e.target.value)}
              htmlFor="passengers"
            />
            <Input
              labelText="Luggages"
              placeholder="Enter Luggages"
              type="number"
              value={formik.values.waitTimeInformation.luggages}
              onChange={(e) => formik.setFieldValue('waitTimeInformation.luggages', e.target.value)}
              htmlFor="luggages"
            />
          </div>
        </div>

        <div className=" flex gap-[230px]">
          <ImageUpload
            title="Active State Icon for Mobile App"
            setValue={(value) => formik.setFieldValue('mobileActiveIcon', value)}
            value={formik.values.mobileActiveIcon}
            vehicleTier={formik.values.vehicleTier}
            vehicleType={formik.values.vehicleType}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
          />

          <ImageUpload
            title="Inactive State Icon for Mobile App"
            setValue={(value) => formik.setFieldValue('mobileInactiveIcon', value)}
            value={formik.values.mobileInactiveIcon}
            vehicleTier={formik.values.vehicleTier}
            vehicleType={formik.values.vehicleType}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
          />

          <ImageUpload
            title="Icon for Map in Mobile App"
            setValue={(value) => formik.setFieldValue('mapIcon', value)}
            value={formik.values.mapIcon}
            vehicleTier={formik.values.vehicleTier}
            vehicleType={formik.values.vehicleType}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
          />
          <ImageUpload
            title="Icon for Web"
            setValue={(value) => formik.setFieldValue('webIcon', value)}
            value={formik.values.webIcon}
            vehicleTier={formik.values.vehicleTier}
            vehicleType={formik.values.vehicleType}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
          />
          <ImageUpload
            title="Icon for Online Reservation"
            setValue={(value) => formik.setFieldValue('onlineReservationIcon', value)}
            value={formik.values.onlineReservationIcon}
            vehicleTier={formik.values.vehicleTier}
            vehicleType={formik.values.vehicleType}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
          />
        </div>

        <div className=" flex flex-col gap-6 ">
          <p className=" text-sm font-medium text-[#000000]">Visibility Options</p>
          <div className=" flex items-center gap-[65px] flex-wrap">
            <Toggle
              toggleText="Show on Schedule"
              active={formik.values.showOnSchedule}
              setActive={(value) => formik.setFieldValue('showOnSchedule', value)}
            />
            <Toggle
              toggleText="Show on Map"
              active={formik.values.showOnMap}
              setActive={(value) => formik.setFieldValue('showOnMap', value)}
            />
            <Toggle
              toggleText="Show on Passenger App"
              active={formik.values.showOnPassengerApp}
              setActive={(value) => formik.setFieldValue('showOnPassengerApp', value)}
            />
            <Toggle
              toggleText="Show on Driver App"
              active={formik.values.showOnDriverApp}
              setActive={(value) => formik.setFieldValue('showOnDriverApp', value)}
            />
            <Toggle
              toggleText="Show on Web"
              active={formik.values.showOnWeb}
              setActive={(value) => formik.setFieldValue('showOnWeb', value)}
            />
            <Toggle
              toggleText="Show on On-Demand"
              active={formik.values.showOnDemand}
              setActive={(value) => formik.setFieldValue('showOnDemand', value)}
            />
          </div>
        </div>

        <div className=" flex items-center gap-20 w-[620px] mx-auto ">
          <Button
            text="Save Configuration"
            className=" bg-[#0E0E0E] text-[#FAF6F6] text-base font-medium"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting || Object.values(formik.values).some((value) => value === '')}
          />
          <Button
            text="Reset Form "
            className=" bg-[#DADADA] text-[#000000] text-base font-medium"
            onClick={() => formik.resetForm()}
          />
          <Button
            text="Delete Entry"
            className=" bg-[#B3261E] text-[#FAF6F6] text-base font-medium"
            onClick={() => console.log('Delete Entry')}
          />
        </div>
      </form>
    </section>
  );
};

export default Setup;
