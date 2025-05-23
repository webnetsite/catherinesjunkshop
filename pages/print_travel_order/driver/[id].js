import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Image from 'next/image'
import bp from '../../../public/images/BP.png'
import Link from 'next/link';
import Head from 'next/head';


 const Print_TravelOrder = ({ result }) => {
  const metaInfo = {
     title: "Travel Order List",
  };


 function handlePrint() {
    window.print()
 }

 return (
    <div><Head>
    <title>Print TO Driver</title> {/* Set the title here */}
  </Head>
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
          <div className="md:grid md:grid-cols-12">
            <div className="mt-5 md:mt-0 md:col-span-12">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
              <table style={{width:'100%'}} className="border-collapse">
            
                <tbody>
                
                <tr>
                        <th className="custom-colspan-half "></th>
                        <th colSpan={2}>
                        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                          
                            <div style={{ marginRight: '10px' }}>
                              
                                <Image
                                    src={bp}
                                    alt="Picture of the author"
                                    width={70}
                                    height={70}
                                />
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
                </tbody>
              </table>


              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0 py-5">
              
              <table style={{width:'100%'}} className="border-t-2 border-r-2 border-l-2 border-gray-900 ...">
                <thead>
                  <tr>
                    <th colSpan={2}><h1><u><p className="font-sans ... text-xl ... py-2">TRAVEL ORDER</p></u></h1></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{width: '75%'}}><p className="text-right ... font-sans ... text-xs12">T.O. No:</p></td>
                    <td style={{width: '25%'}}>
                      <div className="border-b border-gray-900">
                        <label htmlFor="username" className="text-transparent">.</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><p className="text-right ... font-sans ... text-xs12">Date:</p></td>
                    <td>
                      <div className="border-b border-gray-900">
                        <label htmlFor="username" className="text-transparent">.</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{height:'40px'}} colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
              <table style={{width:'100%'}} className="border-r-2 border-l-2 border-gray-900 ...">
                <tbody>
                  <tr>
                    <td style={{width: '15%'}} className="align-top ... font-sans ... text-xs12">NAME:</td>
                    <td style={{width: '45%'}} className="align-top ... font-sans ... text-xs12"><b><u>{result.trip_ticket.driver.name.toUpperCase()}</u></b></td>

                    <td style={{width: '20%'}} className="align-top ... font-sans ... text-xs12">Salary per Month:</td>
                    <td style={{width: '20%'}} className="align-top ... font-sans ...  text-xs12">
                      <div className="border-b border-gray-900">
                        <label htmlFor="username">₱</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">POSITION:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>{result.trip_ticket.driver.position}</u></td>

                    <td className="align-top ... font-sans ... text-xs12">Office Station:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>DA- Caraga</u></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">Departure:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>{moment(result.date_from).format('LL')}</u></td>

                    <td className="align-top ... font-sans ... text-xs12">Return:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>{moment(result.date_to).format('LL')}</u></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">Destination:</td>
                    <td colSpan ={4} className="align-top ... font-sans ... text-xs12"><u>{result.trip_ticket.destination}</u></td>
                  </tr>
                </tbody>
              </table>
              <table style={{width:'100%'}} className="border-r-2 border-l-2 border-gray-900 ...">
                <tbody>
                  <tr>
                    <td style={{width: '30%'}} className="align-top ... font-sans ... text-xs12">Specific Purpose of the Trip:</td>
                    <td style={{width: '70%'}} className="align-top ... font-sans ... text-xs12"><u>{result.trip_ticket.purpose}</u></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">Objective(s):</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>To drive safely and efficiently with accuracy to respective destination</u></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">Per Diems Allowed:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>Yes</u></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12">Assistant Laborers:</td>
                    <td className="align-top ... font-sans ... text-xs12"><u>None</u></td>
                  </tr>
                </tbody>
              </table>
              <table style={{width:'100%'}} className="border-r-2 border-l-2 border-gray-900 ...">
                <tbody>
                  <tr>
                    <td style={{width: '35%'}} className="align-top ... font-sans ... text-xs12">Appropriation to which travel should be charged:</td>
                    <td style={{width: '65%'}} className="align-top ... font-sans ... text-xs12"><u>Umbrella Corporation</u></td>
                  </tr>
                </tbody>
              </table>
              <table style={{width:'100%'}} className="border-r-2 border-l-2 border-gray-900 ...">
                <tbody>
                  <tr>
                    <td style={{width: '30%'}} className="align-top ... font-sans ... text-xs12">Remarks or Special Instructions:</td>
                    <td style={{width: '70%'}} className="align-top ... font-sans ... text-xs12">
                    <div className="border-b border-gray-900">
                        <label htmlFor="username" className="text-transparent">.</label>
                      </div>  
                      <div className="border-b border-gray-900">
                        <label htmlFor="username" className="text-transparent">.</label>
                      </div>  
                      <div className="border-b border-gray-900">
                        <label htmlFor="username" className="text-transparent">.</label>
                      </div>       
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{width:'100%'}} className="border-r-2 border-l-2 border-gray-900 ...">
                <tbody>
                  <tr>
                    <td style={{width: '50%', height:'60px'}} className="align-top ..."></td>
                    <td style={{width: '50%'}} className="align-top ..."><b></b></td>
                  </tr>
                  <tr>
                    <td style={{height:'60px'}} className="align-top ... font-sans ... text-xs12"><b>Recommending:</b></td>
                    <td className="align-top ... font-sans ... text-xs12"><b>Approved:</b></td>
                  </tr>
                  <tr>
                    <td className="align-top ... font-sans ... text-xs12"><b>{result.recommending.toUpperCase()}</b></td>
                    <td className="align-top ... font-sans ... text-xs12"><b>{result.approval.toUpperCase()}</b></td>
                  </tr>
                  <tr>
                    <td className="italic align-top ... font-sans ... text-xs12">{result.pos_recommending}</td>
                    <td className="italic align-top ... font-sans ... text-xs12">{result.pos_approval}</td>
                  </tr>
                </tbody>
              </table>


              <div className="border-r-2 border-l-2 border-gray-900 ... py-1"></div>

              <table style={{width:'100%'}} className="border-b-2 border-l-2 border-r-2 border-t border-gray-900 py-5 ...">
                
                <thead>
                  <tr>
                    <th className="border-b border-r border-t border-gray-900 ... font-sans ... text-xs12"><h1>DATE</h1></th>
                    <th className="border-b border-r border-t border-gray-900 ... font-sans ... text-xs12"><h1>PLACES VISITED</h1></th>
                    <th className="border-b border-r border-t border-gray-900 ... font-sans ... text-xs12"><h1>PURPOSE</h1></th>
                    <th className="border-b border-r border-t border-gray-900 ... font-sans ... text-xs12"><h1>CERTIFYING OFFICER</h1></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{height:'220px'}} className="border-b border-r border-t border-gray-900 ... font-sans ..."><b><u></u></b></td>
                    <td className="border-b border-r border-t border-gray-900 ... font-sans ..."><b><u></u></b></td>
                    <td className="border-b border-r border-t border-gray-900 ... font-sans ..."><b><u></u></b></td>
                    <td className="border-b border-r border-t border-gray-900 ... font-sans ..."><b><u></u></b></td>
                  </tr>
                </tbody>
              </table>
              <div className="pb-3 print:hidden"></div>
            </div>
          </div></div></div>
        </div>
      </div></div></div>
 );
};

export default Print_TravelOrder;

export async function getServerSideProps(context) {
 const { params } = context;
 const id = params.id;
 const prisma = new PrismaClient()
 const result = await prisma.travel_order.findUnique({
    where: { id: Number(id) },
    include: {
      trip_ticket: {
        select: {
          purpose: true,
          driver: true,
          destination: true,
        }
      }
    }
 })

 result.date_from = moment(result.date_from).utc().format('YYYY-MM-DD')
 result.date_to = moment(result.date_to).utc().format('YYYY-MM-DD')
 result.date_time_created = moment(result.date_time_created).utc().format()

 return {
    props: { result }
 }
}
