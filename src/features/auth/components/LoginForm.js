import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputField } from "../../../components/FormFields";

const LoginForm = ({ initialValue, onSubmit }) => {
  const theme = useTheme();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    initialValue,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Box width={300}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" label="email" control={control} />
        <InputField
          name="password"
          label="password"
          control={control}
          type="password"
        />

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
