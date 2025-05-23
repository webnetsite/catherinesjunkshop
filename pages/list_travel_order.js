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
    title: "Travel Order",
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
      const endpoint = `/api/to/${tickets[index].id}`
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
    print: false
 }

 const columns = [
    {name: "id", label: "ID", options: { display: false }},
    {name: "ticket_id", label: "Trip Ticket No."},
    {name: "driver", label: "Driver"},
    {name: "alternatedriver", label: "Alternate Driver"},
    {name: "vehicle_id", label: "Plate Number"},
    {name: "date_from", label: "Date From"},
    {name: "date_to", label: "Date To"},
    {name: "destination", label: "Destination"},
    {name: "purpose", label: "Purpose of Travel"},
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Link className="shadow bg-cyan-700 hover:bg-cyan-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              href={`/travel_order/${tickets[dataIndex].id}`} replace>
              Edit
            </Link>
          );
        }
      }
    },
    {
      name: "Travel Order",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                href={`/print_travel_order/driver/${tickets[dataIndex].id}`} replace>
                Driver
              </Link>
              <br></br> <br></br>
              <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                href={`/print_travel_order/alternatedriver/${tickets[dataIndex].id}`} replace>
                Alternate
              </Link>
            </>
          );
        }
      }
    }
 ];

 const closeModal = () => {
  setIsModalOpen(false);
  router.push('/list_travel_order'); // Redirect to /list_station
}

 return (
    <Layout metaInfo={metaInfo}>
      <div className="w-full h-full w-screen mx-auto px-4 sm:px-6 lg:px-8 p-4 m-4 ">
        <MUIDataTable
          title={"Travel Order"}
          data={tickets}
          columns={columns}
          options={options}
        />
      </div>
      
      {/* Modal Component */}
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
 const posts = await prisma.$queryRaw`SELECT travel_order.id as id,travel_order.tt_id as ticket_id, travel_order.date_from as date_from, travel_order.date_to as date_to, 
 travel_order.recommending as recommending, travel_order.approval as approval, travel_order.pos_recommending as pos_recommending,
 travel_order.pos_approval as pos_approval,driver.name as driver, alternatedriver.name as alternatedriver,
 vehicle.plate_number as vehicle_id, trip_ticket.destination as destination, trip_ticket.purpose as purpose
 FROM travel_order
 LEFT JOIN trip_ticket
 ON
 travel_order.tt_id = trip_ticket.ticket_id
 LEFT JOIN driver
 ON
 driver.id = trip_ticket.driver_id
 LEFT JOIN driver as alternatedriver
 ON
 alternatedriver.id = trip_ticket.alternatedriver_id
 LEFT JOIN vehicle
 ON
 vehicle.id = trip_ticket.vehicle_id
 ORDER BY travel_order.date_time_created DESC
 `
  
 posts.map((item)=> {
    item.date_from = moment(item.date_from).utc().format('YYYY-MM-DD')
    item.date_to = moment(item.date_to).utc().format('YYYY-MM-DD')
 })
 let tickets = posts;
 return { props: { tickets } }
}
