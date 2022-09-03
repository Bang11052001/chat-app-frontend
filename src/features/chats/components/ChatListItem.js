import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { getSender } from "../../../config/chatLogic";

const ChatListItem = ({ chat, onClick, selectedChat }) => {
  const theme = useTheme();
  const { userLogged } = useSelector((state) => state.user);

  return (
    <Box
      onClick={() => onClick(chat)}
      selected
      sx={{
        borderRadius: theme.shape.borderRadius,
        paddingY: 2,
        paddingX: 2,
        cursor: "pointer",
        backgroundColor:
          selectedChat._id === chat._id
            ? theme.palette.primary.main
            : "#E8E8E8",
        color: selectedChat._id === chat._id ? "white" : "black",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        KhtmlUserSelect: "none",
      }}
    >
      <Typography>
        {!chat.isGroupChat ? getSender(userLogged, chat.users) : chat.chatName}
      </Typography>
      {chat.latestMessage && (
        <Typography variant="caption">
          {/* <b>{chat.latestMessage.sender.name} : </b>
          {chat.latestMessage.content.length > 50
            ? chat.latestMessage.content.substring(0, 51) + "..."
            : chat.latestMessage.content} */}
        </Typography>
      )}
    </Box>
  );
};

export default ChatListItem;
