import http from ".";
import { GET_ALL_SERVICES_URL } from "../config";

const getAllServices = async () => {
  try {
    const response = await http.get(GET_ALL_SERVICES_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllServices }