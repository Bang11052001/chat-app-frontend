import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputField, PasswordField } from "../../../components/FormFields";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = ({ initialValue, onSubmit }) => {
  const theme = useTheme();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const schema = yup.object({
    email: yup.string().required("Name is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const { control, handleSubmit } = useForm({
    initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Box width={300}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" label="email" control={control} />
        <PasswordField name="password" label="password" control={control} />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: theme.spacing(1.5) }}
          disabled={isLoading}
          color="primary"
        >
          {isLoading && <CircularProgress color="primary" size={16} />}
          &nbsp; Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
