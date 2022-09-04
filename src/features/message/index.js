import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import chatApi from "../../api/chatApi";
import messageApi from "../../api/messageApi";
import ProfileModal from "../../components/miscellaneous/ProfileModal";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { chatActions } from "../chats/chatSlice";
import MenuOptions from "./components/MenuOption";
import ScrollableChat from "./components/ScrollableChat";
import { messageActions } from "./messageSlice";

const MessageFeature = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { userLogged } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.message);
  const [newMessage, setNewMessage] = useState("");

  const dispatch = useDispatch();

  const isSelectedUser = Object.keys(selectedChat).length > 0;

  useEffect(() => {
    if (isSelectedUser) {
      dispatch(messageActions.fetchAllMessageRequest(selectedChat?._id));
    }
    setNewMessage("");
  }, [selectedChat]);

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

  // Typing handler
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // send message
  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        await messageApi.sendMessage({
          content: newMessage,
          chatId: selectedChat._id,
        });

        dispatch(messageActions.fetchAllMessageRequest(selectedChat._id));
        setNewMessage("");
      } catch (error) {
        console.log(error);
        dispatch(messageActions.fetchAllMessageFailed(selectedChat._id));
      }
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isSelectedUser ? (
          <>
            <Typography
              component="span"
              sx={{
                paddingX: 2,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: theme.spacing(2),
                minHeight: "40px",
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

            {/* Content  */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                backgroundColor: "#E8E8E8",
                padding: theme.spacing(1),
                height: "calc(100vh - 186px )",
                overFlowY: "hidden",
                borderRadius: theme.spacing(1),
              }}
            >
              {loading ? (
                <CircularProgress
                  color="primary"
                  size={100}
                  sx={{
                    margin: "auto",
                    alignSelf: "center",
                  }}
                />
              ) : (
                <ScrollableChat messages={messages} />
              )}

              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: theme.spacing(2),
                }}
              >
                {/* {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      // height={50}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )} */}

                <FilledInput
                  size="small"
                  onKeyDown={(e) => handleSendMessage(e)}
                  fullWidth
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={(e) => typingHandler(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendMessage} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
          </>
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
