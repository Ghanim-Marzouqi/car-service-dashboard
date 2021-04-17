import http from ".";
import { GET_ALL_BOOKINGS_URL } from "../config";

const getAllBookings = async (payload) => {
  try {
    const response = await http.post(GET_ALL_BOOKINGS_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllBookings }