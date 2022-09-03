import authConfig from "../config/auth";
import { axiosClient } from "./axiosClient";

const userApi = {
  getUserById: (id) => {
    return axiosClient.get(process.env.REACT_APP_BASE_URL + `/user/${id}`);
  },
  searchByNameOrEmail: ({ searchValue, config }) => {
    return axiosClient.get(
      process.env.REACT_APP_BASE_URL + `/user?search=${searchValue}`,
      authConfig
    );
  },
};

export default userApi;
