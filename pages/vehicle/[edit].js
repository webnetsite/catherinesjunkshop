import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { prisma } from "../../lib/prisma";
import { useRouter } from 'next/router';

const VehicleUpdate = ({ tt }) => {
 const metaInfo = {
    title: "Update Vehicle"
 };
 const router = useRouter();
 console.log(tt);

 const [formData, setFormData] = useState(tt);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalMessage, setModalMessage] = useState('');

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

    const data = {
      id: formData.id,
      plate_number: formData.plate_number,
      make: formData.make,
      type: formData.type,
      division_ass: formData.division_ass,
    }

    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/vehicles/update_vehicle';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.success) {
      setModalMessage('Data Updated Successfully');
      setIsModalOpen(true);
    } else {
      setModalMessage('Something Wrong');
      setIsModalOpen(true);
    }
 }

 useEffect(() => {
    // Prefetch the list tt page
    router.prefetch('/list_vehicle');
 }, [router]);

 const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === 'Data Updated Successfully') {
      router.push('/list_vehicle');
    }
 }

 return (
    <Layout metaInfo={metaInfo}>
      <div className="flex justify-center items-center py-10">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
            {/* Plate Number */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs mb-2" htmlFor="plate_number">
                Plate Number
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plate_number" name="plate_number" type="text" value={formData.plate_number} onChange={handleInput} />
            </div>
            {/* Make */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs mb-2" htmlFor="make">
  Vehicle
</label>
<select
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="make"
  name="make"
  value={formData.make}
  onChange={handleInput}
  required
>
  <option value="">Select Vehicle Brand</option>
  <option value="Alfa Romeo">Alfa Romeo</option>
  <option value="Almazora Motors">Almazora Motors</option>
  <option value="Aston Martin">Aston Martin</option>
  <option value="Audi">Audi</option>
  <option value="BAIC">BAIC</option>
  <option value="Bentley">Bentley</option>
  <option value="BMW">BMW</option>
  <option value="BYD">BYD</option>
  <option value="Chery">Chery</option>
  <option value="Chevrolet">Chevrolet</option>
  <option value="Chrysler">Chrysler</option>
  <option value="Del Monte Motors">Del Monte Motors</option>
  <option value="Dodge">Dodge</option>
  <option value="Ferrari">Ferrari</option>
  <option value="Fiat">Fiat</option>
  <option value="Ford">Ford</option>
  <option value="Foton">Foton</option>
  <option value="Francisco Motors">Francisco Motors</option>
  <option value="GAC">GAC</option>
  <option value="Geely">Geely</option>
  <option value="Honda">Honda</option>
  <option value="Hyundai">Hyundai</option>
  <option value="Isuzu">Isuzu</option>
  <option value="JAC">JAC</option>
  <option value="Jaguar">Jaguar</option>
  <option value="Jeep">Jeep</option>
  <option value="Jetour">Jetour</option>
  <option value="Kaicene">Kaicene</option>
  <option value="Kia">Kia</option>
  <option value="Lamborghini">Lamborghini</option>
  <option value="Land Rover">Land Rover</option>
  <option value="Lexus">Lexus</option>
  <option value="Lotus">Lotus</option>
  <option value="Mazda">Mazda</option>
  <option value="Mercedes-Benz">Mercedes-Benz</option>
  <option value="MG (Morris Garages)">MG (Morris Garages)</option>
  <option value="MINI">MINI</option>
  <option value="Mitsubishi">Mitsubishi</option>
  <option value="Nissan">Nissan</option>
  <option value="Peugeot">Peugeot</option>
  <option value="Porsche">Porsche</option>
  <option value="Sarao Motors">Sarao Motors</option>
  <option value="SsangYong">SsangYong</option>
  <option value="Subaru">Subaru</option>
  <option value="Suzuki">Suzuki</option>
  <option value="Toyota">Toyota</option>
  <option value="Volkswagen">Volkswagen</option>
  <option value="Volvo">Volvo</option>
</select>

              
            </div>
            {/* Type */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs mb-2" htmlFor="type">
  Vehicle Type
</label>
<select
  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="type"
  name="type"
  value={formData.type}
  onChange={handleInput}
  required
>
  <option value="">Select Vehicle Type</option>
  <option value="Asian Utility Vehicle (AUV)">Asian Utility Vehicle (AUV)</option>
  <option value="Bus">Bus</option>
  <option value="Convertible">Convertible</option>
  <option value="Coupe">Coupe</option>
  <option value="Crossover">Crossover</option>
  <option value="Hatchback">Hatchback</option>
  <option value="Heavy Commercial Vehicle (HCV)">Heavy Commercial Vehicle (HCV)</option>
  <option value="Jeepney">Jeepney</option>
  <option value="Light Commercial Vehicle (LCV)">Light Commercial Vehicle (LCV)</option>
  <option value="Medium Commercial Vehicle (MCV)">Medium Commercial Vehicle (MCV)</option>
  <option value="Motorcycle">Motorcycle</option>
  <option value="Motorela">Motorela</option>
  <option value="Multi-Purpose Vehicle (MPV)">Multi-Purpose Vehicle (MPV)</option>
  <option value="Pickup Truck">Pickup Truck</option>
  <option value="Scooter">Scooter</option>
  <option value="Sedan">Sedan</option>
  <option value="Sports Utility Vehicle (SUV)">Sports Utility Vehicle (SUV)</option>
  <option value="Station Wagon">Station Wagon</option>
  <option value="Taxi">Taxi</option>
  <option value="Trailer">Trailer</option>
  <option value="Tricycle">Tricycle</option>
  <option value="Truck">Truck</option>
  <option value="UV Express">UV Express</option>
  <option value="Van/Minivan">Van/Minivan</option>
</select>

              
            </div>
            {/* Division Assignment */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs mb-2" htmlFor="division_ass">
                Division Assignment
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="division_ass" name="division_ass" type="text" value={formData.division_ass} onChange={handleInput} />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full md:w-auto" type="submit">
                Update
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
                      {modalMessage}
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

export default VehicleUpdate;

export async function getServerSideProps(context) {
 let id = Number(context.params.edit);

 const tt = await prisma.vehicle.findUnique({
    where: { id }
 });

 return {
    props: { tt }
 };
}
