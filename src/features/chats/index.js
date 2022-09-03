import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import chatApi from "../../api/chatApi";
import CreateGroupModal from "../../components/miscellaneous/GroupModal";
import { chatActions } from "./chatSlice";
import ChatListItem from "./components/ChatListItem";

const ChatFeature = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { chatList, selectedChat } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatActions.fetchAllChatRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSelectChat = (chat) => {
    dispatch(chatActions.selectChat(chat));
  };

  const handleCreateGroupChat = async (data) => {
    try {
      const res = await chatApi.createGroupChat({ data });
      dispatch(chatActions.fetchAllChatRequest());
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
            height: "60px",
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 80px - 111px)",
            overflowY: "hidden",
          }}
        >
          <Stack
            spacing={1}
            mt={2}
            sx={{
              overflowY: "scroll",
            }}
          >
            {chatList?.map((chat) => (
              <ChatListItem
                chat={chat}
                key={chat._id}
                selectedChat={selectedChat}
                onClick={handleSelectChat}
              />
            ))}
          </Stack>
        </Box>
        {/* Chat List Item  */}
      </Paper>
    </Box>
  );
};

export default ChatFeature;
