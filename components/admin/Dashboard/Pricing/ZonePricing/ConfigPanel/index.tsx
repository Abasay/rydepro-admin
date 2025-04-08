import { SectionData } from '@/types/DashboardTypes/fees';
import React from 'react';
import FeeSection from './FeeSection';
import { useVariables } from '@/contexts/VariablesContext';

const FeeConfigPanel: React.FC = () => {
  // Initial fee data structure
  // const [feeSections, setFeeSections] = React.useState<SectionData[]>([
  //   {
  //     id: 'rydepro',
  //     category: 'RYDEPRO Fees',
  //     backgroundColor: 'transparent',
  //     fees: [
  //       {
  //         id: 'rydepro-1',
  //         variables: [
  //           { name: 'Variable 1', value: 'USD' },
  //           { name: 'Variable 2', value: 'NGN' },
  //           { name: 'Variable 3', value: 'GPB' },
  //         ],
  //         rows: [
  //           {
  //             name: 'Cost per mile',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               // { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Cost per mile',
  //             values: [
  //               { value1: '10', value2: '00' },
  //               { value1: '00', value2: '00' },
  //               { value1: '00', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Wait Time',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               // { value1: '05', value2: '00' },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'airport',
  //     category: 'Airport Fees',
  //     backgroundColor: '#8C8A8A',
  //     fees: [
  //       {
  //         id: 'airport-1',
  //         variables: [
  //           { name: 'Variable 1', value: 'USD' },
  //           // { name: 'Variable 2', value: 'NGN' },
  //           { name: 'Variable 3', value: 'GPB' },
  //         ],
  //         rows: [
  //           {
  //             name: 'Airport Fee',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               // { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Airport',
  //             values: [
  //               { value1: '10', value2: '00' },
  //               { value1: '00', value2: '00' },
  //               { value1: '00', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Airport Drop-off',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Meet and Greet',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Driver Airport',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'service',
  //     category: 'Service Related Fees',
  //     backgroundColor: '#0E0E0E',
  //     fees: [
  //       {
  //         id: 'service-1',
  //         variables: [
  //           { name: 'Variable 1', value: 'USD' },
  //           { name: 'Variable 2', value: 'NGN' },
  //           { name: 'Variable 3', value: 'GPB' },
  //         ],
  //         rows: [
  //           {
  //             name: 'Service Fee',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'App Fee',
  //             values: [
  //               { value1: '10', value2: '00' },
  //               { value1: '00', value2: '00' },
  //               { value1: '00', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Booking Fee',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Platform Fee',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //           {
  //             name: 'Credit Card',
  //             values: [
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //               { value1: '05', value2: '00' },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const { feeSections, getFeeSections, setFeeSections } = useVariables();

  // Handler for updating fee values
  const handleValueChange = (
    sectionId: string,
    feeId: string,
    rowIndex: number,
    columnIndex: number,
    field: 'value1' | 'value2',
    value: string
  ) => {
    console.log(`Updating: section=${sectionId}, fee=${feeId}, row=${rowIndex}, col=${columnIndex}, field=${field}`);

    setFeeSections((prevSections: SectionData[]): SectionData[] => {
      const newSections = prevSections.map((section: SectionData) => {
        if (section.id === sectionId) {
          console.log(`Matched section: ${section.id}`);
          return {
            ...section,
            fees: section.fees.map((fee) => {
              if (fee.id === feeId) {
                console.log(feeId);
                console.log(`Matched fee: ${fee.id}`);
                return {
                  ...fee,
                  rows: fee.rows.map((row, rIndex) => {
                    if (rIndex === rowIndex) {
                      console.log(`Matched row: ${rIndex}`);
                      return {
                        ...row,
                        values: row.values.map((val, cIndex) => {
                          if (cIndex === columnIndex) {
                            console.log(`Matched column: ${cIndex}, updating ${field}`);
                            return { ...val, [field]: value };
                          }
                          return val;
                        }),
                      };
                    }
                    return row;
                  }),
                };
              }
              return fee;
            }),
          };
        }
        return section;
      });

      console.log('Previous state:', prevSections);
      console.log('New state:', newSections);
      return newSections;
    });
  };

  console.log(typeof setFeeSections); // Should output: "function"

  // Handler for updating variable values
  const handleVariableChange = (sectionId: string, feeId: string, variableIndex: number, value: string) => {
    setFeeSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fees: section.fees.map((fee) => {
              if (fee.id === feeId) {
                return {
                  ...fee,
                  variables: fee.variables.map((variable, vIndex) => {
                    if (vIndex === variableIndex) {
                      return { ...variable, value };
                    }
                    return variable;
                  }),
                };
              }
              return fee;
            }),
          };
        }
        return section;
      })
    );
  };

  return (
    <div className=" px-4 py-8 min-w-7xl">
      {feeSections.map((section, idx) => {
        return (
          <FeeSection
            id={idx}
            key={section.id}
            section={section}
            onValueChange={handleValueChange}
            onVariableChange={handleVariableChange}
          />
        );
      })}
    </div>
  );
};

export default FeeConfigPanel;
