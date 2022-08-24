import { axiosClient } from "../utils";

const authService = {
  login: (data) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + "/user/login",
      data
    );
  },
  register: (data) => {
    return axiosClient.post(process.env.REACT_APP_BASE_URL + "/user", data);
  },
};

export default authService;
