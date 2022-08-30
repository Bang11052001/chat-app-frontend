import { axiosClient } from "./axiosClient";

const chatApi = {
  accessChat: ({ id, config }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/chat`,
      {
        userId: id,
      },
      config
    );
  },
  fetchAllChat: ({ config }) => {
    return axiosClient.get(process.env.REACT_APP_BASE_URL + `/chat`, config);
  },
};

export default chatApi;
