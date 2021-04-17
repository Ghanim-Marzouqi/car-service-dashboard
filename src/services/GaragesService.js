import http from ".";
import { GET_ALL_GARAGES_URL } from "../config";

const getAllGarages = async () => {
  try {
    const response = await http.get(GET_ALL_GARAGES_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllGarages }