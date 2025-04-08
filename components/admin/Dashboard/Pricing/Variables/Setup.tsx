import React from 'react';
import Input from '../../Components/Input';
import Toggle from '../../Components/Toggle';
import Button from '../../Vehicle/Button';
import { useFormik } from 'formik';
import Textarea from '../../Components/TextArea';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { URLS } from '@/utils/lib/urls';
import { POST_REQUEST } from '@/utils/lib/server-requests';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';

const VariableCreate = ({
  setShowSetup,
  selectedVariable,
}: {
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVariable: any;
}) => {
  const { activeVariable, getVariables } = useDashboardContext();
  const { setSuccessText, setErrorText } = useDB();
  const formik = useFormik({
    initialValues: {
      category: '',
      feeType: '',
      description: '',
      active: false,
    },
    onSubmit: async (values) => {
      const payload = {
        category: values.category,
        variableName: activeVariable,
        feeType: values.feeType,
        description: values.description,
        active: values.active,
      };
      const url = URLS.BASE_URL_ADMIN + URLS.createVariables;

      await POST_REQUEST(url, payload, Cookies.get('token') || '')
        .then((result) => {
          if (result.success) {
            setSuccessText(result.message);
            setTimeout(() => {
              setSuccessText('');
            }, 3000);
            setShowSetup(false);
            getVariables();
          } else {
            setErrorText(result?.message || result?.msg);
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          }
        })
        .catch((err) => {
          setErrorText(err?.msg || err?.message);
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        });
    },
  });
  return (
    <section className=" flex flex-col gap-[26px] items-start p-5 py-10">
      <h1 className=" text-xl font-medium text-[#0E0E0E] ml-10">Add Variable </h1>
      <form className=" flex flex-col gap-[26px] max-w-[650px] mx-auto " onSubmit={formik.handleSubmit}>
        <Input
          htmlFor="category"
          labelText="Category"
          placeholder="Enter category"
          type="text"
          value={formik.values.category}
          onChange={formik.handleChange}
          important
        />

        <Input
          htmlFor="feeType"
          labelText="Fee Type"
          placeholder="Enter fee type"
          type="text"
          value={formik.values.feeType}
          onChange={formik.handleChange}
          important
        />
        <Textarea
          htmlFor="description"
          labelText="Variable Description"
          placeholder="Enter variable description"
          value={formik.values.description}
          onChange={formik.handleChange}
          type="text"
          important
        />

        <Toggle
          toggleText="Active"
          active={formik.values.active}
          setActive={(value) => formik.setFieldValue('active', value)}
        />

        <div className=" flex items-center gap-20  justify-center w-[620px] mx-auto ">
          <Button
            text="Save Configuration"
            className=" bg-[#0E0E0E] text-[#FAF6F6] text-base font-medium"
            onClick={formik.handleSubmit}
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

export default VariableCreate;
