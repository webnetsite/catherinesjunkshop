import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { useRouter } from 'next/router';

const AddDriver = () => {
 const metaInfo = {
    title: "Add Vehicle"
 };

 const router = useRouter();

 const [formData, setFormData] = useState({
    name: ""
 });

 // State for modal visibility and content
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalContent, setModalContent] = useState("");

 const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
 }

 const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const data = {
        name: formData.name,
    }
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/fund_source/add_fund';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if(result.success) {
      setModalContent("Data Added Successfully");
      setIsModalOpen(true);
      
    } else {
      setModalContent("Data Added Successfully");
      setIsModalOpen(true);
    }
 }

 useEffect(() => {
    router.prefetch('/list_fundsource');
 }, [router]);

 const closeModal = () => {
    setIsModalOpen(false);
    router.push('/list_fundsource');
 }

 return (
    <Layout metaInfo={metaInfo}>
      <div className="flex justify-center my-4 py-10">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
<div className="w-full  px-3 mb-6 md:mb-0">
  <label
    className="block tracking-wide text-gray-700 text-xs mb-2"
    htmlFor="Plate Number"
  >
    Fund Source Name
  </label>
  <input
    className="appearance-none block w-full  text-blue-700 bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    id="name" name="name" 
    type="text" value={formData.name} onChange={handleInput}/>

</div>

</div>

<div className="md:flex md:items-center">
<div className="md:w-1/3">
<button
    className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    type="submit"
  >
    Save
  </button>
  

</div>
<div className="md:w-2/3"></div>
</div>
        </form>
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

export default AddDriver;
