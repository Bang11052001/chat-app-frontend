import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  InputField,
  PasswordField,
  UploadField,
} from "../../../components/FormFields";

const RegiterForm = ({ initialValue, onSubmit }) => {
  const theme = useTheme();
  const [picLoading, setPicLoading] = useState(false);

  //   validate
  const schema = yup.object({
    name: yup
      .string()
      .required("Name is a required field")
      .test("two-word", "Please enter at least two words", (value) => {
        if (!value) return;

        return (
          value
            .trim()
            .split(" ")
            .filter((x) => !!x).length >= 2
        );
      }),
    email: yup
      .string()
      .required("Email is a required field")
      .test("email-check", "Please enter a email", (value) => {
        const regex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(value);
      }),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .max(18, "Password up to 18 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is a required field")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error("Register failed");
    }
  };

  return (
    <Box width={300}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" label="Name" control={control} />
        <InputField name="email" label="Email" control={control} />

        {/* Password field  */}
        <PasswordField name="password" label="Password" control={control} />

        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          control={control}
        />

        {/* Upload  Image field*/}
        <UploadField
          label="Upload image"
          name="pic"
          control={control}
          setLoading={setPicLoading}
        />

        {/* Button  */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: theme.spacing(1.5) }}
          // disabled={(isSubmitting && true) || (picLoading && true)}
          disabled={isSubmitting}
          color="primary"
        >
          {(isSubmitting && <CircularProgress color="primary" size={16} />) ||
            (picLoading && <CircularProgress color="primary" size={16} />)}
          &nbsp; Register
        </Button>
      </form>
    </Box>
  );
};

export default RegiterForm;
