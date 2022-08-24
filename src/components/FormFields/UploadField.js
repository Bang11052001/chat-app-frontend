import { FormControl, FormHelperText, FormLabel, Input } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import cloudinaryUpload from "../../services/uploads";

export const UploadField = ({
  size = "small",
  control,
  label,
  name,
  ...inputProps
}) => {
  const {
    field: { onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    cloudinaryUpload(uploadData);
    onChange(e);
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
