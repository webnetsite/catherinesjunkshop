import React, { useState } from 'react';
import Layout from "../components/Layout";
import MUIDataTable from "mui-datatables";
import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const ListVehicle = ({vehicles}) => {
 const [modalOpen, setModalOpen] = useState(false);
 const [modalMessage, setModalMessage] = useState('');

 const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
 };

 const closeModal = () => {
    setModalOpen(false);
    if (modalMessage === 'Data Deleted') {
      router.push('/list_vehicle');
    }
 };
 

 const metaInfo = {
    title: "Vehicle",
 };

 const router = useRouter();

 const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
 });

 const options = {
    onRowsDelete: async (e) => {
      let index = e.data[0].dataIndex;
      const endpoint = `/api/vehicles/${vehicles[index].id}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if(result.success) {
        showModal('Data Deleted');
      } else {
        showModal('Something Wrong');
      }
    },
    selectableRows: 'multiple',
    print: false,
    customToolbar: () => {
      return (
        <Link className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2 rounded"
          href={`/vehicle/addVehicle`} replace>
          Add
        </Link>
      );
    }
 };

 const columns = [
    {name: "plate_number", label: "Plate Number"},
    {name: "make", label: "Vehicle"},
    {name: "type", label: "Type"},
    {name: "division_ass", label: "Office"},
    {
       name: "Edit",
       options: {
         filter: false,
         sort: false,
         empty: true,
         customBodyRenderLite: (dataIndex, rowIndex) => {
           return (
             <Link className="shadow bg-cyan-700 hover:bg-cyan-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
               href={`/vehicle/${vehicles[dataIndex].id}`} replace>
               Edit
             </Link>
           );
         }
       }
    }
 ];

 return (
    <Layout metaInfo={metaInfo}>
      <div className="w-full h-full w-screen mx-auto px-4 sm:px-6 lg:px-8 m-4 p-4">
        <MUIDataTable
          title={"Vehicles"}
          data={vehicles}
          columns={columns}
          options={options}
        />
        {modalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                 <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Message
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {modalMessage}
                        </p>
                      </div>
                    </div>
                 </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                 <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                    Close
                 </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
 );
};

export default ListVehicle;

export const getServerSideProps = async () => {
 const prisma = new PrismaClient();
 const vehicles = await prisma.vehicle.findMany();
 return { props: { vehicles } };
};
