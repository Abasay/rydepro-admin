import React from 'react';
import Input from '../../Components/Input';
import Toggle from '../../Components/Toggle';
import Button from '../../Vehicle/Button';
import { useFormik } from 'formik';
import Textarea from '../../Components/TextArea';
import FormulaBuilder from './Formulas_Create/FormulaBuilder';
import { useVariables } from '@/contexts/VariablesContext';
import { URLS } from '@/utils/lib/urls';
import { POST_REQUEST, PUT_REQUEST } from '@/utils/lib/server-requests';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';
import { useDashboardContext } from '@/contexts/DashboardContext';

const FormulaCreate = ({
  setShowSetup,
  selectedFormula,
}: {
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFormula: any;
}) => {
  const { formulaTokens, setFormulaTokens } = useVariables();
  const { setSuccessText, setErrorText } = useDB();
  const { getFormulas, formulaOnEdit, setFormulaOnEdit } = useDashboardContext();
  const formik = useFormik({
    initialValues: {
      name: formulaOnEdit?.formulaName || '',
      description: formulaOnEdit?.description || '',
      formula: formulaOnEdit?.mainFormula || [],
      active: false,
    },
    onSubmit: async (values) => {
      const payload = {
        formulaName: values.name,
        description: values.description,
        mainFormula: formulaTokens,
        isActive: values.active,
      };

      const url =
        formulaOnEdit && formulaOnEdit._id
          ? URLS.BASE_URL_ADMIN + URLS.updateFormula + formulaOnEdit._id
          : URLS.BASE_URL_ADMIN + URLS.createFormula;

      const REQUEST = formulaOnEdit && formulaOnEdit._id ? PUT_REQUEST : POST_REQUEST;

      await REQUEST(url, payload, Cookies.get('token') || '')
        .then((result) => {
          if (result.success) {
            setSuccessText(result.message);
            getFormulas();
            setTimeout(() => {
              setSuccessText('');
            }, 3000);
            setShowSetup(false);
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
        })
        .finally(() => {
          setFormulaTokens([]);
          setFormulaOnEdit(null);
        });
      formik.resetForm();
    },
  });

  return (
    <section className=" flex flex-col gap-[26px] items-start p-5 py-10">
      <h1 className=" text-xl font-medium text-[#0E0E0E] ml-10">Setup New Formula </h1>
      <form className=" flex flex-col gap-[26px] max-w-[650px] mx-auto " onSubmit={formik.handleSubmit}>
        <Input
          htmlFor="name"
          labelText="Formula Name"
          placeholder="Enter formula name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          important
        />

        {/* <Input
          htmlFor="formula"
          labelText="Formula"
          placeholder="Enter formula"
          type="text"
          value={formik.values.formula}
          onChange={formik.handleChange}
          important
        /> */}

        <FormulaBuilder onSave={() => console.log('')} onCancel={() => console.log('')} />

        <Textarea
          htmlFor="description"
          labelText="Formula Description"
          placeholder="Enter formula description"
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

export default FormulaCreate;
