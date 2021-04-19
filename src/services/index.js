import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_WEP_API
});

http.defaults.headers.post["Content-Type"] = "application/json";

export { login, register, updateProfile, changePassword, getOwnerGarage } from "./AuthService";
export { getStatistics, getRegions, getWillayats } from "./GeneralService";
export { getAllServices, creareService, deleteService, getServiceById, updateService } from "./ServicesService";
export { getAllUsers } from "./UsersService";
export { getAllGarages } from "./GaragesService";
export { getAllBookings } from "./BookingsService";
export default http;