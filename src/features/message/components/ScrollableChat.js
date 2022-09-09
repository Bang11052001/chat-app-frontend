import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { isLastMessage, isSameSender } from "../../../config/chatLogic";

const ScrollableChat = ({ messages }) => {
  const { userLogged } = useSelector((state) => state.auth);
  const theme = useTheme();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {messages.map((message, index) => (
        <Box
          key={message._id}
          sx={{
            display: "flex",
            justifyContent:
              message.sender._id === userLogged._id ? "end" : "start",
            marginTop: isSameSender(messages, message, index)
              ? "3px"
              : theme.spacing(2),
          }}
        >
          <Tooltip title={message.sender.name} arrow>
            <Avatar
              size="small"
              src={message.sender.pic}
              sx={{
                marginRight: theme.spacing(1),
                cursor: "pointer",
                display: isLastMessage(messages, message, index, userLogged)
                  ? "block"
                  : "none",
              }}
            />
          </Tooltip>
          <Typography
            variant="span"
            sx={{
              display: "flex",
              overflowWrap: "anywhere",
              alignItems: "center",
              backgroundColor:
                message.sender._id === userLogged._id ? "#BEE3F8" : "#B9F5D0",
              borderRadius: "20px",
              padding: "3px 15px",
              maxWidth: "75%",
              lineHeight: "1.4rem",
              minHeight: "40px",
              marginLeft: isLastMessage(messages, message, index, userLogged)
                ? "0px"
                : "48px",
            }}
          >
            {message.content}
          </Typography>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ScrollableChat;
