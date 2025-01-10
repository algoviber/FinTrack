import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Get the token
const token = getUserFromStorage();
//! Add
export const addSavingAPI = async ({
  endDate,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/savings/create`,
    {
      amount,
      endDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! get
export const getSavingsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/savings/get`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //Return a promise
    return response.data;
  };
//! update
export const updateSavingAPI = async ({
  endDate,
  amount,
  id
}) => {
  const response = await axios.put(
    `${BASE_URL}/savings/update/${id}`,
    {
      endDate,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! delete
export const deleteSavingAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/savings/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
