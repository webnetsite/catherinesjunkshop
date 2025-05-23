import Layout from "../components/Layout";
import MUIDataTable from "mui-datatables";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useState } from 'react';

const ListTripTicket = ({tickets}) => {
 const metaInfo = {
    title: "Trip Ticket",
 };

 const router = useRouter();

 const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
 })

 // State for modal visibility and content
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalContent, setModalContent] = useState("");

 const options = {
    onRowsDelete: async (e) => {
      let index = e.data[0].dataIndex
      const endpoint = `/api/tt/${tickets[index].ticket_id}`
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      if(result.success) {
        setModalContent("Data Deleted");
        setIsModalOpen(true);
      } else {
        setModalContent("Something Wrong");
        setIsModalOpen(true);
      }
    },
    selectableRows: 'multiple',
    print: false,
    customToolbar: () => {
      return (
        <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2 rounded"
          href={`/trip_ticket/addTT`} replace>
          Add
        </Link>
      );
    }
 }

 const columns = [
  {name: "ticket_id", label: "Trip Ticket No."},
  {name: "driver", label: "Driver"},
  {name: "alternatedriver", label: "Alternate Driver"},
  {name: "date_from", label: "Date From"},
  {name: "date_to", label: "Date To"},
  {name: "vehicle_id", label: "Plate Number", options: { display: false }},
  {name: "destination", label: "Destination"},
  {name: "purpose", label: "Purpose of Travel"},
  {
     name: "Actions",
     options: {
       filter: false,
       sort: false,
       empty: true,
       customBodyRenderLite: (dataIndex, rowIndex) => {
         return (
           <div style={{ minWidth: '200px' }}> {/* Adjust the width as needed */}
             <ul className="list-none p-0">
               <li className="mb-4"> {/* Adjust the spacing as needed */}
                 <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  href={`/print_trip_ticket/${tickets[dataIndex].ticket_id}`} replace>
                  Print
                 </Link>
               </li>
               <li className="mb-4"> {/* Adjust the spacing as needed */}
                 <Link className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  href={`/travel_order/addTO/${tickets[dataIndex].ticket_id}`} replace>
                  Add Travel Order
                 </Link>
               </li>
               <li className="mb-4"> {/* Adjust the spacing as needed */}
                 <Link className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  href={`/issuance/addIS/${tickets[dataIndex].ticket_id}`} replace>
                  Add Issuance Slip
                 </Link>
               </li>
               <li className="mb-4"> {/* Adjust the spacing as needed */}
                 <Link className="shadow bg-cyan-700 hover:bg-cyan-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  href={`/trip_ticket/${tickets[dataIndex].ticket_id}`} replace>
                  Edit
                 </Link>
               </li>
             </ul>
           </div>
         );
       }
     }
  }
 ];

 const closeModal = () => {
  setIsModalOpen(false);
  router.push('/list_trip_ticket');
}

 return (
    <Layout metaInfo={metaInfo}>
      <div className="w-full h-full w-screen mx-auto px-4 sm:px-6 lg:px-8 m-4 p-4">
        <MUIDataTable
          title={"Trip Tickets"}
          data={tickets}
          columns={columns}
          options={options}
        />
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {modalContent}
                    </h3>
                 </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                 Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
 );
};

export default ListTripTicket;

export const getServerSideProps = async () => {
 const prisma = new PrismaClient()
 const posts = await prisma.$queryRaw`SELECT trip_ticket.ticket_id as ticket_id, trip_ticket.date_from as date_from, trip_ticket.date_to as date_to, 
 vehicle.plate_number as plate_number, trip_ticket.destination as destination, trip_ticket.purpose as purpose,
 driver.name as driver, driver1.name as alternatedriver, trip_ticket.approving_officer as approving_officer,
 trip_ticket.pos1 as pos1, trip_ticket.pass1 as pass1, trip_ticket.pass2 as pass2, trip_ticket.pass3 as pass3
 FROM trip_ticket
 LEFT JOIN vehicle as vehicle
 ON
 trip_ticket.vehicle_id = vehicle.id
 LEFT JOIN driver
 ON
 trip_ticket.driver_id = driver.id
 LEFT JOIN driver as driver1
 ON
 trip_ticket.alternatedriver_id = driver1.id
 ORDER BY trip_ticket.date_time_created DESC;`
 posts.map((item)=> {
   item.date_from = moment(item.date_from).utc().format('YYYY-MM-DD')
   item.date_to = moment(item.date_to).utc().format('YYYY-MM-DD')
 })
 let tickets = posts;
 return { props: { tickets } }
}
