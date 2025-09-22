import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Mail from './mail.svg';
import Print from './print.svg';
import Delete from './delete.svg';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';
import Back from './back.svg';
import Froward from './forward.svg';
import { DeleteIcon, Trash2Icon } from 'lucide-react';
import { Zone } from '@/types/GlobalState';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { DELETE_REQUEST, GET_REQUEST } from '@/utils/lib/server-requests';
import { URLS } from '@/utils/lib/urls';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';
import { PricingInterface } from '@/types/DashboardTypes/tables';

const PricingTable = () => {
  const [pricings, setPricings] = React.useState<PricingInterface[]>([]);
  const [initialPricings, setInitialPricings] = React.useState<PricingInterface[]>([]);
  const [fetching, setFetching] = React.useState(false);
  const [selectedPricings, setSelectedPricings] = useState<string[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);
  const [search, setSearch] = useState('');

  const { setSuccessText, setErrorText } = useDB();
  const getPricings = async () => {
    const url = URLS.BASE_URL_ADMIN + URLS.getPricings;
    setFetching(true);

    await GET_REQUEST(url, Cookies.get('token') || '')
      .then((result) => {
        if (result.success) {
          setSuccessText('Pricings fetched successfully');
          setPricings(result.prices);
          setInitialPricings(result.prices);
        }
      })
      .catch((err) => {
        setErrorText(err.message || 'Error fetching pricings');
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessText('');
          setErrorText('');
        }, 3000);
        setFetching(false);
      });
  };

  const deleteAllSelected = () => {
    setDeletingBulk(true);
    selectedPricings.forEach((id) => {
      deletePricing(id);
    });
  };

  const deletePricing = async (id: string) => {
    const url = URLS.BASE_URL_ADMIN + URLS.deletePricing + id;
    await DELETE_REQUEST(url, Cookies.get('token') || '')
      .then((result) => {
        if (result.success) setSuccessText('Pricing deleted successfully');
        getPricings();
      })
      .catch((err) => {
        setErrorText(err.message || 'Error deleting pricing');
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessText('');
          setErrorText('');
        }, 3000);
      });
  };

  useEffect(() => {
    getPricings();
  }, []);

  return (
    <section className=" mt-6 flex flex-col gap-4 px-6 min-h-[300px] max-h-[771px]">
      <div className=" flex justify-between items-center w-full">
        <h3 className="text-[#2B2B2B]  text-2xl font-bold">Zone Pricing List</h3>
      </div>

      <div className=" bg-[#FFFFFF] border-[#FFFFFF] border rounded-2xl">
        <div className=" flex justify-between items-center mb-4 mt-2 px-4  w-full">
          <div className=" flex gap-3 items-center">
            <button className=" w-[68px] h-9 border border-[#DADADA]  py-2 px-6 bg-transparent rounded-lg grid place-content-center items-center">
              <Image src={Mail} alt="" width={12} height={12} className="w-[12px] h-[12px] " />
            </button>
            <button className=" w-[68px] h-9 border border-[#DADADA]  py-2 px-6 bg-transparent rounded-lg grid place-content-center items-center">
              {/* <Print className=' w-4 h-[13px]' /> */}
              <Image src={Print} alt="" width={12} height={12} className="w-[12px] h-[12px] " />
            </button>
            <button
              onClick={deleteAllSelected}
              className=" w-[68px] h-9 border border-[#DADADA]  py-2 px-6 bg-transparent rounded-lg grid place-content-center items-center"
            >
              {/* <Delete className=' w-4 h-[13px]' /> */}
              <Image src={Delete} alt="" width={12} height={12} className="w-[12px] h-[12px] " />
            </button>
          </div>

          <div className="border-b-[0.5px] flex items-center gap-2 py-[12px] px-[16px] border-[#BFBFBF] min-w-[257px] max-w-[387px] min-h-[40px] max-h-[48px] rounded-[8px] ">
            <Image src={searchIcon} alt="" width={12} height={12} className="w-[12px] h-[12px] " />
            <input
              type="search"
              name=""
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                if (e.target.value === '') {
                  getPricings();
                } else {
                  const filtered = initialPricings.filter((item) => {
                    return (
                      item.zoneFrom.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      item.zoneTo.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      item._id.includes(e.target.value) ||
                      item.vehicleId.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                  });
                  setPricings(filtered);
                }
              }}
              id=""
              className=" focus-within:outline-none outline-none text-base font-normal text-[#0E0E0E] leading-[24px] placeholder:text-[#AAAAAA]"
              placeholder="Search for any document by name, email etc"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className=" text-left text-sm">
            <thead className="bg-[#F8F8F8] pt-8 h-9">
              <tr className=" text-[#0E0E0E] flex items-end pb-1 pt-1 tracking-wider text-sm font-medium">
                <th className="py-2 px-4 mr-4">
                  <input
                    type="checkbox"
                    checked={pricings.length > 0 && selectedPricings.length === pricings.length}
                    onChange={() => {
                      if (selectedPricings.length === pricings.length) {
                        setSelectedPricings([]);
                      } else {
                        setSelectedPricings(pricings.map((item) => item._id));
                      }
                    }}
                    className="border-[0.67px] bg-transparent rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]"
                  />
                </th>
                <th className=" flex items-start gap-12 min-w-[1124px] mr-12">
                  <th className="py-2 min-w-12 max-w-12 flex gap-2 items-center">
                    <span>S/N</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[140px] max-w-[140px] flex gap-2">
                    <span>From Zone</span> <UpsAndDowns />
                  </th>{' '}
                  <th className="py-2 min-w-[140px] max-w-[140px] flex gap-2">
                    <span>To Zone</span>
                    <span>
                      <UpsAndDowns />
                    </span>
                  </th>
                  <th className="py-2 min-w-[200px] max-w-[200px] flex gap-2">
                    <span>Vehicle Category</span> <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[220px] max-w-[220px] flex gap-2">
                    <span>Service Type</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                    <span>Time Zone</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                    <span>Start Hour</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                    <span>End Hour</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                    <span>Start Date</span>
                    <UpsAndDowns />
                  </th>
                  <th className="py-2 min-w-[128px] max-w-[128px] flex gap-2">End Date</th>
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] border flex gap-2">
                  <span>Week Days</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Min Hours</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Max Hours</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[180px] max-w-[180px] flex gap-2">
                  <span>Mile Restrictions</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[180px] max-w-[180px] flex gap-2">
                  <span>Time Restrictions</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Min Fare</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Max Fare</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Variable</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Wait Time (Min)</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Wait Time (Max)</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Peak Start</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Peak End</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Peak Start </span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Peak End </span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Peak Variable</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[210px] max-w-[210px] flex gap-2">
                  <span>Peak Week Days</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Surge Start (hrs)</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Surge End (hrs)</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[210px] max-w-[210px] flex gap-2">
                  <span>Surge Start Date</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Surge End Date</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[160px] max-w-[160px] flex gap-2">
                  <span>Surge Variable</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[240px] max-w-[240px] flex gap-2">
                  <span>Surge Week Days</span>
                  <UpsAndDowns />
                </th>

                <th className="py-2 min-w-[200px] max-w-[200px] flex gap-2">
                  <span>Fee Name</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Currency</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[240px] max-w-[240px] flex gap-2">
                  <span>Formula Name</span>
                  <UpsAndDowns />
                </th>
                <th className="py-2 min-w-[130px] max-w-[130px] flex gap-2">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className=" border border-[#DADADA] rounded-2xl py-4 mt-4">
              {pricings.length > 0 ? (
                pricings.map((item, index) => (
                  <tr key={index} className="border-b flex pt-2 hover:bg-gray-50">
                    <td className="py-3 mr-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPricings.includes(item._id)}
                        onChange={() => {
                          if (selectedPricings.includes(item._id)) {
                            setSelectedPricings(selectedPricings.filter((id) => id !== item._id));
                          } else {
                            setSelectedPricings([...selectedPricings, item._id]);
                          }
                        }}
                        className="border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px] accent-[#0E0E0E]"
                      />
                    </td>
                    <td className="flex items-start gap-12 min-w-[1128px] mr-12">
                      <td className="py-3 items-start  min-w-12 max-w-12">{index + 1}</td>
                      <td className="py-3 min-w-[140px] max-w-[140px]">{item.zoneFrom}</td>
                      <td className="py-3 min-w-[140px] max-w-[140px]">{item.zoneTo}</td>
                      <td className="py-3 min-w-[200px] max-w-[200px]">{item.vehicleId}</td>
                      <td className="py-3 min-w-[220px] max-w-[220px]">{item.serviceName}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{'GMT'}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.startHour}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.endHour}</td>
                      <td className="py-3 min-w-[130px] max-w-[130px]">
                        {new Date(item.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 min-w-[128px] max-w-[128px]">
                        {new Date(item.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 min-w-[160px] max-w-[160px] border flex gap-2">
                        <span className="flex gap-2 items-center">
                          {item.weekDays.map((day: any, index: number) => (
                            <span key={index} className="text-[#0E0E0E] text-sm font-normal">
                              {day}
                            </span>
                          ))}
                        </span>
                      </td>
                      <td className="py-3 min-w-[60px] max-w-[60px] border">{item.hourly.minHours}</td>
                      <td className="py-3 min-w-[70px] max-w-[60px] border">{item.hourly.maxHours}</td>
                      <td className="py-3 min-w-[150px] max-w-[150px]">{item.mileRestrictions}</td>
                      <td className="py-3 min-w-[120px] max-w-[1280px]">{item.timeRestrictions}</td>
                      <td className="py-3 min-w-[80px] max-w-[80px]">{item.minFare || '0'}</td>
                      <td className="py-3 min-w-[80px] max-w-[80px]">{item.maxFare || '0'}</td>
                      <td className="py-3 min-w-[100px] max-w-[100px]">{item.variable}</td>
                      <td className="py-3 min-w-[100px] max-w-[100px]">{item.waitTime.minimum}</td>
                      <td className="py-3 min-w-[100px] max-w-[100px]">{item.waitTime.maximum}</td>
                      <td className="py-3 min-w-[120px] max-w-[120px]">{item.peakHours.startHour}</td>
                      <td className="py-3 min-w-[100px] max-w-[100px]">{item.peakHours.endHour}</td>
                      <td className="py-3 min-w-[110px] max-w-[110px]">{item.peakHours.startDate}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.peakHours.endDate}</td>
                      <td className="py-3 min-w-[70px] max-w-[70px]">{item.peakHours.variable}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px] border">
                        {item.peakHours.weekDays.map((day: any, index: number) => (
                          <span key={index} className="text-[#0E0E0E] text-sm font-normal">
                            {day}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 min-w-[110px] max-w-[110px]">{item.surge.startHour}</td>
                      <td className="py-3 min-w-[110px] max-w-[110px]">{item.surge.endHour}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.surge.startDate}</td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.surge.endDate}</td>
                      <td className="py-3 min-w-[80px] max-w-[80px]">{item.surge.variable}</td>
                      <td className="py-3 min-w-[180px] max-w-[180px]">
                        {item.surge.weekDays.map((day: any, index: number) => (
                          <span key={index} className="text-[#0E0E0E] text-sm font-normal">
                            {day}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.pricingFee[0].category}</td>
                      <td className="py-3 min-w-[80px] max-w-[80px]">
                        {item.pricingFee[0].fees[0].variables[0].value}
                      </td>
                      <td className="py-3 min-w-[160px] max-w-[160px]">{item.formulaName}</td>
                    </td>

                    <td className=" flex gap-12 min-w-[300px]">
                      <td className="py-2 flex items-start gap-4 min-w-[124px] max-w-[124px]">
                        <button className="" onClick={() => {}}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4403 4.56066C14.6927 3.81314 13.4808 3.81311 12.7332 4.5606L5.33829 11.9548C5.15725 12.1359 5.02085 12.3566 4.93989 12.5994L4.02567 15.3421C3.96578 15.5218 4.01254 15.7198 4.14646 15.8538C4.28038 15.9877 4.47846 16.0344 4.65813 15.9746L7.40087 15.0603C7.64368 14.9794 7.86432 14.843 8.04531 14.662L15.4402 7.26783C16.1878 6.52029 16.1878 5.30823 15.4403 4.56066ZM13.4403 5.26774C13.7973 4.91074 14.3761 4.91076 14.7331 5.26777C15.0902 5.6248 15.0902 6.20367 14.7331 6.56069L13.9994 7.29437L12.7065 6.00148L13.4403 5.26774ZM11.9993 6.70855L13.2922 8.00145L7.33823 13.9549C7.26701 14.0261 7.18019 14.0798 7.08464 14.1116L5.29058 14.7096L5.88858 12.9157C5.92044 12.8201 5.97412 12.7332 6.04536 12.662L11.9993 6.70855Z"
                              fill="#212121"
                            />
                          </svg>
                        </button>
                        <button
                          className=""
                          onClick={() => {
                            deletePricing(item._id);
                          }}
                        >
                          {/* <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M7 3C7.27614 3 7.5 3.22386 7.5 3.5V4H9.5V3.5C9.5 3.22386 9.72386 3 10 3C10.2761 3 10.5 3.22386 10.5 3.5V4H12.5V3.5C12.5 3.22386 12.7239 3 13 3C13.2761 3 13.5 3.22386 13.5 3.5V4C14.3284 4 15 4.67157 15 5.5V8.03605C14.648 8.09733 14.3063 8.23252 14 8.44161V5.5C14 5.22386 13.7761 5 13.5 5H6.5C6.22386 5 6 5.22386 6 5.5V15.5C6 15.7761 6.22386 16 6.5 16H8.04666L8.0461 16.0022C7.95763 16.3561 7.99196 16.7 8.11523 17H6.5C5.67157 17 5 16.3284 5 15.5V5.5C5 4.67157 5.67157 4 6.5 4V3.5C6.5 3.22386 6.72386 3 7 3ZM12 10C12.1071 10 12.2063 10.0337 12.2877 10.091L11.3787 11H8C7.72386 11 7.5 10.7761 7.5 10.5C7.5 10.2239 7.72386 10 8 10H12ZM8.99583 13.4352C8.96404 13.1896 8.75417 13 8.5 13H8C7.72386 13 7.5 13.2239 7.5 13.5C7.5 13.7761 7.72386 14 8 14H8.5C8.55475 14 8.60744 13.9912 8.65673 13.9749C8.75426 13.786 8.86767 13.6054 8.99583 13.4352ZM8 7C7.72386 7 7.5 7.22386 7.5 7.5C7.5 7.77614 7.72386 8 8 8H12C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7H8ZM14.3375 9.45503C14.947 8.84556 15.9351 8.84556 16.5446 9.45503C17.1541 10.0645 17.1541 11.0527 16.5446 11.6621L12.2562 15.9505C11.9003 16.3064 11.4543 16.5589 10.966 16.681L9.75486 16.9838C9.30853 17.0954 8.90424 16.6911 9.01582 16.2448L9.31861 15.0336C9.44069 14.5453 9.69319 14.0993 10.0491 13.7434L14.3375 9.45503Z'
                                  fill='#212121'
                                />
                              </svg> */}

                          <Trash2Icon size={20} />
                        </button>
                        <button className=" ">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z"
                              fill="#555555"
                            />
                          </svg>
                        </button>
                      </td>
                    </td>
                  </tr>
                ))
              ) : fetching ? (
                <div>
                  <p className=" text-center py-4">Fetching Pricings...</p>
                </div>
              ) : (
                <tr className="border border-[#DADADA] rounded-2xl py-4 mt-4">
                  <td colSpan={9} className="text-center py-4">
                    No Pricing Added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className=" w-[600px] text-[#3C3C3C] flex mx-auto items-center justify-center gap-8">
            <p className=" text-base">
              Showing <span className=" font-medium">1-3</span>
            </p>
            <div className=" flex gap-2 items-center">
              <button className=" border border-[#DADADA] w-8 h-8 grid place-content-center  p-2 rounded-[4px] ">
                {/* <Back className=' w-[5.5px] h-2.5' /> */}
                <Image src={Back} alt="" width={5.5} height={10} className="w-[5.5px] h-[10px] " />
              </button>
              <p className=" bg-[#F5F5F5] w-8 h-8 grid place-content-center  p-2 rounded-[4px] font-medium ">1</p>
              <button className=" border border-[#DADADA] w-8 h-8 grid place-content-center  p-2 rounded-[4px] ">
                {/* <Froward className=' w-[5.5px] h-2.5' /> */}
                <Image src={Froward} alt="" width={5.5} height={10} className="w-[5.5px] h-[10px] " />
              </button>
            </div>

            <p className=" text-base">Jump to page</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;

const UpsAndDowns = () => {
  return (
    <span className=" flex flex-col gap-0 items-center">
      <span className=" -mb-[2px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.21967 7.53033C2.51256 7.82322 2.98744 7.82322 3.28033 7.53033L6 4.81066L8.71967 7.53033C9.01256 7.82322 9.48744 7.82322 9.78033 7.53033C10.0732 7.23744 10.0732 6.76256 9.78033 6.46967L6.53033 3.21967C6.23744 2.92678 5.76256 2.92678 5.46967 3.21967L2.21967 6.46967C1.92678 6.76256 1.92678 7.23744 2.21967 7.53033Z"
            fill="#D2D1FE"
          />
        </svg>
      </span>
      <span className=" -mt-[2px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z"
            fill="#1511A8"
          />
        </svg>
      </span>
    </span>
  );
};
