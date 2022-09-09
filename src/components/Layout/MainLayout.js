import { Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import ChatFeature from "../../features/chats";
import MessageFeature from "../../features/message";
import { Header } from "../Common";

const MainLayout = () => {
  const theme = useTheme();
  const { selectedChat } = useSelector((state) => state.chat);
  const [notifications, setNotifications] = useState([]);

  const isSelectedUser = Object.keys(selectedChat).length > 0;

  return (
    <Grid container>
      {/* Header  */}
      <Grid item xs={12} md={12} lg={12}>
        <Header
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </Grid>

      {/* Sidebar  */}
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          sx={{
            borderRight: `1px solid ${theme.palette.divider}`,
            [theme.breakpoints.down("md")]: {
              display: isSelectedUser ? "none" : "block",
            },
          }}
        >
          <ChatFeature />
        </Grid>

        {/* Content  */}
        <Grid
          item
          xs={12}
          md={9}
          lg={9}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: isSelectedUser ? "block" : "none",
            },
          }}
        >
          <MessageFeature
            setNotifications={setNotifications}
            notifications={notifications}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
