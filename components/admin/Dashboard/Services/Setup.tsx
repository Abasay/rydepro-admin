import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Input from '../Components/Input';
import Textarea from '../Components/TextArea';
import Toggle from '../Components/Toggle';
import Button from '../Vehicle/Button';
import { URLS } from '@/utils/lib/urls';
import { postRequest } from '@/utils/requests';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';
import { POST_REQUEST, PUT_REQUEST } from '@/utils/lib/server-requests';

const ServiceSetup = ({
  setShowSetup,
  selectedService,
}: {
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedService: any;
}) => {
  const { setSuccessText, setErrorText } = useDB();
  const formik = useFormik({
    initialValues: {
      serviceName: '',
      serviceDescription: '',
      serviceCode: '',
      serviceType: '',
      active: false,
    },
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {};
      let url = URLS.BASE_URL_ADMIN + URLS.createService;

      if (selectedService) {
        url = URLS.BASE_URL_ADMIN + URLS.updateService + `/${selectedService._id}`;
      }

      const REQUEST = selectedService ? PUT_REQUEST : POST_REQUEST;

      const { active, serviceDescription, ...rest } = values;
      let msg;
      setSubmitting(true);

      await REQUEST(
        url,
        { ...rest, isActive: values.active, description: values.serviceDescription },
        Cookies.get('token') || ''
      )
        .then((result) => {
          if (result.success) {
            msg = selectedService ? 'Service Updated Successfully' : 'Service Added Successfully';
            setSuccessText(msg);
            setShowSetup(false);

            setTimeout(() => {
              setSuccessText('');
            }, 3000);
          } else {
            setErrorText(result.message || 'Error Adding Service');
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorText('Error Adding Service');
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (selectedService) {
      console.log(selectedService);
      formik.setValues({
        serviceName: selectedService.serviceName,
        serviceDescription: selectedService.description,
        serviceCode: selectedService.code,
        serviceType: selectedService.type,
        active: selectedService.status,
      });
    }
  }, [selectedService]);
  return (
    <section className=" flex flex-col gap-[26px] items-start p-5 py-10">
      <h1 className=" text-xl font-medium text-[#0E0E0E] ml-10">Add Service </h1>
      <form className=" flex flex-col gap-[26px] max-w-[650px] mx-auto " onSubmit={formik.handleSubmit}>
        <Input
          htmlFor="serviceName"
          labelText="Service Name"
          placeholder="Enter service name"
          type="text"
          value={formik.values.serviceName}
          onChange={formik.handleChange}
          important
        />

        <Input
          htmlFor="serviceCode"
          labelText="Service Code"
          placeholder="Enter service code"
          type="text"
          value={formik.values.serviceCode}
          onChange={formik.handleChange}
          important
        />
        <Textarea
          htmlFor="serviceDescription"
          labelText="Service Description"
          placeholder="Enter service description"
          value={formik.values.serviceDescription}
          onChange={formik.handleChange}
          type="text"
          important
        />
        <Input
          htmlFor="serviceType"
          labelText="Service Type"
          placeholder="Enter service type"
          type="text"
          value={formik.values.serviceType}
          onChange={formik.handleChange}
          important
        />

        <Toggle
          toggleText="Active"
          active={formik.values.active}
          setActive={(value) => formik.setFieldValue('active', value)}
        />

        <div className=" flex items-center gap-20  justify-center w-[620px] mx-auto ">
          <Button
            text={
              selectedService
                ? formik.isSubmitting
                  ? 'Updating Service'
                  : 'Update Service'
                : formik.isSubmitting
                ? 'Adding Service'
                : 'Add Service'
            }
            className=" bg-[#0E0E0E] text-[#FAF6F6] text-base font-medium"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting || Object.values(formik.values).some((value) => value === '')}
          />
          <Button
            text="Reset Form "
            className=" bg-[#DADADA] text-[#000000] text-base font-medium"
            onClick={formik.resetForm}
          />
          <Button
            text="Delete Entry"
            className=" bg-[#B3261E] text-[#FAF6F6] text-base font-medium"
            onClick={formik.resetForm}
          />
        </div>
      </form>
    </section>
  );
};

export default ServiceSetup;
