import http from ".";
import {
    GET_ALL_USERS_URL,
    CREATE_USER_URL,
    DELETE_USER_URL,
    GET_USER_BY_ID_URL,
    UPDATE_USER_URL
} from "../config";

const getAllUsers = async () => {
    try {
        const response = await http.get(GET_ALL_USERS_URL);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const createUser = async (payload) => {
    try {
        const response = await http.post(CREATE_USER_URL, payload);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const deleteUser = async (payload) => {
    try {
        const response = await http.delete(`${DELETE_USER_URL}/${payload}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const getUserById = async (payload) => {
    try {
        const response = await http.get(`${GET_USER_BY_ID_URL}/${payload}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const updateUser = async (payload) => {
    try {
        const response = await http.put(`${UPDATE_USER_URL}/${payload.id}`, payload);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

export { getAllUsers, createUser, deleteUser, getUserById, updateUser }