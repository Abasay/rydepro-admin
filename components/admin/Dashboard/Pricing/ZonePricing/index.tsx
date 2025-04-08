import React from 'react';
import FormulaPricing from './FormulaPricing';
import ExtraConfig from './PricingMainConfig';

const ZonePricing = () => {
  return (
    <div className=" flex flex-col gap-5">
      <h2 className=" w-full rounded-[10px] p-2.5  text-2xl bg-[#0E0E0E] text-[#FFFFFF] mb-5">Zone pricing</h2>
      <section className=" flex  gap-6 ml-5">
        <ExtraConfig />
        <FormulaPricing />
      </section>
    </div>
  );
};

export default ZonePricing;
