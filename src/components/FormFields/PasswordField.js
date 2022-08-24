import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

export const PasswordField = ({
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

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((pre) => !pre);
  };

  return (
    <FormControl
      fullWidth
      size={size}
      margin={margin}
      variant={variant}
      type="text"
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        label={label}
        type={isShowPassword ? "text" : "password"}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={inputProps}
        inputRef={ref}
        error={invalid}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};
