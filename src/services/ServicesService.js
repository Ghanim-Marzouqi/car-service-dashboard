import http from ".";
import {
  GET_ALL_SERVICES_URL,
  ADD_NEW_SERVICE_URL,
  DELETE_SERVICE_URL,
  GET_SERVICE_BY_ID_URL,
  UPDATE_SERVICE_URL
} from "../config";

const getAllServices = async () => {
  try {
    const response = await http.get(GET_ALL_SERVICES_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const creareService = async (payload) => {
  try {
    const response = await http.post(ADD_NEW_SERVICE_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const deleteService = async (payload) => {
  try {
    const response = await http.delete(`${DELETE_SERVICE_URL}/${payload.id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getServiceById = async (payload) => {
  try {
    const response = await http.get(`${GET_SERVICE_BY_ID_URL}/${payload.id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const updateService = async (payload) => {
  try {
    const response = await http.put(`${UPDATE_SERVICE_URL}/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllServices, creareService, deleteService, getServiceById, updateService }