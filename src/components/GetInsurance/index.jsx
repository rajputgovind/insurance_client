import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
const GetInsurance = () => {
  const navigate = useNavigate();
  const [insurance, setInsurance] = useState({});
  const { id } = useParams();
  const [price, setPrice] = useState();

  const getInsurance = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/insurance/resume-insurance/${id}`
    );
    console.log("data", data);
    setInsurance(data);
  };
  
  useEffect(() => {
    getInsurance();
  }, []);
  const edit = () => {
    navigate(`/edit-insurance/${id}`);
  };

  const handleSubmit = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/insurance/get-price`,
      {
        insuranceId: id,
      }
    );
    setPrice(data?.price);
  };

  return (
    <div className="relative overflow-x-auto container mx-auto">
      <h1> Hii {insurance?.insurance?.firstName}</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Submit
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {insurance?.insurance?.firstName}
            </th>
            <td className="px-6 py-4">{insurance?.insurance?.lastName}</td>
            <td className="px-6 py-4">
              <button onClick={edit}>Edit</button>
            </td>
            <td className="px-6 py-4">
              {price ? (
                `$ ${price} `
              ) : (
                <td>
                  <button onClick={handleSubmit}>Submit</button>
                </td>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GetInsurance;
