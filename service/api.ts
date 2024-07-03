import axios, { AxiosInstance } from "axios";

export class ApiService {
  base: AxiosInstance;
  constructor() {
    this.base = axios.create({
      baseURL: `https://api-v2-internal-beta.onrender.com/v1/api`,
    });
  }
}

export default new ApiService();
