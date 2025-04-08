import React from 'react';
import FeeConfigPanel from './ConfigPanel';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { cn } from '@/utils';

const FormulaPricing = () => {
  const { formulas, activeFormula, setActiveFormula } = useDashboardContext();
  return (
    <section className=" flex flex-col gap-6">
      <div className=" flex justify-end">
        <button className="  border border-[#D0D0D0] p-2.5  rounded-lg">Add New Formula</button>
      </div>
      <div className=" flex flex-col gap-6">
        <h1 className=" bg-[#0E0E0E] border rounded-[10px] w-[538px] p-2.5 text-white">Formulas Set</h1>
        <div className=" flex gap-6 items-center">
          {formulas.map((item, idx) => (
            <button
              key={idx}
              className={cn(
                'border border-[#D0D0D0] p-2.5  rounded-lg',
                activeFormula === item.formulaName && 'bg-[#444444] text-white'
              )}
              onClick={() => setActiveFormula(item.formulaName)}
            >
              {item.formulaName}
            </button>
          ))}
        </div>

        <div className="">
          <FeeConfigPanel />
        </div>
      </div>
    </section>
  );
};

export default FormulaPricing;
