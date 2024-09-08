import axios from "axios";
import { apiPath } from "./shared/constant";

export class ApiService {
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      //   Authorization: `Bearer ${this.token}`,
    };
  }

  login = async (payload) => {
    try {
      const response = await axios.post(`${apiPath}/user/login`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  };

  signUp = async (payload) => {
    try {
      const response = await axios.post(`${apiPath}/user/register`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  };

  planList = async () => {
    try {
      const response = await axios.get(`${apiPath}/plan/list`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  planPurchase = async (payload) => {
    try {
      const response = await axios.post(`${apiPath}/plan/purchase`, payload, {
        headers: { ...this.headers, Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  imageDownload = async (payload) => {
    try {
      const response = await axios.post(`${apiPath}/plan/download`, payload, {
        headers: { ...this.headers, Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  productList = async () => {
    try {
      const response = await axios.get(`${apiPath}/product/list`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };
}
