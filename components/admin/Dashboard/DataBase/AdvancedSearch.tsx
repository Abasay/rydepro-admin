import React, { useEffect, useState } from 'react';
import Accordion, { AccordionItem } from './Accordion';
// import { items } from './Filters';
import {
  backgroundChecks,
  companyInformation,
  deposit,
  optionalInfo,
  Organization,
  personalDocs,
  UsersGeneral,
  vehicleInformation,
} from './Filters';
import { useDB } from '@/contexts/DBContext';

const AdvancedSearch = () => {
  const [showPersonalDoc, setShowPersonalDoc] = useState<boolean>(false);
  const [companyInfo, setShowCompanyInfo] = useState<boolean>(false);
  const [vehicleInfo, setShowVehicleInfo] = useState<boolean>(false);
  const [depositInfo, setShowDepositInfo] = useState<boolean>(false);
  const [bgCheck, setBgCheck] = useState<boolean>(false);
  const [optional, setOptional] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const { filters, setFilters, activeHeader } = useDB();

  const [backgroundChecksState, setBackgroundChecksState] =
    useState(backgroundChecks);
  const [companyInformationState, setCompanyInformationState] =
    useState(companyInformation);
  const [depositState, setDepositState] = useState(deposit);
  const [optionalInfoState, setOptionalInfoState] =
    useState<AccordionItem[]>(optionalInfo);
  const [personalDocsState, setPersonalDocsState] = useState(personalDocs);
  const [usersGeneralState, setUsersGeneralState] = useState(UsersGeneral);
  const [vehicleInformationState, setVehicleInformationState] =
    useState(vehicleInformation);

  const [showOrg, setShowOrg] = useState<boolean>(false);
  const [orgInfo, setOrgInfo] = useState(Organization);

  const filterItems = (
    items: AccordionItem[],
    searchWord: string
  ): AccordionItem[] => {
    if (!searchWord) return items;

    return items
      .map((item) => {
        // Filter subTitle elements that match the searchWord
        const filteredSubTitles = item.subTitle.filter((sub) =>
          sub.name.toLowerCase().includes(searchWord.toLowerCase())
        );

        // Check if title matches the searchWord
        const titleMatch = item.title
          .toLowerCase()
          .includes(searchWord.toLowerCase());

        // If title matches or there are any matching subtitles, return the item with filtered subtitles
        if (titleMatch || filteredSubTitles.length > 0) {
          return {
            ...item,
            subTitle: filteredSubTitles, // Include only matching subtitles
          };
        }

        return null; // Exclude items that don't match at all
      })
      .filter(Boolean) as AccordionItem[]; // Remove null values
  };
  useEffect(() => {
    console.log(searchWord);
    if (!searchWord) return;
    setBackgroundChecksState(filterItems(backgroundChecks, searchWord));
    setCompanyInformationState(filterItems(companyInformation, searchWord));
    setDepositState(filterItems(deposit, searchWord));
    setOptionalInfoState(filterItems(optionalInfo, searchWord));
    setPersonalDocsState(filterItems(personalDocs, searchWord));
    setUsersGeneralState(filterItems(UsersGeneral, searchWord));
    setVehicleInformationState(filterItems(vehicleInformation, searchWord));
    setOrgInfo(filterItems(Organization, searchWord));
  }, [
    searchWord,
    backgroundChecks,
    companyInformation,
    deposit,
    optionalInfo,
    personalDocs,
    UsersGeneral,
    vehicleInformation,
    orgInfo,
  ]);

  useEffect(() => {
    switch (activeHeader) {
      case 'All Riders':
        // const newUsers

        break;

      default:
        break;
    }
  }, [filters]);

  return (
    <div className=' flex  min-w-[280px] flex-col gap-4 p-4 bg-[#FFFFFF]'>
      <div className=' flex gap-4 items-center'>
        <p className='flex items-center gap-2'>
          <span className=' font-medium text-[16px] leading-6'>Filters</span>
          <span className=' w-8 p-2 text-[#1511A8] font-medium h-8 bg-[#F8F8FF] rounded-full grid place-content-center'>
            {
              Object.values(filters)
                .flat()
                .filter((elem) => elem !== '').length
            }
          </span>
        </p>
        <div className=' w-0 border h-6 text-[#EBEBEB]' />
        <button
          className=' text-[#1511A8] text-sm '
          onClick={() => setFilters({})}
        >
          Clear All
        </button>
      </div>
      <div className=' relative flex gap-2 px-4 mx-auto items-center justify-center py-3 min-w-[250px] border-b rounded-lg max-w-[250px] min-h-[45px] max-h-[48px]'>
        <span className=''>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.30887 10.016C8.53903 10.6318 7.56252 11 6.5 11C4.01472 11 2 8.98531 2 6.50002C2 4.01473 4.01472 2 6.5 2C8.98528 2 11 4.01473 11 6.50002C11 7.56252 10.6318 8.53901 10.016 9.30885L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L9.30887 10.016ZM10 6.50002C10 4.56701 8.433 3 6.5 3C4.567 3 3 4.56701 3 6.50002C3 8.43302 4.567 10 6.5 10C8.433 10 10 8.43302 10 6.50002Z'
              fill='#0E0E0E'
            />
          </svg>
        </span>
        <input
          type='text'
          placeholder='Search'
          className=' w-full h-full outline-none focus-within:outline-none placeholder:text-[#8A8A8A] font-[400] text-[16px] leading-6'
          value={searchWord}
          onChange={(event: any) => setSearchWord(event.target.value)}
        />
      </div>
      <Accordion
        items={usersGeneralState}
        filters={filters}
        setFilters={setFilters}
      />
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setShowOrg(!showOrg);
            setShowPersonalDoc(false);
            setShowCompanyInfo(false);
            setShowVehicleInfo(false);
            setShowDepositInfo(false);
            setBgCheck(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Organization Information</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!showOrg && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {showOrg && (
          <Accordion
            items={orgInfo}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setShowPersonalDoc(!showPersonalDoc);
            setShowCompanyInfo(false);
            setShowVehicleInfo(false);
            setShowDepositInfo(false);
            setBgCheck(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Personal Documents</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!showPersonalDoc && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {showPersonalDoc && (
          <Accordion
            items={personalDocsState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setShowCompanyInfo(!companyInfo);
            setShowPersonalDoc(false);
            setShowVehicleInfo(false);
            setShowDepositInfo(false);
            setBgCheck(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Company Information</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!companyInfo && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {companyInfo && (
          <Accordion
            items={companyInformationState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setShowVehicleInfo(!vehicleInfo);
            setShowPersonalDoc(false);
            setShowCompanyInfo(false);
            setShowDepositInfo(false);
            setBgCheck(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Vehicle Information</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!vehicleInfo && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {vehicleInfo && (
          <Accordion
            items={vehicleInformationState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setBgCheck(!bgCheck);
            setShowPersonalDoc(false);
            setShowCompanyInfo(false);
            setShowVehicleInfo(false);
            setShowDepositInfo(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Background Checks</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!bgCheck && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {bgCheck && (
          <Accordion
            items={backgroundChecksState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>

      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setShowDepositInfo(!depositInfo);
            setShowPersonalDoc(false);
            setShowCompanyInfo(false);
            setShowVehicleInfo(false);
            setBgCheck(false);
            setOptional(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Deposit Information</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!depositInfo && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {depositInfo && (
          <Accordion
            items={depositState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className=' flex flex-col gap-1'>
        <p
          onClick={() => {
            setOptional(!optional);
            setShowPersonalDoc(false);
            setShowCompanyInfo(false);
            setShowVehicleInfo(false);
            setShowDepositInfo(false);
            setBgCheck(false);
          }}
          className='flex justify-between cursor-pointer  mb-2 w-full text-sm text-[#0E0E0E]'
        >
          <span>Optional Information</span>

          <span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`${!optional && 'rotate-180'}`}
            >
              <path
                d='M4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L8 6.20711L11.1464 9.35355C11.3417 9.54882 11.6583 9.54882 11.8536 9.35355C12.0488 9.15829 12.0488 8.84171 11.8536 8.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355Z'
                fill='#111111'
              />
            </svg>
          </span>
        </p>
        {optional && (
          <Accordion
            items={optionalInfoState}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
