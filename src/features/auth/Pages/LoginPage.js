import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const theme = useTheme();
  const initialValue = {};

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: theme.palette.divider,
          padding: `${theme.spacing(5)} ${theme.spacing(8)}`,
          minWidth: "250px",
        }}
      >
        {/* Headding  */}
        <Typography variant="h5" component="h2">
          Login
        </Typography>

        {/* Login form  */}
        <LoginForm initialValue={initialValue} onSubmit={handleFormSubmit} />

        {/* Caption  */}
        <Typography
          variant="caption"
          align="center"
          sx={{ marginTop: theme.spacing(1.5) }}
        >
          Not registered? <Link to="/register">Create an account</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
