import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { PrismaClient } from "@prisma/client";
import Select from 'react-select'
import moment from "moment";
import { useRouter } from 'next/router'

const TripTicketUpdate = ({drivers, chiefs, vehicles, tt}) => {
  const metaInfo = {
    title: "Update Trip Ticket"
  };
 
  const router = useRouter()
  const [formData, setFormData] = useState(tt);
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

  const handleSelect = (value, action) => {
    setFormData((prevState) => ({
      ...prevState,
      [action.name]: value
    }));
  }

console.log(tt)

  const handleSubmit = async (event) => {
    event.preventDefault()
 

    const data = {
        ticket_id: formData.ticket_id,
        date_from: formData.date_from,
        date_to: formData.date_to,

        driver: formData.driver.value,
        alternatedriver: formData.alternatedriver.value,
        vehicle_id: formData.vehicle_id.value,
        destination: formData.destination,
        purpose: formData.purpose,
        approving_officer: formData.approving_officer.label,
        pos1: formData.approving_officer.value,
        pass1: formData.pass1,
        pass2: formData.pass2,
        pass3: formData.pass3,
        pass4: formData.pass4,
        pass5: formData.pass5,
        pass6: formData.pass6,
        pass7: formData.pass7
    }
    console.log(data)

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/tt/update_tt'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if(result.success) {
      setModalContent("Data Updated Successfully");
      setIsModalOpen(true);
    } else {
      setModalContent("Data Updated Successfully");
      setIsModalOpen(true);
    }

  }

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/list_trip_ticket');
  }

  useEffect(() => {
    // Prefetch the list tt page
   router.prefetch('/list_trip_ticket')
  }, [router])


  return (
    <Layout metaInfo={metaInfo}>
      <div className="flex justify-center my-4 py-10">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="id"
              >
                Trip Ticket No.
              </label>
              <input
                className="appearance-none block w-full  text-blue-700  bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="ticket_id" name="ticket_id" 
                type="text" value={formData.ticket_id}
                readOnly
              />
              <p className="text-red-500 text-xs italic">
                ID is auto-generated.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="approving_officer"
              >
                Approving Officer
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={chiefs}
              id="approving_officer" name="approving_officer"
              onChange={handleSelect} value={formData.approving_officer}
              required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="date_from"
              >
                Date From
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="date_from" name="date_from"
                onChange={handleInput} value={formData.date_from}
                type="date"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="date_to"
              >
                Date Up To
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="date_to" name="date_to" 
                onChange={handleInput} value={formData.date_to}
                type="date"
                required
              />
            </div>

            
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="driver"
              >
                Authorized Driver
              </label>
              <Select  
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={drivers} id="driver" name="driver"
              onChange={handleSelect} value={formData.driver}
              />
      
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="plate_no"
              >
                RP Plate Number
              </label>
              <Select  
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={vehicles} id="vehicle_id" name="vehicle_id" 
              onChange={handleSelect} value={formData.vehicle_id}
              />
            </div>

            
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="driver"
              >
                Alternate Driver
              </label>
              <Select  
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={drivers} id="alternatedriver" name="alternatedriver"
              onChange={handleSelect} value={formData.alternatedriver}
              required
              />
      
            </div>
           
          
          <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="destination"
              >
               Destination
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="destination" name="destination" onChange={handleInput} value={formData.destination}
                type="text" 
              />
    
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass1"
              >
               Passenger 1
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  resize-none"
                id="pass1" name="pass1" onChange={handleInput} value={formData.pass1}
                type="text" 
              />
            </div>
          <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass2"
              >
               Passenger 2
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="pass2" name="pass2" onChange={handleInput} value={formData.pass2}
                type="text" 
              />
            </div></div>

            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass3"
              >
               Passenger 3
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  resize-none"
                id="pass3" name="pass3" onChange={handleInput} value={formData.pass3}
                type="text" 
              />
            </div>
          <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass4"
              >
               Passenger 4
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="pass4" name="pass4" onChange={handleInput} value={formData.pass4}
                type="text" 
              />
            </div></div>

            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass5"
              >
               Passenger 5
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  resize-none"
                id="pass5" name="pass5" onChange={handleInput} value={formData.pass5}
                type="text" 
              />
            </div>
          <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass6"
              >
               Passenger 6
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="pass6" name="pass6" onChange={handleInput} value={formData.pass6}
                type="text" 
              />
            </div></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="pass7"
              >
               Passenger 7
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="pass7" name="pass7" onChange={handleInput} value={formData.pass7}
                type="text" 
              />
    
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs mb-2"
                htmlFor="purpose"
              >
                Purpose
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="purpose" name='purpose' onChange={handleInput} value={formData.purpose}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
          <button
                className="shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
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
                      {modalContent}
                    </h3>
                 </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default TripTicketUpdate;

export async function getServerSideProps(context) {
  let ticket_id = context.params.editTT;
  const prisma = new PrismaClient()
  const result = await prisma.driver.findMany()
  const drivers = result.map(item => {
    const container={};
    container["value"] = item.id;
    container["label"] = item.name;
    return container;
  })

  const result1 = await prisma.chief.findMany()
  const chiefs = result1.map(item => {
    const container={};
    container["value"] = item.pos
    container["label"] = item.name;
    return container;
  })

  const result2 = await prisma.vehicle.findMany()
  const vehicles = result2.map(item => {
    const container={};
    container["value"] = item.id;
    container["label"] = item.plate_number;
    return container;
  })  

  const tt = await prisma.trip_ticket.findUnique({
    include:{
      vehicle: true,
      driver: true,
    },
    where: { ticket_id }
  })

  tt.date_from = moment(tt.date_from).utc().format('YYYY-MM-DD')
  tt.date_to = moment(tt.date_to).utc().format('YYYY-MM-DD')
  tt.date_time_created = moment(tt.date_time_created).utc().format()
  tt.approving_officer = {value: tt.pos1, label: tt.approving_officer};
  tt.driver = {value: tt.driver.id, label: tt.driver.name};
  tt.vehicle_id = {value: tt.vehicle.id, label: tt.vehicle.plate_number};

  drivers.sort((a, b) => moment(a.date_time_created) - moment(b.date_time_created));


  return {
    props : { drivers, chiefs, vehicles, tt }
  }
}
