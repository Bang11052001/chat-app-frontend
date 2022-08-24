import axios from "axios";

const cloudinaryUpload = (fileToUpload) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_URL + "/user/cloudinary-upload",
      fileToUpload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default cloudinaryUpload;
