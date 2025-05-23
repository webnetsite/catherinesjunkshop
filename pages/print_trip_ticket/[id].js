
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Image from 'next/image'
import bp from '../../public/images/BP.png'
import Link from 'next/link';
import Head from 'next/head';




const Print_TripTicket = ({result}) => {
  const metaInfo = {
    title: "Vehicle Management Inofrmation System"
  };

  function handlePrint() {
    window.print()
 }

  return (
    <div>
      <Head>
      <title>Print Trip Ticket</title> {/* Set the title here */}
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
          <div className="w-full px-3 mb-6 md:mb-0 px-4">
          <div className="md:grid md:grid-cols-12">
            <div className="mt-5 md:mt-0 md:col-span-12">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                <table style={{width:'100%'}} className="border-collapse">
                    <thead >
                      <tr>
                        <th className="align-top ... text-left border-t-2 border-x-2 border-gray-900" style={{width:'6%'}} >FORM A</th>
                      </tr>
                    </thead>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                    <thead >
                    <tr className="border-x-2 border-gray-900">
                        <th colSpan={2}>
                        <div style={{ display: 'flex', marginLeft: '170px', alignItems: 'left', justifyContent: 'left' }}>
                          
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
                    </thead>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                    <tbody>
                      <tr className="border-x-2 border-gray-900">
                        <td colSpan={2} style={{height:'10px'}}></td>
                      </tr>
                      <tr className="border-x-2 border-gray-900">
                        <td colSpan={2} className=""><p className="text-center ... font-sans ... text-xl"><b>DRIVER&apos;S TRIP TICKET</b></p></td>
                      </tr>
                      <tr className="border-x-2 border-gray-900">
                        <td style={{width:'70%'}} className=""><p className="text-right ... font-sans ... text-xs12">Control No.:</p></td>
                        <td style={{width:'35%'}} className="align-top ... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <label htmlFor="username" className="text"><b>{result[0].ticket_id}</b></label>
                            </div>
                        </td>
                      </tr>
                      
                      <tr className="border-x-2 border-gray-900">
                        <td style={{width:'70%'}} className=""><p className="text-right ... font-sans ... text-xs12">Date:</p></td>
                        <td style={{width:'30%'}} className="align-top ... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <input
                                type="text"
                                defaultValue={
                                  result[0].date_from !== result[0].date_to ? (
                                    result[0].date_range
                                  ) : result[0].date_from === result[0].date_to ? (
                                    moment(result[0].date_from).format('LL')
                                  ) : ''
                                }
                                className=""
                                style={{ width: '740px' }} // Adjust the width as needed
                                
                              />
                            </div>
                        </td>
                        </tr>


                      
                      <tr className="border-x-2 border-gray-900">
                        <td colSpan= {2} style={{height:'50px'}} className=""></td>
                      </tr>
                    </tbody>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                    <tbody>
                        <tr className="border-x-2 border-gray-900">
                          <td style={{width:'30%'}} className="... font-sans ... text-xs12">NAME OF DRIVER:</td>
                          <td style={{width:'70%'}} className="... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <label htmlFor="username"><b>{result[0].driver.toUpperCase()}</b></label>
                            </div>
                          </td>
                       </tr>
                       <tr className="border-x-2 border-gray-900">
                       {
                        result[0].alternatedriver != "N/A"  &&
                          <>
                            <td style={{ width: '30%' }} className="... font-sans ... text-xs12">ALTERNATE DRIVER:</td>
                            <td style={{ width: '70%' }} className="... font-sans ... text-xs12">
                              <div className="border-b border-gray-900">
                                <label htmlFor="username" className="text">
                                    <b>{result[0].alternatedriver.toUpperCase()}</b>
                                </label>
                              </div>
                           </td>
                          </>
                        }
                       </tr>
                        <tr className="border-x-2 border-gray-900">
                          <td className="... font-sans ... text-xs12">VEHICLE PLATE NO.:</td>
                          <td className="... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <label htmlFor="username" className="">{result[0].vehicle_id}</label>
                            </div>
                          </td>
                       </tr>
                       <tr className="border-x-2 border-gray-900">
                          <td className="... font-sans ... text-xs12">DATE OF TRAVEL:</td>
                          <td className="... font-sans ... text-xs12">
                              <input
                                  type="text"
                                  defaultValue={result[0].date_from !== result[0].date_to ? result[0].date_range : moment(result[0].date_from).format('LL')}
                                  onBlur={(e) => {
                                      const newValue = e.target.value;
                                      // handle onBlur event here
                                  }}
                                  className="border-b border-gray-900"
                                  style={{ width: '740px' }} // Adjust the width as needed
                              />
                          </td>
                      </tr>



                       <tr className="border-x-2 border-gray-900">
                          <td className="... font-sans ... text-xs12">DESTINATION:</td>
                          <td className="... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <label htmlFor="username" className="">{result[0].destination}</label>
                            </div>
                          </td>
                       </tr>
                        <tr className="border-x-2 border-gray-900">
                          <td className="align-top ... font-sans ... text-xs12">Specific Purpose of the Trip:</td>
                          <td className="align-top ... font-sans ... text-xs12">
                            <div className="border-b border-gray-900">
                              <label htmlFor="username" className=""><i>{result[0].purpose}</i></label>
                            </div>
                          </td>
                       </tr>
                       <tr className="border-x-2 border-gray-900">
                          <td style={{height:'10px'}} className="align-top ... font-sans ... text-xs12"></td>
                       </tr>
                    </tbody>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                    <thead></thead>
                    <tbody>
                       <tr className="border-x-2 border-gray-900">
                          <td  style={{width:'60%'}} className=" ... text-left font-sans ... text-xs12"><b></b></td>
                          <td  style={{width:'40%',height:'50px'}} className=" align-top ... text-left font-sans ... text-xs12"><b>Approved:</b></td>
                       </tr>
                       <tr className="border-x-2 border-gray-900">
                          <td  style={{width:'60%'}} className=" ... text-left font-sans ... text-xs12"><b></b></td>
                          <td style={{ width: '40%', textTransform: 'uppercase' }} className="... text-left font-sans ... text-xs12">
  <b>{result[0].approving_officer}</b>
</td>
                       </tr>
                       <tr className="border-x-2 border-b border-gray-900">
  <td style={{ width: '60%' }} className="... text-left font-sans ... text-xs12">
    <b></b>
  </td>
  <td style={{ width: '40%' }} className="italic text-left font-sans ... text-xs12 pb-10">
    {result[0].pos1}
  </td>
</tr>

                    </tbody>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                    <thead>
                    </thead>
              
                    <tbody>
                      <tr className="border-x-2  border-gray-900">
                      
                        <td colSpan={2} style={{height:'10px'}}  className="align-bottom  ... text-center ... font-sans ... text-xs12"><b>ITINERARY OF TRIP & STATEMENT OF FUEL CONSUMPTION</b></td>
                      </tr>
                      <tr className="border-x-2  border-gray-900">
                        <td colSpan={2} style={{height:'10px'}}  className="align-top ... text-center ... font-sans ... text-xxs">(To be filled by the Driver)</td>
                      </tr>
                    </tbody>
                </table>
                <table style={{width:'100%'}} className="border-collapse">
                      <thead>
                          <tr>
                            <th colSpan={2} style={{width:'50%'}} className="border border-l-2  border-gray-900 ... text-center font-sans ... text-xs12">Departure</th>
                            <th colSpan={2} style={{width:'50%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12">Arrival</th>
                          </tr>
                          <tr>
                            <th style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12">Date/Time</th>
                            <th style={{width:'25%'}} className="border  border-gray-900 ... text-center font-sans ... text-xs12">Odometer Reading</th>
                            <th style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12">Date/Time</th>
                            <th style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12">Odometer Reading</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                          <tr>
                            <td style={{width:'25%'}} className="border border-l-2 border-gray-900 ... text-center font-sans ... text-xs12 text-transparent">.</td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-gray-900 ... text-center font-sans ... text-xs12"></td>
                            <td style={{width:'25%'}} className="border border-r-2 border-gray-900 ... text-center font-sans ... text-xs12"></td>
                          </tr>
                      </tbody>
                </table>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 pl-3 mb-6 md:mb-0">
                      <table style={{width:'100%'}} className="border-collapse">
                          <thead></thead>
                          <tbody>
                            <tr className="border-l-2 border-gray-900">
                                <td style={{width:'50%'}} className="font-sans ... text-xs12">Balance in Tank</td>
                                <td style={{width:'25%'}} className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td style={{width:'25%'}} className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Issued by Regional Office</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Purchased during the trip by the end - user/ driver</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12"><b>TOTAL</b></td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Used during the trip</td>
                                <td className="...font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Balance in tank</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Brake fluid used</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Gear oil used</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Lubricants oil used</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            <tr className="border-l-2 border-gray-900">
                                <td className="font-sans ... text-xs12">No. of Kilometers</td>
                                <td className="font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            
                            <tr className="border-l-2 border-b-2 border-gray-900">
                                <td className="font-sans ... text-xs12">Speedometer Reading</td>
                                
                                <td className="...font-sans ... text-xs12">
                                  <div className="border-b border-gray-900">
                                    <label htmlFor="username" className="text-transparent">.</label>
                                  </div>
                                </td>
                                <td className="font-sans ... text-xs12">liters</td>
                            </tr>
                            
                          </tbody>
                      </table>
                    </div> 
                    <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0"> 
                      <table style={{width:'100%'}} className="border-collapse">
                        <thead></thead>
                        <tbody>
                          <tr className="border-r-2 border-l border-gray-900">
                                <td style={{height:'50px'}} colSpan={2} className="">
                                  <b className="font-sans ... text-xs12"><center>Certification of Passenger/s</center></b>
                                  <p className="font-sans ...">This is  to that I/we used the above stated vehicle htmlFor the purpose stated herein and that the trip was purely on official</p>
                                </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{width:'100%'}} className="border-collapse">
                        <thead>
                          <tr className="border-r-2 border-l border-gray-900">
                            <th className="font-sans ... text-xs12">Passengers Printed Name</th>
                            <th className="font-sans ... text-xs12">Signature</th>
                          </tr>
                        </thead>
                        <tbody>
                        {['pass1', 'pass2', 'pass3', 'pass4', 'pass5', 'pass6', 'pass7'].map((pass, index) => (
                            <tr key={index} className="border-r-2 border-l border-gray-900">
                              <td style={{width:'65%'}} className="text-left font-sans ... text-xs12">
                                {result[0][pass] !== "" 
                                  ? <div className="border-b border-gray-900" style={{minHeight: '20px'}}>
                                      <label htmlFor="username" className="">{result[0][pass]}</label>
                                    </div>
                                  : <div className="border-b border-gray-900" style={{minHeight: '20px'}}>
                                      <label htmlFor="username" className="text-transparent">.</label>
                                    </div>
                                }
                              </td>
                              <td style={{width:'35%'}} className="text-left font-sans ... text-xs12">
                                <div className="border-b border-gray-900" style={{minHeight: '20px'}}>
                                  <label htmlFor="username" className="text-transparent">.</label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        <tr className="border-r-2 border-b-2 border-l border-gray-900">
                            <td style={{width:'65%'}} className="text-center font-sans ... text-xs12">
                              <div className="border-b border-gray-100" style={{minHeight: '20px'}}>
                                <label htmlFor="username" className="text-transparent">.</label>
                              </div>
                            </td>
                            <td style={{width:'35%'}} className="text-center font-sans ... text-xs12">
                              <div className="border-b border-gray-100" style={{minHeight: '20px'}}>
                                <label htmlFor="username" className="text-transparent">.</label>
                              </div>
                            </td>
                        </tr>
                        
                        </tbody>

                      </table>
                    </div> 
                  </div>
                  <table style={{width:'100%'}} className="border-collapse">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} style={{height:'60px'}}  className="align-top  ... text-left ... font-sans ... text-xs12"><b>I HEREBY CERTIFY</b> to the correctness of the above statement of record of travel.</td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{width:'100%'}} className="border-collapse">
                    <thead></thead>
                    <tbody>
  <tr>
    <td style={{ width: '30%' }} className="... text-center font-sans ... text-xs12">
      <b></b>
    </td>
    <td style={{ width: '70%', textTransform: 'uppercase' }} className="... text-center font-sans ... text-xs12">
      <b>{result[0].driver}</b>
    </td>
  </tr>
  <tr>
    <td style={{ width: '30%' }} className="... text-center font-sans ... text-xs12">
      <b></b>
    </td>
    <td style={{ width: '70%' }} className="italic text-center font-sans ... text-xs12">
      {result[0].position}
    </td>
  </tr>
</tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Print_TripTicket;

export async function getServerSideProps(context) {
  const { params } = context;
  const ticket_id = params.id;
    const prisma = new PrismaClient()
    const result= await prisma.$queryRaw`SELECT trip_ticket.approving_officer as approving_officer,trip_ticket.pass1 as pass1,trip_ticket.pass2 as pass2, trip_ticket.pass3 as pass3, trip_ticket.pass4 as pass4, trip_ticket.pass5 as pass5, trip_ticket.pass6 as pass6, trip_ticket.pass7 as pass7,
        trip_ticket.pos1 as pos1,trip_ticket.ticket_id as ticket_id,driver.name as driver, driver.position as position, alternatedriver.name as alternatedriver,
        vehicle.plate_number as vehicle_id, trip_ticket.destination as destination, trip_ticket.purpose as purpose,
        trip_ticket.date_from as date_from, trip_ticket.date_to as date_to
        FROM trip_ticket 
        LEFT JOIN driver ON
        driver.id = trip_ticket.driver_id
        LEFT JOIN driver as alternatedriver
        ON
        alternatedriver.id = trip_ticket.alternatedriver_id
          LEFT JOIN vehicle
          ON
          vehicle.id = trip_ticket.vehicle_id
          where trip_ticket.ticket_id = ${ticket_id}
    `
    // Assuming result[0]is an array of objects
    result.forEach((row) => {
      row.date_from = new Date(row.date_from).toLocaleDateString();
      row.date_to = new Date(row.date_to).toLocaleDateString();
    });
    // Assuming result[0]is an array of objects
      result.forEach((row) => {
        const fromDate = moment(row.date_from);
        const toDate = moment(row.date_to);

        if (fromDate.isSame(toDate, 'month')) {
          row.date_range = `${fromDate.format('MMMM D')}-${toDate.format('D, YYYY')}`;
        } else {
          row.date_range = `${fromDate.format('MMMM D')}-${toDate.format('MMMM D, YYYY')}`;
        }
      });
    return {
      props : { result}
    }
  }