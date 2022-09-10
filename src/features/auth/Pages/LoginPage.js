import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCookie } from "../../../utils/cookie";
import { history } from "../../../utils/history";
import { authActions } from "../authSlice";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const theme = useTheme();
  const initialValue = {};
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    dispatch(authActions.loginRequest(data));
  };

  useEffect(() => {
    const isAuth = getCookie("access_token");

    if (isAuth) history.push("/chats");
  }, [history]);

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
