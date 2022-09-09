import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import chatApi from "../../api/chatApi";
import CreateGroupModal from "../../components/miscellaneous/GroupModal";
import { getCookie } from "../../utils/cookie";
import { chatActions } from "./chatSlice";
import ChatListItem from "./components/ChatListItem";

const ChatFeature = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { chatList, selectedChat, isLoading } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    const token = getCookie("access_token");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(chatActions.fetchAllChatRequest(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSelectChat = (chat) => {
    dispatch(chatActions.selectChat(chat));
  };

  const handleCreateGroupChat = async (data) => {
    try {
      const token = getCookie("access_token");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await chatApi.createGroupChat({ data, config });
      dispatch(chatActions.fetchAllChatRequest(config));
      dispatch(chatActions.selectChat(res.data));
      toast.success("create group success");
    } catch (error) {
      console.log(error);
      toast.error("create group failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        margin: `${theme.spacing(1)} `,
      }}
    >
      <Paper
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(3),
          height: "100%",
        }}
      >
        {/* Chat List Headding  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: theme.spacing(2),
            minHeight: "40px",
          }}
        >
          <Typography variant="h6">My Chats</Typography>

          {/* Create Group Chat  */}
          <CreateGroupModal onSubmit={handleCreateGroupChat}>
            <Button variant="outlined" endIcon={<AddIcon />}>
              New Group Chat
            </Button>
          </CreateGroupModal>
        </Box>

        {/* Chat List Item  */}
        <Stack
          spacing={1}
          sx={{
            overflowY: "scroll",
            height: "calc(100vh - 187px)",
          }}
        >
          {isLoading ? (
            <CircularProgress
              color="primary"
              size={100}
              sx={{
                margin: "auto",
                alignSelf: "center",
              }}
            />
          ) : (
            chatList?.map((chat) => (
              <ChatListItem
                chat={chat}
                key={chat._id}
                selectedChat={selectedChat}
                onClick={handleSelectChat}
              />
            ))
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChatFeature;
