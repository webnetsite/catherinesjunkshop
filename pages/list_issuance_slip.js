import Layout from "../components/Layout";
import MUIDataTable from "mui-datatables";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useState } from 'react';

const ListTripTicket = ({issuance}) => {
 const metaInfo = {
    title: "Issuance Slip",
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
     let index = e.data[0].dataIndex;
     const endpoint = `/api/is/${issuance[index].id}`;
     const options = {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
       },
     };
     const response = await fetch(endpoint, options);
     const result = await response.json();
     // Check if result is not null before accessing its properties
     if (result && result.success) {
       setModalContent("Data Successfully Deleted");
       setIsModalOpen(true);
     } else {
       setModalContent("Something Wrong");
       setIsModalOpen(true);
     }
  },
  selectableRows: 'multiple',
  print: false
 };
 

 const columns = [
    {name: "id", label: "Control No."},
    {name: "ticket_id", label: "Trip Ticket"},
    {name: "charging", label: "Charging"},
    {name: "charge_to", label: "Charge To"},
    {name: "date_req", label: "Date Request"},
    {name: "consumableproduct", label: "Consumable Product"},
    {name: "liters", label: "Liters (L)"},
    {name: "req_officer", label: "Requisitioning Officer"},
    {name: "vehicle", label: "Vehicle Plate No."},
    {name: "driver", label: "Driver"},
    {name: "prepared", label: "Prepared"},
    {name: "approved", label: "Approved"},
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded"
                href={`/print_issuance_slip/${issuance[dataIndex].id}`} replace>
                Print
              </Link>
              <br></br> <br></br>
              <Link className="shadow bg-cyan-700 hover:bg-cyan-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded"
                href={`/issuance/${issuance[dataIndex].id}`} replace>
                Edit
              </Link>
            </>
          );
        }
      }
    }
 ];

 const closeModal = () => {
  setIsModalOpen(false);
  router.push('/list_issuance_slip');
}

 return (
    <Layout metaInfo={metaInfo}>
      <div className="w-full h-full w-screen mx-auto px-2 sm:px-2 lg:px-8 p-4 m-4">
        <MUIDataTable
          title={"Fuel/Oil Issuance List"}
          data={issuance}
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
 const prisma = new PrismaClient();
 let issuance = await prisma.issuance_slip.findMany();

 // Convert Date objects to string representations
 issuance = issuance.map((item) => ({
    ...item,
    date_req: moment(item.date_req).utc().format("YYYY-MM-DD"),
    date_time_created: moment(item.date_time_created).utc().format(),
 }));

 // Sort the issuance list by date_time_created in ascending order
 issuance.sort((a, b) => moment(a.date_time_created) - moment(b.date_time_created));

 return { props: { issuance } };
}
