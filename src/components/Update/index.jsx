import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import formSchema from '../Validation'
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
        setValue
      } = useForm({
        resolver:yupResolver(formSchema)
      });
    const {id} = useParams()
    // console.log("id",id)
    const [insurance,setInsurance]=useState({})
    const [dob,setDob]=useState()
    const [vehicles,setVehicles] = useState([])
    const navigate = useNavigate()
      const getInsurance = async() =>{
        
     const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/insurance/resume-insurance/${id}`)
     console.log("data",data)
     setInsurance(data)
     setDob(moment(data?.insurance?.dateOfBirth).format('L') )
     setVehicles(data?.insurance?.vehicles)
     
     setValue('firstName',data?.insurance?.firstName)
     setValue('lastName',data?.insurance?.lastName)
    //  setValue('dateOfBirth',data?.insurance?.dateOfBirth)
     setValue('dateOfBirth',moment(data?.insurance?.dateOfBirth).format('L') )
     setValue('city',data?.insurance?.address?.city)
     setValue('state',data?.insurance?.address?.state)
     setValue('street',data?.insurance?.address?.street)
     setValue("zipCode",data?.insurance?.address?.zipCode)
    setValue("vin",data?.insurance?.vehicles[0]?.vin)
    setValue("year",data?.insurance?.vehicles[0]?.year)
    setValue("makeModel",data?.insurance?.vehicles[0]?.makeModel)
    setValue("vin2",data?.insurance?.vehicles[1]?.vin)
    setValue("year2",data?.insurance?.vehicles[1]?.year)
    setValue("makeModel2",data?.insurance?.vehicles[1]?.makeModel)
    setValue("vin3",data?.insurance?.vehicles[2]?.vin)
    setValue("year3",data?.insurance?.vehicles[2]?.year)
    setValue("makeModel3",data?.insurance?.vehicles[2]?.makeModel)

      }
      // console.log("v",vehicles)
      // console.log("dob",dob)
      
      useEffect(()=>{
       getInsurance()
      },[])
      
      const postData = async(data) => {
        const {firstName, lastName, dateOfBirth, street,city, state ,zipCode,vin ,year ,makeModel,vin2, year2,makeModel2, vin3,year3, makeModel3} = data
    
        
        const address = {
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        };
    
        const vehicles = [] 
    
        if(vin && year && makeModel){
          vehicles.push({vin:vin, year:year, makeModel:makeModel})
        }
    
        if(vin2 && year2 && makeModel2){
          vehicles.push({vin:vin2, year:year2, makeModel:makeModel2})
        }
        
        if(vin3 && year3 && makeModel3){
          vehicles.push({vin:vin3, year:year3, makeModel:makeModel3})
        }
    
        let dob = moment(dateOfBirth).format('L');
        
        const formData = {firstName, lastName,dateOfBirth:dob, address:address, vehicles:vehicles}
    console.log(formData)
    
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/insurance/update-insurance/${id}`,formData)
    console.log("res",res)
    navigate(`/resume-insurance/${id}`)
      
    
      };
  return (

  <>
     <div className="container mx-auto mt-5">
        <div
          className="flex p-4 mb-4 text-lg text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div>
            <span className="font-medium">Edit Insurance !</span>
          </div>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(postData)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  // defaultValue={insurance?.insurance?.firstName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <p style={{color:"red"}}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <p style={{color:"red"}}>{errors.lastName.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  id="dateOfBirth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("dateOfBirth", { required: true })}
                />
                {errors.dateOfBirth && <p style={{color:"red"}}>{errors.dateOfBirth.message}</p>}
              </div>
              <br />
              <div>
                <label
                  htmlFor="street"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address : Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("street", { required: true })}
                />
                {errors.street && <p style={{color:"red"}}>{errors.street.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="flowbite.com"
                  {...register("city", { required: true })}
                />
                {errors.city && <p style={{color:"red"}}>{errors.city.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("state", { required: true })}
                />
                {errors.state && <p style={{color:"red"}}>{errors.state.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  id="zipCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("zipCode", { required: true })}
                />
                {errors.zipCode && <p style={{color:"red"}}>{errors.zipCode.message}</p>}
              </div>
              
              <div>
                <label
                  htmlFor="vin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><h1 className="text-lg">vehicles 1 :</h1>
                  VIN
                </label>
                <input
                  type="text"
                  id="vin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("vin", { required: true })}
                />
                {errors.vin && <p style={{color:"red"}}>{errors.vin.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("year", { required: true })}
                />
                {errors.year && <p style={{color:"red"}}>{errors.year.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="makeModel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Make Model
                </label>
                <input
                  type="text"
                  id="makeModel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("makeModel", { required: true })}
                />
                {errors.makeModel && <p style={{color:"red"}}>{errors.makeModel.message}</p>}
              </div> <br />

              <div>
                <label
                  htmlFor="vin2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><h1 className="text-lg">vehicles 2 :</h1>
                  VIN
                </label>
                <input
                  type="text"
                  id="vin2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("vin2")}
                />
              </div>
              <div>
                <label
                  htmlFor="year2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("year2")}
                />
              </div>
              <div>
                <label
                  htmlFor="makeModel2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Make Model
                </label>
                <input
                  type="text"
                  id="makeModel2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("makeModel2")}
                />
              </div> <br />
              <div>
                <label
                  htmlFor="vin3"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ><h1 className="text-lg">vehicles 3 :</h1>
                  VIN
                </label>
                <input
                  type="text"
                  id="vin3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("vin3")}
                />
              </div>
              <div>
                <label
                  htmlFor="year3"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("year3")}
                />
              </div>
              <div>
                <label
                  htmlFor="makeModel3"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Make Model
                </label>
                <input
                  type="text"
                  id="makeModel3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  {...register("makeModel3")}
                />
              </div>

             

            
            
            
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
  </>
  )
}

export default Update
