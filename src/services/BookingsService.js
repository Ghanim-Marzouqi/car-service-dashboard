import http from ".";
import { GET_ALL_BOOKINGS_URL, CONFIRM_BOOKING_URL } from "../config";

const getAllBookings = async (payload) => {
  try {
    const response = await http.post(GET_ALL_BOOKINGS_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const confirmBooking = async (payload) => {
  try {
    const response = await http.put(`${CONFIRM_BOOKING_URL}/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllBookings, confirmBooking }