import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../../api/authApi";
import { getCookie } from "../../../utils/cookie";
import { history } from "../../../utils/history";
import RegiterForm from "../components/RegisterForm";

const LoginPage = () => {
  const theme = useTheme();

  const initialValue = {};

  useEffect(() => {
    const isAuth = getCookie("access_token");

    if (isAuth) history.push("/chats");
  }, [history]);

  const handleFormSubmit = async (data) => {
    try {
      await authService.register(data);
      toast.success("Register success!");
      history.push("/");
    } catch (error) {
      toast.error("Register failed!");
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
        <Typography variant="h5" component="h2">
          Register
        </Typography>

        <RegiterForm initialValue={initialValue} onSubmit={handleFormSubmit} />
        <Typography
          variant="caption"
          align="center"
          sx={{ marginTop: theme.spacing(1.5) }}
        >
          Already have an account? <Link to="/">Sign in</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
