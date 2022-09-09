import { axiosClient } from "./axiosClient";

const messageApi = {
  fetchAllMessage: ({ chatId, config }) => {
    return axiosClient.get(
      process.env.REACT_APP_BASE_URL + `/message/${chatId}`,
      config
    );
  },
  sendMessage: ({ content, chatId, config }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/message`,
      {
        content,
        chatId,
      },
      config
    );
  },
};

export default messageApi;
