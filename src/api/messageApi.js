import authConfig from "../config/auth";
import { axiosClient } from "./axiosClient";

const messageApi = {
  fetchAllMessage: (chatId) => {
    return axiosClient.get(
      process.env.REACT_APP_BASE_URL + `/message/${chatId}`,
      authConfig
    );
  },
  sendMessage: ({ content, chatId }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/message`,
      {
        content,
        chatId,
      },
      authConfig
    );
  },
};

export default messageApi;
