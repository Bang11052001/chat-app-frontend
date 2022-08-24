import { FormControl, FormHelperText, FormLabel, Input } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

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

  return (
    <FormControl margin="dense">
      <FormLabel>{label}</FormLabel>

      <Input
        name={name}
        sx={{ margin: "0 !important" }}
        type="file"
        p={1.5}
        accept="image/*"
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        inputProps={inputProps}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
