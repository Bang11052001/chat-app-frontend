import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";

const UserListItem = ({ user, onClick, onOpen }) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick(user._id);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
        display: "flex",
        alignItems: "center",
        color: "black",
        paddingX: 3,
        paddingY: 2,
        marginY: 2,
        borderRadius: theme.spacing(1),
      }}
      onClick={handleClick}
    >
      <Avatar
        sx={{ marginRight: theme.spacing(1.5) }}
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="caption">
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
