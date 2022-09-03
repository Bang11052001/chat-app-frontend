import { getCookie } from "../utils/cookie";

const token = getCookie("access_token");

const authConfig = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export default authConfig;
