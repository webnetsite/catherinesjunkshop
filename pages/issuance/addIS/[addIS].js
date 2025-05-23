import React, { useEffect, useState } from 'react';
import Layout from "../../../components/Layout";
import { PrismaClient } from "@prisma/client";
import Select from 'react-select'
import moment from "moment";
import { useRouter } from 'next/router'

const AddIs = ({ drivers , fp, fa, chief ,vehicles, count, charging, vendor,comprod, ticket_id}) => {
  const metaInfo = {
    title: "Fuel/ Oil Issuance Slip"
  };

  const router = useRouter()

  const [codeNo, setcodeNo] = useState('');
  const [formData, setFormData] = useState({
    //id: moment().format('MMDD-YY') + "-" + String(c).padStart(4,'0'),
    id:"",
    trip_ticket:"",
    date_req: "",
    charging: "",
    charge_to: "",
    req_officer: "",
    vehicle: "",
    driver: "",
    prepared: "",
    approved: "",
    diesel: "",
    consumableprod:""
  });

 // State for modal visibility and content
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalContent, setModalContent] = useState("");

  const handleControlNo = (value, action) => {

    const arrayOfNumbers = count.map(obj => obj.id);//convert array of object into list
      let result = arrayOfNumbers.map(i=>Number(i));//convert string to number
      let sortresult = result.sort((a,b)=>a-b);
      let lastElement = sortresult[sortresult.length - 1]; //last element of an array
      let c = 0;
      if (lastElement === undefined){
         c = 1;
      }
      else{
         c = lastElement+1;
      }
      var a = sortresult,
      count1 = lastElement;
      var missing = new Array();
      for (var i = 1; i <= count1; i++) {
        if (a.indexOf(i) == -1) {
          missing.push(i);
        }
      }

    var str = value.value
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    var acronym = matches.join(''); // JSON

    if(missing ==='' || missing === null || missing === undefined || missing.length===0){
      var acdate = acronym + "-" + moment().format('MMDD-YY') + "-" + String(c).padStart(4,'0');
      setcodeNo(acdate)

    }
    else{
      var acdate = acronym + "-" + moment().format('MMDD-YY') + "-" + String(missing[0]).padStart(4,'0');
      setcodeNo(acdate)
    }


    setFormData((prevState) => ({
      ...prevState,
      [action.name]: value
    }));


  }


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
    console.log(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)

    const data = {
        id: codeNo,
        ticket_id : ticket_id,
        date_req: formData.date_req,
        charging: formData.charging.value,
        charge_to: formData.charge_to.value,
        req_officer: formData.req_officer.label,
        vehicle: formData.vehicle.value,

        driver: formData.driver.value,
        prepared: formData.prepared.label,
        approved: formData.approved.label,
        consumableproduct: formData.consumableprod.value,
        diesel: formData.diesel,
        pos1: formData.prepared.value,
        pos2: formData.approved.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/is/add_is'
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
      router.push('/list_trip_ticket');
    }
 }

  useEffect(() => {
    // Prefetch the list tt page
   router.prefetch('/list_trip_ticket')
  }, [router])

  return (
    <Layout metaInfo={metaInfo}>
      <div className="flex justify-center py-10">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block  tracking-wide text-gray-700 text-xs  mb-2"
                      htmlFor="id"
                    >
                      Trip Ticket Number
                    </label>
                    <input
                      className="appearance-none block w-full  text-blue-700  bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="ticket_id" name="ticket_id" 
                      type="text" value={ticket_id}
                      readOnly
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-xs  mb-2"
                    htmlFor="requisitioning_officer"
                  >
                    Requisitioning Officer
                  </label>
                  <Select 
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'white' : '#E5E7EB',
                      backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                    }),
                  }}
                  options={chief}
                  id="req_officer" name="req_officer"
                  onChange={handleSelect} value={formData.req_officer}
                  required />
                </div>  
         
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="charge_to"
              >
                Charge To
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={vendor}
              id="charge_to" name="charge_to"
              onChange={handleControlNo} value={formData.charge_to}
              required
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="id"
              >
                Control Number
              </label>
              <input
                className="appearance-none block w-full bg-blue-200 text-blue-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="id" name="id" 
                type="text" value={codeNo}
                readOnly
              />
              <p className="text-red-500 text-xs italic">
                ID is auto-generated.
              </p>
           
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="date_req" name="date_req"
                onChange={handleInput} value={formData.date_req}
                type="date"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="fund_source"
              >
                  Fund Source
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={charging}
              id="charging" name="charging"
              onChange={handleSelect} value={formData.fund_source}
              required
              />
            </div>
       
            
          </div>

            <div className="flex flex-wrap -mx-3 mb-6">
            
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="requisitioning_officer"
              >
                Consumable Product
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={comprod}
              id="consumableprod" name="consumableprod"
              onChange={handleSelect} value={formData.consumableprod}
              required />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="diesel"
              >
                  Liters
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="diesel" name='diesel'
                type="number" onChange={handleInput} required
              />
      
            </div>

          </div>

        

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="plate_no"
              >
                  Vehicle Plate Number
              </label>
              <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={vehicles}
              id="vehicle" name="vehicle"
              onChange={handleSelect} value={formData.vehicle}
              required />
      
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="driver"
              >
                Driver
              </label>
              <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={drivers}
              id="driver" name="driver"
              onChange={handleSelect} value={formData.driver}
              required />
            </div>

            
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="prepared"
              >
                  Prepared
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={fp}
              id="prepared" name="prepared"
              onChange={handleSelect} value={formData.prepared}
              required />
      
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-xs  mb-2"
                htmlFor="approved"
              >
                Approved
              </label>
              <Select 
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'white' : '#E5E7EB',
                  backgroundColor: state.isFocused ? 'white' : '#E5E7EB'
                }),
              }}
              options={fa}
              id="approved" name="approved"
              onChange={handleSelect} value={formData.approved}
              required />
            </div>

            
          </div>
    
    
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="font-bold shadow bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded"
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
              <div className="font-bold bg-gray-50 px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default AddIs;

