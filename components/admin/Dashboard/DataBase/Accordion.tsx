// components/Accordion.tsx
import { useEffect, useState } from 'react';
import DateOfBirthForm from './DOB';
import toast from 'react-hot-toast';
import DateType1 from './DateType1';
import ISO6391 from 'iso-639-1';

export interface AccordionItem {
  title: string;
  subTitle: SubTitle[];
}

interface SubTitle {
  name: string;
  isSelect: boolean;
  hasInput: boolean;
  hasSelect: boolean;
  isDate: boolean;
  selects?: string[];
  isYesOrNo?: boolean;
  headerTitle?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  filters: any;
  setFilters: (filters: any) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  filters,
  setFilters,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [languages, setLanguages] = useState<string[]>(ISO6391.getAllNames());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const [inputValues, setInputValues] = useState<any>({});

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [toggleSelect, setToggleSelect] = useState(false);

  const handleInputs = (
    e: React.FormEvent,
    subItem: { name: string },
    item: { title: string },
    idx: number
  ) => {
    // Unique filter key for cases where subItem name is the same as item title.
    const uniqueKey = `${subItem.name}_${idx}`;

    // Check if subItem name matches item title.
    const isSameName = subItem.name === item.title;

    // Helper function to update filters.
    const updateFilters = (
      title: string,
      newFilters: string[],
      subItemKey: string
    ) => {
      setFilters((prev: any) => ({
        ...prev,
        [title]: newFilters,
        [subItemKey]: '', // Clear the subItem field after setting filter
      }));
    };

    // Handle case where subItem name and item title do not match.
    if (!isSameName) {
      if (!filters[subItem.name]) return; // Exit if subItem doesn't exist in filters

      // If title doesn't exist in filters, create it with subItem's array value.
      if (!filters[item.title]) {
        updateFilters(item.title, [filters[subItem.name] || []], subItem.name);
      } else {
        // Prevent adding duplicate filters
        if (filters[item.title].includes(filters[subItem.name])) {
          toast.error('Filter already added');
        } else {
          updateFilters(
            item.title,
            [
              filters[subItem.name],
              ...filters[item.title].filter(
                (f: string) => f !== filters[subItem.name]
              ),
            ],
            subItem.name
          );
        }
      }
      return;
    }

    // Handle case where subItem name matches item title.
    if (filters[subItem.name]) {
      if (!filters[item.title]) {
        // If item title filter doesn't exist, initialize it with subItem's value
        console.log('filer');
        updateFilters(item.title, [subItem.name], subItem.name);
      } else {
        // Check for duplicate filters based on unique key
        console.log('filter', filters);
        if (filters[item.title].includes(filters[uniqueKey][0])) {
          toast.error('Filter already added ess');
        } else {
          updateFilters(
            item.title,
            [...filters[item.title], filters[uniqueKey][0]],
            uniqueKey
          );
        }
      }
    } else {
      // Case where filters do not have subItem initially
      if (!filters[item.title]) {
        updateFilters(item.title, [...(filters[uniqueKey] || [])], uniqueKey);
      } else {
        if (filters[item.title].includes(filters[uniqueKey])) {
          toast.error('Filter already added');
        } else {
          updateFilters(
            item.title,
            [...filters[item.title], filters[uniqueKey]],
            uniqueKey
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(filters);
    console.log(Object.values(filters).flat());
  }, [filters]);

  return (
    <div className='flex flex-col justify-center gap-1'>
      {items.map((item, index) => (
        <div
          key={index}
          className='rounded-[8px] flex flex-col gap-3 bg-[#F8F8F8] p-2'
        >
          <button
            onClick={() => toggleIndex(index)}
            className='w-full flex justify-between text-sm font-medium items-center text-left text-[#0E0E0E]'
          >
            <span>{item.title}</span>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className='flex flex-col gap-4'>
              {item.subTitle.map((subItem: any, idx) => {
                return (
                  <>
                    {subItem?.headerTitle && (
                      <span className=' text-sm font-medium text-[#0E0E0E]'>
                        {subItem.headerTitle}
                      </span>
                    )}
                    {subItem.isSelect && (
                      <div
                        key={`${subItem}_idx`}
                        className=' flex flex-col gap-1'
                      >
                        <div
                          className=' flex gap-2 items-center cursor-pointer'
                          onClick={() => {
                            if (filters[item.title]?.includes(subItem.name)) {
                              setFilters((prev: any) => {
                                return {
                                  ...prev,
                                  [item.title]: filters[item.title] && [
                                    ...filters[item.title].filter(
                                      (filterItem: string) =>
                                        filterItem !== subItem.name
                                    ),
                                  ],
                                };
                              });
                            } else {
                              setFilters((prev: any) => {
                                return {
                                  ...prev,
                                  [item.title]: filters[item.title]
                                    ? [...filters[item.title], subItem.name]
                                    : (filters[item.title] = [subItem.name]),
                                };
                              });
                            }
                          }}
                        >
                          {filters[item.title]?.includes(subItem.name) ? (
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              onClick={() => {
                                setToggleSelect(false);
                              }}
                            >
                              <rect
                                width='16'
                                height='16'
                                rx='2.66667'
                                fill='#0E0E0E'
                              />
                              <path
                                d='M12.0315 4.99007C12.2209 5.19103 12.2115 5.50747 12.0106 5.69687L6.72402 10.6795C6.49984 10.8908 6.14792 10.8842 5.93171 10.6648L4.14481 8.85125C3.951 8.65455 3.95335 8.33798 4.15005 8.14417C4.34675 7.95035 4.66333 7.9527 4.85714 8.1494L6.34657 9.66106L11.3247 4.96915C11.5257 4.77975 11.8421 4.78912 12.0315 4.99007Z'
                                fill='#FCFCFC'
                              />
                            </svg>
                          ) : (
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              onClick={() => {}}
                            >
                              <rect
                                x='0.333333'
                                y='0.333333'
                                width='15.3333'
                                height='15.3333'
                                rx='2.33333'
                                stroke='#DADADA'
                                stroke-width='0.666667'
                              />
                            </svg>
                          )}
                          <span className='text-[#0E0E0E] text-sm'>
                            {subItem.name}
                          </span>
                        </div>

                        {subItem.hasInput &&
                          subItem.isSelect &&
                          filters[item.title]?.includes(subItem.name) && (
                            <form
                              action=''
                              className=' w-full gap-[5.33px] items-center p-2 justify-between flex border-[0.67px]  rounded h-9'
                              onSubmit={(e: React.FormEvent) => {
                                e.preventDefault();
                                if (filters[subItem.name])
                                  if (
                                    !filters[item.title].includes(
                                      filters[subItem.name]
                                    )
                                  )
                                    setFilters((prev: any) => {
                                      return {
                                        ...prev,
                                        [item.title]: [
                                          ...filters[item.title].filter(
                                            (filterItem: string) =>
                                              filterItem !== subItem.name
                                          ),
                                          filters[subItem.name],
                                        ],
                                        [subItem.name]: '',
                                      };
                                    });
                                  else {
                                    toast.error('Filter already added');
                                    setFilters((prev: any) => {
                                      return {
                                        ...prev,
                                        [item.title]: [
                                          ...filters[item.title].filter(
                                            (filterItem: string) =>
                                              filterItem !== subItem.name
                                          ),
                                        ],
                                        [subItem.name]: '',
                                      };
                                    });
                                  }
                              }}
                            >
                              <input
                                className=' w-full  focus-within:outline-none placeholder:text-[#8A8A8A] placeholder:text-xs bg-[#F8F8F8]'
                                name={subItem.name}
                                placeholder={`Enter ${subItem.name}`}
                                type='text'
                                value={filters[subItem.name]}
                                onChange={(e) => {
                                  // setFilters((prev: any) => {
                                  //   if (
                                  //     !filters[item.title]?.includes(
                                  //       e.target.value
                                  //     ) ||
                                  //     !filters[subItem.name].includes(
                                  //       e.target.value
                                  //     )
                                  //   ) {
                                  //     return {
                                  //       ...prev,
                                  //       [item.title]: filters[item.title]
                                  //         ? [
                                  //             ...filters[item.title],
                                  //             e.target.value,
                                  //           ]
                                  //         : (filters[item.title] = [
                                  //             e.target.value,
                                  //           ]),

                                  //       [subItem.name]: filters[subItem.name]
                                  //         ? [
                                  //             ...filters[subItem.name],
                                  //             e.target.value,
                                  //           ]
                                  //         : (filters[subItem.name] = [
                                  //             e.target.value,
                                  //           ]),
                                  //     };
                                  //   }
                                  // });

                                  setFilters((prev: any) => {
                                    return {
                                      ...prev,
                                      [subItem.name]: e.target.value,
                                    };
                                  });
                                }}
                              />
                              <button
                                type='submit'
                                className='h-6 grid place-content-center border-[0.5px] border-[#EBEBEB] p-2 rounded-[4px] w-6'
                              >
                                <svg
                                  width='16'
                                  height='16'
                                  viewBox='0 0 16 16'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M6.64645 4.14645C6.45118 4.34171 6.45118 4.65829 6.64645 4.85355L9.79289 8L6.64645 11.1464C6.45118 11.3417 6.45118 11.6583 6.64645 11.8536C6.84171 12.0488 7.15829 12.0488 7.35355 11.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L7.35355 4.14645C7.15829 3.95118 6.84171 3.95118 6.64645 4.14645Z'
                                    fill='#111111'
                                  />
                                </svg>
                              </button>
                            </form>
                          )}

                        {filters[item.title]?.includes(subItem.name) &&
                          subItem.hasSelect && (
                            <>
                              {subItem.isYesOrNo && (
                                <select
                                  name={subItem.name}
                                  id={subItem.name}
                                  className=' p-2 rounded h-9 gap-[5.33px] flex border-[0.67px] border-[#DADADA] focus-within:outline-none bg-[#F8F8F8] placeholder:text-[#8A8A8A]'
                                  onChange={(e) => {
                                    setFilters((prev: any) => {
                                      return {
                                        ...prev,
                                        [subItem.name]: [e.target.value],
                                      };
                                    });
                                  }}
                                >
                                  <option value='' disabled>
                                    Select option
                                  </option>
                                  {['Yes', 'No'].map((opt, idx) => (
                                    <option>{opt}</option>
                                  ))}
                                </select>
                              )}
                            </>
                          )}
                      </div>
                    )}
                    {subItem.hasInput && !subItem.isSelect && (
                      <div className=' flex gap-1 flex-col items-start'>
                        {subItem.name !== item.title && (
                          <span className='text-[#0E0E0E] text-sm'>
                            {subItem.name}
                          </span>
                        )}
                        {
                          <form
                            action=''
                            className=' w-full gap-[5.33px] justify-between items-center p-2 flex border-[0.67px]  rounded h-9'
                            onSubmit={(e: React.FormEvent) => {
                              e.preventDefault();
                              handleInputs(e, subItem, item, idx);
                            }}
                          >
                            {subItem.name !== item.title ? (
                              <input
                                className='   w-full  focus-within:outline-none placeholder:text-[#8A8A8A] placeholder:text-xs bg-[#F8F8F8]'
                                name={subItem.name}
                                placeholder={`Enter ${subItem.name}`}
                                type='text'
                                value={filters[subItem.name]}
                                onChange={(e) => {
                                  setFilters((prev: any) => {
                                    return {
                                      ...prev,
                                      [subItem.name]: e.target.value,
                                    };
                                  });
                                  console.log(filters);
                                }}
                              />
                            ) : (
                              <input
                                className=' w-full  focus-within:outline-none placeholder:text-[#8A8A8A] placeholder:text-xs bg-[#F8F8F8]'
                                name={subItem.name}
                                placeholder={`Enter ${subItem.name}`}
                                type='text'
                                value={filters[`${subItem.name}_${idx}`]}
                                onChange={(e) => {
                                  setFilters((prev: any) => {
                                    return {
                                      ...prev,
                                      [`${subItem.name}_${idx}`]: [
                                        e.target.value,
                                      ],
                                    };
                                  });
                                  console.log(filters);
                                }}
                              />
                            )}
                            <button
                              type='submit'
                              className='h-6 grid place-content-center border-[0.5px] border-[#EBEBEB] p-2 rounded-[4px] w-6'
                            >
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M6.64645 4.14645C6.45118 4.34171 6.45118 4.65829 6.64645 4.85355L9.79289 8L6.64645 11.1464C6.45118 11.3417 6.45118 11.6583 6.64645 11.8536C6.84171 12.0488 7.15829 12.0488 7.35355 11.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L7.35355 4.14645C7.15829 3.95118 6.84171 3.95118 6.64645 4.14645Z'
                                  fill='#111111'
                                />
                              </svg>
                            </button>
                          </form>
                        }
                      </div>
                    )}
                    {subItem.hasSelect &&
                      !subItem.hasInput &&
                      !subItem.isSelect && (
                        <div className=' flex gap-1 flex-col items-start'>
                          {subItem.name.toLowerCase().includes('language') && (
                            <span>Select a Language</span>
                          )}
                          <>
                            {subItem.isYesOrNo && (
                              <select
                                name={subItem.name}
                                id={subItem.name}
                                className=' p-2 rounded h-9 gap-[5.33px] flex border-[0.67px] border-[#DADADA] focus-within:outline-none bg-[#F8F8F8] placeholder:text-[#8A8A8A]'
                              >
                                {['Yes', 'No'].map((opt, idx) => (
                                  <option>{opt}</option>
                                ))}
                              </select>
                            )}
                            {subItem.name
                              .toLowerCase()
                              .includes('language') && (
                              <select
                                name={subItem.name}
                                id={subItem.name}
                                value={selectedLanguage}
                                onChange={(e) => {
                                  setSelectedLanguage(e.target.value);
                                  console.log(item.title);
                                  console.log(subItem.name);
                                  console.log(e.target.value);
                                  if (
                                    !filters[item.title]?.includes(
                                      e.target.value
                                    )
                                  ) {
                                    setFilters((prev: any) => {
                                      return {
                                        ...prev,
                                        [item.title]: filters[item.title]
                                          ? [
                                              ...filters[item.title],
                                              e.target.value,
                                            ]
                                          : [e.target.value],
                                      };
                                    });
                                  } else {
                                    toast.error('Filter already added');
                                  }
                                  setSelectedLanguage('');
                                }}
                                className=' p-2 rounded h-9 gap-[5.33px] flex border-[0.67px] border-[#DADADA] focus-within:outline-none bg-[#F8F8F8] placeholder:text-[#8A8A8A]'
                              >
                                {languages.map((opt, idx) => (
                                  <option>{opt}</option>
                                ))}
                              </select>
                            )}
                          </>
                        </div>
                      )}
                    {subItem.isDate && (
                      <div className=' flex gap-1 flex-col items-start'>
                        {subItem.name.toLowerCase().includes('age') && (
                          <DateOfBirthForm
                            filter={item.title}
                            setFilter={setFilters}
                            filters={filters}
                          />
                        )}

                        {(subItem.name.toLowerCase().includes('registered') ||
                          subItem.name.toLowerCase().includes('booking')) && (
                          <DateType1
                            filter={item.title}
                            setFilter={setFilters}
                            filters={filters}
                          />
                        )}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          )}
          {filters[item.title]?.length > 0 && (
            <div className=' flex flex-col gap-2 items-start'>
              <div className=' flex gap-1 flex-wrap items-center font-medium text-[12.38px] leading-[17.69px]'>
                {filters[item.title].map((im: string, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className=' bg-[#EBEBEB] flex border-[0.88px] py-[3.54px] px-[7.08px] rounded-[88.45px] items-center gap-[3.54px] border-[#F5F5F5]'
                    >
                      <span>{im}</span>
                      <span
                        className=''
                        onClick={() => {
                          setFilters((prev: any) => {
                            return {
                              ...prev,
                              [item.title]: filters[item.title] && [
                                ...filters[item.title].filter(
                                  (filterItem: string) => filterItem !== im
                                ),
                              ],
                            };
                          });
                        }}
                      >
                        <svg
                          width='15'
                          height='15'
                          viewBox='0 0 15 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M3.98554 3.97111L4.04978 3.8967C4.2853 3.66118 4.65386 3.63976 4.91357 3.83247L4.98798 3.8967L7.61478 6.5232L10.2416 3.8967C10.5007 3.63762 10.9207 3.63762 11.1798 3.8967C11.4389 4.15578 11.4389 4.57582 11.1798 4.8349L8.55328 7.4617L11.1798 10.0885C11.4153 10.324 11.4367 10.6926 11.244 10.9523L11.1798 11.0267C10.9443 11.2622 10.5757 11.2836 10.316 11.0909L10.2416 11.0267L7.61478 8.4002L4.98798 11.0267C4.7289 11.2858 4.30885 11.2858 4.04978 11.0267C3.7907 10.7676 3.7907 10.3476 4.04978 10.0885L6.67628 7.4617L4.04978 4.8349C3.81425 4.59938 3.79284 4.23082 3.98554 3.97111L4.04978 3.8967L3.98554 3.97111Z'
                            fill='#111111'
                          />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                className=' text-[#0E0E0E] text-xs'
                onClick={() => {
                  setFilters((prev: any) => {
                    return {
                      ...prev,
                      [item.title]: [],
                    };
                  });
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
