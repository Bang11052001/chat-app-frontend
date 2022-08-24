import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export const InputField = ({
  size = "small",
  control,
  label,
  name,
  variant = "outlined",
  margin = "dense",
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
    <TextField
      name={name}
      size={size}
      fullWidth
      label={label}
      variant={variant}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      margin={margin}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
