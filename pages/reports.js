import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Image from 'next/image'
import bp from '../public/images/BP.png'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const Reports = ({tickets}) => {
 const router = useRouter();
 const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
 })
 if (status === "unauthenticated") {
    return "Loading or not authenticated..."
 }
 function handlePrint() {
    window.print()
 }

 return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      
      <div className="flex items-center p-3 flex-wrap text-white bg-blue-700 print:hidden">
        <Link href="/">
          <button className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800 print:hidden flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>Home
          </button>
        </Link>

        <button onClick={handlePrint} className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800 print:hidden flex items-center">
          <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
            <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
          </svg>Print
        </button>
      </div>

      <div className="py-2 print:hidden"></div>
      <div className="px-3">
        <div className="flex flex-col sm:p-3">
          <table className="table-auto mt-8 sm:p-3"></table>
          <div className="mx-auto sm:p-3">
            <div className="flex items-center justify-center">
              <div className="mr-4">
                <Image
                 src={bp}
                 alt="Picture of the author"
                 width={70}
                 height={70} />
              </div>
              <div className="text-center">
                <div className="text-sm font-serif font-normal">
                 United States of America
                </div>
                <div className="font-serif font-bold">
                 UMBRELLA CORPORATION
                </div>
                <div className="text-sm font-serif font-normal">
                 545 S Birdneck RD STE 202B
                </div>
                <div className="text-sm font-serif font-normal">
                 Virginia Beach, VA 23451
                </div>
              </div>
            </div>
          </div>
          <table className="table-auto mt-8 "></table>
          <h2 className="text-left text-2xl font-bold indent-[47%]">Trip Ticket and Travel Summary</h2>
          <table className="table-auto mt-8 ">
            <thead>
              <tr>
                <th className={"border border-gray-800"}>Trip No.</th>
                <th className={"border border-gray-800"}>Date</th>
                <th className={"border border-gray-800"}>Plate No.</th>
                <th className={"border border-gray-800"}>Driver</th>
                <th className={"border border-gray-800"}>Destination</th>
                <th className={"border border-gray-800"}>Purpose of Travel</th>
                <th className={"border border-gray-800"}>Passenger/s</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => <tr key={i.ticket_id}>
                <td className={"border border-gray-500"}> {t.ticket_id} </td>
                <td className={"border border-gray-500"}> {t.date_from} - {t.date_to} </td>
                <td className={"border border-gray-500"}> {t.vehicle?.plate_number} </td>
                <td className={"border border-gray-500"}> {t.driver?.name} </td>
                <td className={"border border-gray-500"}> {t.destination} </td>
                <td className={"border border-gray-500"}> {t.purpose} </td>
                <td className={"border border-gray-500"}>
                {t.pass1 && `${t.pass1}${t.pass2 ? ', ' : ''}${t.pass2 || ''}${t.pass3 ? ', ' : ''}${t.pass3 || ''}${t.pass4 ? ', ' : ''}${t.pass4 || ''}${t.pass5 ? ', ' : ''}${t.pass5 || ''}${t.pass6 ? ', ' : ''}${t.pass6 || ''}${t.pass7 ? ', ' : ''}${t.pass7 || ''}`}
                </td>


              </tr>
              )}
            </tbody>
          </table>
          <div className="pb-3 print:hidden"></div>
        </div>
      </div>
    </>
 );
};

export default Reports;

export const getServerSideProps = async () => {
 const prisma = new PrismaClient();
 const posts = await prisma.trip_ticket.findMany({
  include: {
    vehicle: {
      select: {
        plate_number: true,
      },
    },
    driver: {
      select: {
        name: true,
      },
    },
  },
});

 posts.forEach((item) => {
    item.date_from = moment(item.date_from).utc().format('YYYY-MM-DD');
    item.date_to = moment(item.date_to).utc().format('YYYY-MM-DD');
    item.date_time_created = moment(item.date_time_created).utc().format(); // Corrected line
 });

 posts.sort((a, b) => moment(a.date_time_created) - moment(b.date_time_created));

 let tickets = posts;
 return { props: { tickets } };
}
