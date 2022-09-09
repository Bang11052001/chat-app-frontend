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
  fetchAllChat: (config) => {
    return axiosClient.get(process.env.REACT_APP_BASE_URL + `/chat`, config);
  },
  createGroupChat: ({ data, config }) => {
    return axiosClient.post(
      process.env.REACT_APP_BASE_URL + `/chat/group`,
      data,
      config
    );
  },
  leaveGroupChat: ({ data, config }) => {
    return axiosClient.delete(
      process.env.REACT_APP_BASE_URL +
        `/chat/group/${data.chatId}/user/${data.userId}`,
      config
    );
  },
  updateGroupChat: ({ data, config }) => {
    return axiosClient.patch(
      process.env.REACT_APP_BASE_URL + `/chat/group/${data.chatId}`,
      {
        name: data.name,
        users: data.users,
      },
      config
    );
  },
};

export default chatApi;
