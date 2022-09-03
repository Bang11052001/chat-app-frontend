import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import chatApi from "../../api/chatApi";
import ProfileModal from "../../components/miscellaneous/ProfileModal";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { chatActions } from "../chats/chatSlice";
import MenuOptions from "./components/MenuOption";

const MessageFeature = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { userLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isSelectedUser = Object.keys(selectedChat).length > 0;

  const handleLeaveGroup = async () => {
    try {
      const data = { chatId: selectedChat._id, userId: userLogged._id };
      await chatApi.leaveGroupChat({ data });
      dispatch(chatActions.fetchAllChatRequest());
      dispatch(chatActions.selectChat(""));
      toast.success("Leave Group success");
    } catch (error) {
      toast.error("Leave Group failed");
    }
  };

  const handleEditGroup = async (data) => {
    try {
      const res = await chatApi.updateGroupChat({ data });
      toast.success("Edit Group success");
      dispatch(chatActions.fetchAllChatRequest());
      dispatch(chatActions.selectChat(res.data));
    } catch (error) {
      toast.error("Edit Group failed");
    }
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
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
        {isSelectedUser ? (
          <Typography
            component="span"
            sx={{
              paddingBottom: 3,
              paddingX: 2,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                display: "none",
                [theme.breakpoints.down("md")]: {
                  display: "block",
                },
              }}
              onClick={() => dispatch(chatActions.selectChat({}))}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <ProfileModal
                  user={getSenderFull(userLogged, selectedChat.users)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={getSenderFull(userLogged, selectedChat.users).pic}
                    ></Avatar>
                    <Typography
                      component="span"
                      sx={{ marginLeft: theme.spacing(1) }}
                    >
                      {getSender(userLogged, selectedChat.users)}
                    </Typography>
                  </Box>
                </ProfileModal>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography component="span">
                  {selectedChat.chatName.toUpperCase()}
                </Typography>
                <MenuOptions
                  onLeaveGroup={handleLeaveGroup}
                  onSubmit={handleEditGroup}
                >
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </MenuOptions>
              </>
            )}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h3">
              Click on a user to start chatting
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MessageFeature;
