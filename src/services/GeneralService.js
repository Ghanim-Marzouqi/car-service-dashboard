import http from ".";
import { STATISTICS_URL, GET_ALL_REGIONS_URL, GET_ALL_WILLAYATS_URL } from "../config";

const getStatistics = async () => {
  try {
    const response = await http.get(STATISTICS_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getRegions = async () => {
  try {
    const response = await http.get(GET_ALL_REGIONS_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getWillayats = async (payload) => {
  try {
    const response = await http.get(`${GET_ALL_WILLAYATS_URL}/${payload.id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getStatistics, getRegions, getWillayats }