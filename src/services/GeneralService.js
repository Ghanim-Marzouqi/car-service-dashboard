import http from ".";
import { STATISTICS_URL } from "../config";

const getStatistics = async () => {
  try {
    const response = await http.get(STATISTICS_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getStatistics }