import axios from "axios";

const API_URL = "https://localhost:44387"
export const schoolService = {
  getSchools: async () => {
    try {
      const response = await axios.get(`${API_URL}/schools`);
      return response.data; // return data to the component
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error; // rethrow so the component can handle it
    }
  }
};
