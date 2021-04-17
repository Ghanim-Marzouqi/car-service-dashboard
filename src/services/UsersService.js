import http from ".";
import { GET_ALL_USERS_URL } from "../config";

const getAllUsers = async () => {
    try {
        const response = await http.get(GET_ALL_USERS_URL);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

export { getAllUsers }