import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { chatActions } from "./chatSlice";
import ChatListItem from "./components/ChatListItem";

const ChatFeature = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = getCookie("access_token");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { chatList, selectedChatId } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatActions.fetchAllChatRequest(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleClickChat = (chat) => {
    dispatch(chatActions.selectChat(chat._id));
  };

  return (
    <Box>
      <Paper
        sx={{
          height: "100vh",
          border: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(3),
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">My Chats</Typography>
          <Button variant="outlined" endIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </Box>

        <Stack sx={{ overflowY: "scroll" }} spacing={1} mt={2}>
          {chatList.map((chat) => (
            <ChatListItem
              chat={chat}
              key={chat._id}
              selectedChat={selectedChatId}
              onClick={handleClickChat}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChatFeature;