export async function getServerSideProps(context) {

  let ticket_id = context.params.addIS;

  const prisma = new PrismaClient()
  const result = await prisma.driver.findMany()
  const drivers = result.map(item => {
    const container={};
    container["value"] = item.name;
    container["label"] = item.name;
    return container;
  })

  const result1 = await prisma.chief.findMany({
      where: {
        fp: 1
      }
    })
  const fp = result1.map(item => {
  const container={};
  container["value"] = item.pos
  container["label"] = item.name;
  return container;
  })

  const result11 = await prisma.chief.findMany({
    where: {
      fa: 1
    }
  })
  const fa = result11.map(item => {
  const container={};
  container["value"] = item.pos
  container["label"] = item.name;
  return container;
  })

  const result111 = await prisma.chief.findMany({
  })
  const chief = result111.map(item => {
  const container={};
  container["value"] = item.pos
  container["label"] = item.name;
  return container;
  })

  const result2 = await prisma.$queryRaw`SELECT CONCAT(plate_number," ","(",make,")") as plate_number FROM vehicle;`
  const vehicles = result2.map(item => {
    const container={};
    container["value"] = item.plate_number;
    container["label"] = item.plate_number;
    return container;
  })

  const result3 = await prisma.fund_source.findMany()
  const charging = result3.map(item => {
    const container={};
    container["value"] = item.name;
    container["label"] = item.name;
    return container;
  })

  const result4 = await prisma.vendor.findMany()
  const vendor = result4.map(item => {
    const container={};
    container["value"] = item.name;
    container["label"] = item.name;
    return container;
  })

  let result5 = [
    {label:'Diesel(Container)', name:'Diesel(Container)'},
    {label:'Diesel', name:'Diesel'},
    {label:'Gasoline(Container)', name:'Gasoline(Container)'},
    {label:'Gasoline', name:'Gasoline'},
  ]
  const comprod = result5.map(item => {
    const container={};
    container["value"] = item.name;
    container["label"] = item.name;
    return container;
  })

  const count = await prisma.$queryRaw`select SUBSTRING_INDEX(id, '-', -1) as id from issuance_slip`

  return {
    props : { drivers, fp, fa, chief,vehicles, count, charging, vendor,comprod, ticket_id }
  }
}

