import http from ".";
import {
  GET_ALL_GARAGES_URL,
  GET_GARAGE_OWNERS_URL,
  ADD_NEW_GARAGE_URL,
  GET_GARAGE_BY_ID_URL,
  UPDATE_GARAGE_URL,
  DELETE_GARAGE_URL
} from "../config";

const getAllGarages = async () => {
  try {
    const response = await http.get(GET_ALL_GARAGES_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getGarageOwners = async () => {
  try {
    const response = await http.get(GET_GARAGE_OWNERS_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const createGarage = async (payload) => {
  try {
    const response = await http.post(ADD_NEW_GARAGE_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getGarageById = async (payload) => {
  try {
    const response = await http.get(`${GET_GARAGE_BY_ID_URL}/${payload}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const updateGarage = async (payload) => {
  try {
    const response = await http.put(`${UPDATE_GARAGE_URL}/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const deleteGarage = async (payload) => {
  try {
    const response = await http.delete(`${DELETE_GARAGE_URL}/${payload}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllGarages, getGarageOwners, createGarage, getGarageById, updateGarage, deleteGarage }