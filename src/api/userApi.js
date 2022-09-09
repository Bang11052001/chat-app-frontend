import { axiosClient } from "./axiosClient";

const userApi = {
  getUserById: (id) => {
    return axiosClient.get(process.env.REACT_APP_BASE_URL + `/user/${id}`);
  },
  searchByNameOrEmail: ({ searchValue, config }) => {
    return axiosClient.get(
      process.env.REACT_APP_BASE_URL + `/user?search=${searchValue}`,
      config
    );
  },
};

export default userApi;
