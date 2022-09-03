import authConfig from "../config/auth";
import { axiosClient } from "./axiosClient";

const chatApi = {
  accessChat: ({ id }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/chat`,
      {
        userId: id,
      },
      authConfig
    );
  },
  fetchAllChat: () => {
    return axiosClient.get(
      process.env.REACT_APP_BASE_URL + `/chat`,
      authConfig
    );
  },
  createGroupChat: ({ data }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/chat/group`,
      data,
      authConfig
    );
  },
  leaveGroupChat: ({ data }) => {
    return axiosClient.delete(
      process.env.REACT_APP_BASE_URL +
        `/chat/group/${data.chatId}/user/${data.userId}`,
      authConfig
    );
  },
  updateGroupChat: ({ data }) => {
    return axiosClient.patch(
      process.env.REACT_APP_BASE_URL + `/chat/group/${data.chatId}`,
      {
        name: data.name,
        users: data.users,
      },
      authConfig
    );
  },
};

export default chatApi;
