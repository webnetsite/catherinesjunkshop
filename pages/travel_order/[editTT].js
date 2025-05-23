import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { PrismaClient } from "@prisma/client";
import Select from 'react-select'
import moment from "moment";
import { useRouter } from 'next/router'

const TripTicketUpdate = ({ro, ta, tt}) => {
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

  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
 

    const data = {
        id: formData.id,
        date_from: formData.date_from,
        date_to: formData.date_to,
        recommending: formData.recommending.label,
        pos2: formData.recommending.value,
        approval: formData.approval.label,
        pos3: formData.approval.value,
    }
    console.log(data)

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/to/update_to'
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
    router.push('/list_travel_order');
  }

  useEffect(() => {
    // Prefetch the list tt page
   router.prefetch('/list_travel_order')
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
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
        
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="recommending"
              >
                Recommending
              </label>
              <Select  
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={ro}
              id="recommending" name="recommending"
              onChange={handleSelect} value={formData.recommending}
              required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="approval"
              >
                TO Approval
              </label>
              <Select  
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={ta}
              id="approval" name="approval"
              onChange={handleSelect} value={formData.approval}
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
  let id = context.params.editTT;
  const prisma = new PrismaClient()

  const result11 = await prisma.chief.findMany({
    where: {
      ro: 1
    }
  })
  const ro = result11.map(item => {
    const container={};
    container["value"] = item.pos
    container["label"] = item.name;
    return container;
  })

  const result111 = await prisma.chief.findMany({
    where: {
      ta: 1
    }
  })

  const ta = result111.map(item => {
    const container={};
    container["value"] = item.pos
    container["label"] = item.name;
    return container;
  })


  const tt = await prisma.travel_order.findUnique({
    where: {
      id: Number(id)
     }
  })

  tt.date_from = moment(tt.date_from).utc().format('YYYY-MM-DD')
  tt.date_to = moment(tt.date_to).utc().format('YYYY-MM-DD')
  tt.date_time_created = moment(tt.date_time_created).utc().format()
  tt.ticket_id = tt.tt_id
  tt.recommending = {value: tt.pos_recommending, label: tt.recommending};
  tt.approval = {value: tt.pos_approval, label: tt.approval};


  return {
    props : { ro,ta, tt }
  }
}
