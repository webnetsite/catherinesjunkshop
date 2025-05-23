import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { useRouter } from 'next/router';

const AddStation = () => {
 const metaInfo = {
    title: "Add Gasoline Station"
 };

 const router = useRouter();

 const [formData, setFormData] = useState({
    id: "",
    name: "",
    alias: ""
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
      id: formData.id,
      name: formData.name,
      alias: formData.alias,
    }
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/stations/add_tt';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.success) {
      setModalContent("Data Added Successfully");
      setIsModalOpen(true);
    } else {
      setModalContent("Data Added Successfully");
      setIsModalOpen(true);
    }
 }

 const closeModal = () => {
    setIsModalOpen(false);
    if (modalContent === "Data Added Successfully") {
      router.push('/list_station');
    }
 }

 useEffect(() => {
    router.prefetch('/list_station');
 }, [router]);

 return (
    <Layout metaInfo={metaInfo}>
      <div className="flex justify-center my-4 py-10">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs mb-2"
                htmlFor="station's name"
              >
                Gasoline Station
              </label>
              <select
  className="appearance-none block w-full text-blue-700 bg-gray-200 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="name"
  name="name"
  value={formData.name}
  onChange={handleInput}
  required
>
  <option value="">Select a Gasoline Station</option>
  <option value="Caltex">Caltex</option>
  <option value="Cleanfuel">Cleanfuel</option>
  <option value="Draco Fuel">Draco Fuel</option>
  <option value="Dream Oil">Dream Oil</option>
  <option value="Eastern Petroleum">Eastern Petroleum</option>
  <option value="Echo Fuels">Echo Fuels</option>
  <option value="Enviro Gas">Enviro Gas</option>
  <option value="Eurry Gas Station">Eurry Gas Station</option>
  <option value="FlexFuel">FlexFuel</option>
  <option value="Flying V">Flying V</option>
  <option value="Fuel Express">Fuel Express</option>
  <option value="Fuel Star">Fuel Star</option>
  <option value="Galaxi Petroleum">Galaxi Petroleum</option>
  <option value="Gas N Go">Gas N Go</option>
  <option value="Gasso">Gasso</option>
  <option value="Green Fuel">Green Fuel</option>
  <option value="JACC Gas and Lubricants">JACC Gas and Lubricants</option>
  <option value="Jetti Petroleum">Jetti Petroleum</option>
  <option value="JRG Fuel Hub">JRG Fuel Hub</option>
  <option value="Koop Gas">Koop Gas</option>
  <option value="MaxiFuel">MaxiFuel</option>
  <option value="Metro Oil">Metro Oil</option>
  <option value="NeuPetro">NeuPetro</option>
  <option value="Petro Gazz">Petro Gazz</option>
  <option value="Petron">Petron</option>
  <option value="Phoenix Petroleum">Phoenix Petroleum</option>
  <option value="Platinum Petroleum">Platinum Petroleum</option>
  <option value="Power Fill">Power Fill</option>
  <option value="PTT">PTT</option>
  <option value="Savers Fuel">Savers Fuel</option>
  <option value="Seaoil">Seaoil</option>
  <option value="Shell">Shell</option>
  <option value="SmartGas">SmartGas</option>
  <option value="Sprint">Sprint</option>
  <option value="SR-Marz Fuel">SR-Marz Fuel</option>
  <option value="Star Fuel">Star Fuel</option>
  <option value="Suree Oil">Suree Oil</option>
  <option value="Tiger">Tiger</option>
  <option value="Total Elite">Total Elite</option>
  <option value="TotalEnergies">TotalEnergies</option>
  <option value="Unioil">Unioil</option>
  <option value="Uno Fuel">Uno Fuel</option>
  <option value="Wheel Rider">Wheel Rider</option>
  <option value="Wil Oil">Wil Oil</option>
  <option value="Zeus Gas Station">Zeus Gas Station</option>
  <option value="Zitron">Zitron</option>
  <option value="ZLP Gasoline Station">ZLP Gasoline Station</option>
</select>


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

export default AddStation;
