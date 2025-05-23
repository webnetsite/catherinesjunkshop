import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Image from 'next/image'
import bp from '../../public/images/BP.png'
import Link from 'next/link';
import Head from 'next/head';


const Print_IssuanceSlip= ({result}) => {
  const metaInfo = {
    title: "Vehicle Management Inofrmation System"
  };
  console.log(result)

  function handlePrint() {
    window.print()
  }

  return (
    
      <><Head>
      <title>Print Issuance Slip</title> {/* Set the title here */}
    </Head><div>
      <div className="flex items-center p-3 flex-wrap text-white bg-blue-700 print:hidden">
      <Link href="/">
 <button className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800 print:hidden flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 me-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    Home
 </button>
</Link>
    <button onClick={handlePrint} className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800 print:hidden flex items-center">
        <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
          <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
        </svg>
        Print
    </button>
    </div>
    
    <div className="py-2 print:hidden"></div>
    <div className="py-2 print:hidden"></div>
    <div className="w-full px-3 mb-6 md:mb-0 px-4">
          <table style={{ width: '100%' }}>
              <thead>
                  <tr>
                      <th className="custom-colspan-half"></th>
                      <th colSpan={2}>
                          <div style={{ display: 'flex', marginLeft: '10px', alignItems: 'left', justifyContent: 'left' }}>
                              <div style={{ marginRight: '10px' }}>
                                  <Image
                                      src={bp}
                                      alt="Picture of the author"
                                      width={70}
                                      height={70} />
                              </div>
                              <div style={{ textAlign: 'center' }}>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      United States of America
                                  </div>
                                  <div className="content-center font-serif">
                                      UMBRELLA CORPORATION
                                  </div>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      545 S Birdneck RD STE 202B
                                  </div>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      Virginia Beach, VA 23451
                                  </div>
                                  <div className="content-center text-[10px] font-serif font-normal ">
                                      Tel No. 757-227-4610 Email Add: <span className="text-sky-500"> sales@ucwrg.com </span>
                                      Website: <span className="text-sky-500">www.ucwrg.com</span>
                                  </div>
                              </div>
                          </div>
                      </th>
                  </tr>

                  <tr>
                      <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                  </tr>

              </thead>
              <tbody>
                  <tr>
                      <td colSpan={4} class="text-center font-sans ... text-xl ... whitespace-normal">
                          <b><u>FUEL/OIL ISSUANCE SLIP</u></b>
                      </td>
                  </tr>
                  <tr>
                      <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                  </tr>
                  <tr>
                      <td style={{ width: '15%' }}>
                          <p class="font-sans ... text-xs12">CHARGE TO:</p>
                      </td>
                      <td style={{ width: '45%' }}>
                          <p class="font-sans ... text-xs12"><u>{result.charging}</u></p>
                      </td>
                      <td style={{ width: '20%' }}>
                          <p class="font-sans ... text-xs12">CONTROL NO:</p>
                      </td>
                      <td style={{ width: '20%' }}>
                          <p class="font-sans ... text-xs12"><u>{result.id}</u></p>
                      </td>
                  </tr>
                  <tr>
                      <td style={{ width: '15%' }}>
                          <p class="font-sans ... text-xs12">TO:</p>
                      </td>
                      <td style={{ width: '45%' }}>
                          <p class="font-sans ... text-xs12"><u>{result.charge_to}</u></p>
                      </td>
                      <td style={{ width: '20%' }}>
                          <p class="font-sans ... text-xs12">Date:</p>
                      </td>
                      <td style={{ width: '20%' }}>
                          <p class="font-sans ... text-xs12"><u>{moment(result.date_req).format('LL')}</u></p>
                      </td>
                  </tr>
                  <tr>
                      <td colSpan={4} style={{ height: '35px' }} class="text-center font-sans ... text-xl ..."></td>
                  </tr>
                  <tr>
                      <td style={{ width: '15%' }}>
                          <p class="font-sans ... text-xs12">Sir/Madam:</p>
                      </td>
                      <td style={{ width: '45%' }}></td>
                      <td style={{ width: '20%' }}></td>
                      <td style={{ width: '20%' }}></td>
                  </tr>
                  <tr>
                      <td style={{ width: '15%' }}></td>
                      <td style={{ width: '45%' }}>
                          <p class="font-sans ... text-xs12">Please issue the following:</p>
                      </td>
                      <td style={{ width: '20%' }}></td>
                      <td style={{ width: '20%' }}></td>
                  </tr>
              </tbody>
          </table>
          <table style={{ width: '100%' }}>
              <thead>
                  <tr>
                      <th colSpan={5}></th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td style={{ width: '15%' }}></td>
                      <td style={{ width: '25%' }} class="font-sans ... text-xs12">a. {result.consumableproduct}</td>
                      <td style={{ width: '20%' }}>
                          <div class="border-b border-gray-900">
                              <label for="username" class=""><p class="text-center font-sans ... text-xs12"><b>{result.liters} Liter</b></p></label>
                          </div>
                      </td>
                      <td style={{ width: '15%' }}><p class="text-center font-sans ... text-xs12">₱</p></td>
                      <td style={{ width: '25%' }}>
                          <div class="border-b border-gray-900">
                              <label for="username" class="text-transparent">.</label>
                          </div>
                      </td>
                  </tr>
                  <tr>
                      <td colSpan={5} style={{ height: '50px' }}></td>
                  </tr>
              </tbody>
          </table>
          <table style={{ width: '100%' }}>
              <thead>
                  <tr>
                      <th colSpan={2}></th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td style={{ width: '25%' }} class="font-sans ... text-xs12">Requesitioning Officer:</td>
                      <td style={{ width: '40%' }} class="font-sans ... text-xs12">
                          <div class="border-b border-gray-900">
                              <label for="username" class="">{result.req_officer.toUpperCase()}</label>
                          </div>
                      </td>
                      <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                  </tr>
                  <tr>
                      <td class="font-sans ... text-xs12">Vehicle Plate No:</td>
                      <td class="font-sans ... text-xs12">
                          <div class="border-b border-gray-900">
                              <label for="username" class="">{result.vehicle}</label>
                          </div>
                      </td>
                      <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                  </tr>
                  <tr>
                      <td class="font-sans ... text-xs12">Driver:</td>
                      <td class="font-sans ... text-xs12">
                          <div class="border-b border-gray-900">
                              <label for="username" class="">{result.driver.toUpperCase()}</label>
                          </div>
                      </td>
                      <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                  </tr>
              </tbody>
          </table>
          <table style={{ width: '100%' }}>
              <thead>
                  <tr>
                      <th colSpan={4}>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td colSpan={4} style={{ height: '40px' }} class="text-center font-sans ... text-xl ..."></td>
                  </tr>
                  <tr>
                      <td colspan={2} style={{ width: '40%' }}>
                          <p class="text-center font-sans uppercase ... text-xs12"><b>{result.prepared}</b></p>
                      </td>
                      <td style={{ width: '30%' }}>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                      <td style={{ width: '30%' }}>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <p class="italic text-center font-sans ... text-xs12">{result.pos1}</p>
                      </td>
                      <td>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                      <td>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <table style={{ width: '100%' }}>
              <tbody>
                  <tr>
                      <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                  </tr>
                  <tr>
                      <td style={{ width: '30%' }}>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                      <td class="align-top" style={{ width: '70%', height: '60px' }}>
                          <p class="text-center font-sans ... text-xs12">APPROVED:</p>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                      <td>
                          <p class="text-center  font-sans uppercase ... text-xs12"><b>{result.approved}</b></p>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <p class="font-sans ... text-xs12"></p>
                      </td>
                      <td>
                          <p class="italic text-center  font-sans ... text-xs12">{result.pos2}</p>
                      </td>
                  </tr>
                  <tr style={{ height: '50px' }} class="border-dashed border-b-2 border-gray-900">
                      <td>
                      </td>
                      <td>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div><br></br><div>
      <div className="w-full px-3 mb-6 md:mb-0 px-4">
              <table style={{ width: '100%' }}>
                  <thead>
                      <tr>
                          <th className="custom-colspan-half"></th>
                          <th colSpan={2}>
                              <div style={{ display: 'flex', marginLeft: '10px', alignItems: 'left', justifyContent: 'left' }}>
                                  <div style={{ marginRight: '10px' }}>
                                      <Image
                                          src={bp}
                                          alt="Picture of the author"
                                          width={70}
                                          height={70} />
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      United States of America
                                  </div>
                                  <div className="content-center font-serif">
                                      UMBRELLA CORPORATION
                                  </div>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      545 S Birdneck RD STE 202B
                                  </div>
                                  <div className="content-center text-[13px] font-serif font-normal">
                                      Virginia Beach, VA 23451
                                  </div>
                                  <div className="content-center text-[10px] font-serif font-normal ">
                                      Tel No. 757-227-4610 Email Add: <span className="text-sky-500"> sales@ucwrg.com </span>
                                      Website: <span className="text-sky-500">www.ucwrg.com</span>
                                  </div>
                              </div>
                              </div>
                          </th>
                      </tr>
                      <tr>
                          <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td colSpan={4} class="text-center font-sans ... text-xl ...">
                              <b><u>FUEL/OIL ISSUANCE SLIP</u></b>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                      </tr>
                      <tr>
                          <td style={{ width: '15%' }}>
                              <p class="font-sans ... text-xs12">CHARGE TO:</p>
                          </td>
                          <td style={{ width: '45%' }}>
                              <p class="font-sans ... text-xs12"><u>{result.charging}</u></p>
                          </td>
                          <td style={{ width: '20%' }}>
                              <p class="font-sans ... text-xs12">CONTROL NO:</p>
                          </td>
                          <td style={{ width: '20%' }}>
                              <p class="font-sans ... text-xs12"><u>{result.id}</u></p>
                          </td>
                      </tr>
                      <tr>
                          <td style={{ width: '15%' }}>
                              <p class="font-sans ... text-xs12">TO:</p>
                          </td>
                          <td style={{ width: '45%' }}>
                              <p class="font-sans ... text-xs12"><u>{result.charge_to}</u></p>
                          </td>
                          <td style={{ width: '20%' }}>
                              <p class="font-sans ... text-xs12">Date:</p>
                          </td>
                          <td style={{ width: '20%' }}>
                              <p class="font-sans ... text-xs12"><u>{moment(result.date_req).format('LL')}</u></p>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan={4} style={{ height: '35px' }} class="text-center font-sans ... text-xl ..."></td>
                      </tr>
                      <tr>
                          <td style={{ width: '15%' }}>
                              <p class="font-sans ... text-xs12">Sir/Madam:</p>
                          </td>
                          <td style={{ width: '45%' }}></td>
                          <td style={{ width: '20%' }}></td>
                          <td style={{ width: '20%' }}></td>
                      </tr>
                      <tr>
                          <td style={{ width: '15%' }}></td>
                          <td style={{ width: '45%' }}>
                              <p class="font-sans ... text-xs12">Please issue the following:</p>
                          </td>
                          <td style={{ width: '20%' }}></td>
                          <td style={{ width: '20%' }}></td>
                      </tr>
                  </tbody>
              </table>
              <table style={{ width: '100%' }}>
                  <thead>
                      <tr>
                          <th colSpan={5}></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style={{ width: '15%' }}></td>
                          <td style={{ width: '25%' }} class="font-sans ... text-xs12">a. {result.consumableproduct}</td>
                          <td style={{ width: '20%' }}>
                              <div class="border-b border-gray-900">
                                  <label for="username" class=""><p class="text-center font-sans ... text-xs12"><b>{result.liters} Liter</b></p></label>
                              </div>
                          </td>
                          <td style={{ width: '15%' }}><p class="text-center font-sans ... text-xs12">₱</p></td>
                          <td style={{ width: '25%' }}>
                              <div class="border-b border-gray-900">
                                  <label for="username" class="text-transparent">.</label>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan={5} style={{ height: '50px' }}></td>
                      </tr>
                  </tbody>
              </table>
              <table style={{ width: '100%' }}>
                  <thead>
                      <tr>
                          <th colSpan={2}></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style={{ width: '25%' }} class="font-sans ... text-xs12">Requesitioning Officer:</td>
                          <td style={{ width: '40%' }} class="font-sans ... text-xs12">
                              <div class="border-b border-gray-900">
                                  <label for="username" class="">{result.req_officer.toUpperCase()}</label>
                              </div>
                          </td>
                          <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                      </tr>
                      <tr>
                          <td class="font-sans ... text-xs12">Vehicle Plate No:</td>
                          <td class="font-sans ... text-xs12">
                              <div class="border-b border-gray-900">
                                  <label for="username" class="">{result.vehicle}</label>
                              </div>
                          </td>
                          <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                      </tr>
                      <tr>
                          <td class="font-sans ... text-xs12">Driver:</td>
                          <td class="font-sans ... text-xs12">
                              <div class="border-b border-gray-900">
                                  <label for="username" class="">{result.driver.toUpperCase()}</label>
                              </div>
                          </td>
                          <td style={{ width: '35%' }} class="font-sans ... text-xs12"></td>
                      </tr>
                  </tbody>
              </table>
              <table style={{ width: '100%' }}>
                  <thead>
                      <tr>
                          <th colSpan={4}>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td colSpan={4} style={{ height: '40px' }} class="text-center font-sans ... text-xl ..."></td>
                      </tr>
                      <tr>
                          <td colspan={2} style={{ width: '40%' }}>
                              <p class="text-center font-sans uppercase ... text-xs12"><b>{result.prepared}</b></p>
                          </td>
                          <td style={{ width: '30%' }}>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                          <td style={{ width: '30%' }}>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p class="italic text-center font-sans ... text-xs12">{result.pos1}</p>
                          </td>
                          <td>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                          <td>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <table style={{ width: '100%' }}>
                  <tbody>
                      <tr>
                          <td colSpan={4} style={{ height: '20px' }} class="text-center font-sans ... text-xl ..."></td>
                      </tr>
                      <tr>
                          <td style={{ width: '30%' }}>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                          <td class="align-top" style={{ width: '70%', height: '60px' }}>
                              <p class="text-center font-sans ... text-xs12">APPROVED:</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                          <td>
                              <p class="text-center  font-sans uppercase ... text-xs12"><b>{result.approved}</b></p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p class="font-sans ... text-xs12"></p>
                          </td>
                          <td>
                              <p class="italic text-center  font-sans ... text-xs12">{result.pos2}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div></div><div className="py-10 print:hidden"></div></div></>
  );
};

export default Print_IssuanceSlip;

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
    const prisma = new PrismaClient()
    const result = await prisma.issuance_slip.findUnique({
        where: { id },
    })
    result.date_req = moment(result.date_req).utc().format('YYYY-MM-DD')
    result.date_time_created = moment(result.date_time_created).utc().format()

    return {
      props : { result }
    }
  }