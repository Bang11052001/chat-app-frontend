import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import io from "socket.io-client";
import chatApi from "../../api/chatApi";
import messageApi from "../../api/messageApi";
import logo from "../../assets/typingMessage.gif";
import ProfileModal from "../../components/miscellaneous/ProfileModal";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { useDebounce } from "../../hooks/useDebounce";
import { getCookie } from "../../utils/cookie";
import { chatActions } from "../chats/chatSlice";
import MenuOptions from "./components/MenuOption";
import ScrollableChat from "./components/ScrollableChat";

const ENDPOINT = "https://chat-app-backend-phi.vercel.app";
var socket;

const MessageFeature = ({ notifications, setNotifications }) => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { userLogged } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const debounceValue = useDebounce(newMessage, 3000);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dpmrghbpa/video/upload/v1662468474/Nhac-chuong-tin-nhan-Messenger-www_nhacchuongvui_com_ltlmuy.mp3"
    )
  );

  const dispatch = useDispatch();

  let isSelectedChat = Object.keys(selectedChat).length > 0;

  const fetchAllMessages = async () => {
    const token = getCookie("access_token");
    setLoading(true);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await messageApi.fetchAllMessage({
        chatId: selectedChat._id,
        config,
      });

      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("fetch messages failed");
    }
  };

  useEffect(() => {
    if (!Object.keys(userLogged).length > 0) return;

    socket = io(ENDPOINT);
    socket.emit("setup", userLogged._id);
    socket.on("connected", () => setSocketConnected(true));
  }, [userLogged]);

  useEffect(() => {
    if (!isSelectedChat) return;

    socket.emit("join chat", selectedChat._id);

    fetchAllMessages();
    chatActions.selectChat(selectedChat);
    if (typing) setTyping(false);
    setNewMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat, isSelectedChat]);

  useEffect(() => {
    if (!socketConnected || !userLogged || !isSelectedChat) return;
    socket.on("typing", (roomId) => {
      if (roomId === selectedChat._id) setTyping(true);
    });

    socket.on("stop typing", (roomId) => setTyping(false));
  });

  // handle receive message
  useEffect(() => {
    if (!socketConnected) return;

    socket.on("message received", (newMessageReceived) => {
      audio.play();

      if (!isSelectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        const isNotification = notifications.some(
          (notifi) => notifi.chat._id === newMessageReceived.chat._id
        );
        if (!isNotification) {
          setNotifications([newMessageReceived, ...notifications]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const handleLeaveGroup = async () => {
    try {
      const token = getCookie("access_token");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = { chatId: selectedChat._id, userId: userLogged._id };
      await chatApi.leaveGroupChat({ data, config });
      dispatch(chatActions.fetchAllChatRequest(config));
      dispatch(chatActions.selectChat(""));
      toast.success("Leave Group success");
    } catch (error) {
      toast.error("Leave Group failed");
    }
  };

  const handleEditGroup = async (data) => {
    try {
      const token = getCookie("access_token");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await chatApi.updateGroupChat({ data, config });
      toast.success("Edit Group success");
      dispatch(chatActions.fetchAllChatRequest(config));
      dispatch(chatActions.selectChat(res.data));
    } catch (error) {
      toast.error("Edit Group failed");
    }
  };

  // // Typing handler
  useEffect(() => {
    if (!socketConnected || !isSelectedChat || !userLogged) return;

    socket.emit("stop typing", selectedChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, selectedChat, userLogged]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    socket.emit("typing", selectedChat);
  };

  // send message
  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const token = getCookie("access_token");

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await messageApi.sendMessage({
          content: newMessage,
          chatId: selectedChat._id,
          config,
        });

        socket.emit("new message", data, userLogged);
        socket.emit("stop typing", selectedChat, userLogged);
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
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
        {isSelectedChat ? (
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

              {typing ? (
                <Avatar
                  src={logo}
                  sizes="50"
                  variant="square"
                  sx={{ display: "block", width: "100px" }}
                />
              ) : (
                <></>
              )}
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: theme.spacing(2),
                }}
              >
                <FilledInput
                  size="small"
                  onKeyDown={(e) => handleSendMessage(e)}
                  fullWidth
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={(e) => typingHandler(e)}
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
