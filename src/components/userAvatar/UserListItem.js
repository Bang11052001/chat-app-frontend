import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";

const UserListItem = ({ user, onClick, style }) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick(user);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
        display: "flex",
        alignItems: "center",
        color: "black",
        borderRadius: theme.spacing(1),
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        KhtmlUserSelect: "none",
        ...style,
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
