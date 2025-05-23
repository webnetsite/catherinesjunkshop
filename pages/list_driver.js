import Layout from "../components/Layout";
import MUIDataTable from "mui-datatables";
import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useState } from 'react';

const ListDriver = ({ drivers }) => {
  const metaInfo = {
    title: "Price List",
  };

  const router = useRouter();
  const { data: session, status } = useSession(); // Do not redirect if unauthenticated

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleDelete = async (index) => {
    const endpoint = `/api/drivers/${drivers[index].id}`;
    const response = await fetch(endpoint, { method: 'DELETE' });
    const result = await response.json();
    setModalContent(result.success ? "Data Deleted" : "Something went wrong");
    setIsModalOpen(true);
  };

  const options = {
    onRowsDelete: session ? async (e) => {
      let index = e.data[0].dataIndex;
      await handleDelete(index);
    } : undefined,
    selectableRows: session ? 'multiple' : 'none',
    print: false,
    customToolbar: () => {
      return session ? (
        <Link
          className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2 rounded"
          href={`/driver/addDriver`} replace>
          Add
        </Link>
      ) : null;
    }
  };

  const columns = [
    { name: "name", label: "Scrap Type" },
    { name: "position", label: "Price per Kilo" },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return session ? (
            <div style={{ width: '20px', textAlign: 'Left' }}>
              <Link
                className="shadow bg-cyan-700 hover:bg-cyan-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                href={`/driver/${drivers[dataIndex].id}`} replace>
                Edit
              </Link>
            </div>
          ) : null;
        }
      }
    }
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/list_driver');
  };

  return (
    <Layout metaInfo={metaInfo}>
      <div className="w-full h-full w-screen mx-auto px-4 sm:px-6 lg:px-8 m-4 p-4">
        <MUIDataTable
          title={"Price List"}
          data={drivers}
          columns={columns}
          options={options}
        />
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {modalContent}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}>
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

export default ListDriver;

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const drivers = await prisma.driver.findMany();
  return { props: { drivers } };
};
