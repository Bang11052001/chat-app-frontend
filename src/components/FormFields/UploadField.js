import { FormControl, FormHelperText, FormLabel, Input } from "@mui/material";
import axios from "axios";
import React from "react";
import { useController } from "react-hook-form";

export const UploadField = ({
  size = "small",
  control,
  label,
  name,
  setLoading,
  ...inputProps
}) => {
  const {
    field: { onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  const handleFileUpload = async (e) => {
    setLoading(true);

    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    uploadData.append("upload_preset", "chat_app");
    uploadData.append("cloud_name", "dpmrghbpa");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dpmrghbpa/image/upload",
        uploadData
      );

      onChange(data.url.toString());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl margin="dense">
      <FormLabel>{label}</FormLabel>

      <Input
        name={name}
        sx={{ margin: "0 !important" }}
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e) => handleFileUpload(e)}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        inputProps={inputProps}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
