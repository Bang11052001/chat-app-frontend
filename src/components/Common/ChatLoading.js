import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ChatLoading = ({
  animation = "wave",
  variant = "rounded",
  height = 87,
}) => {
  return (
    <Box>
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
      <Skeleton
        animation={animation}
        variant={variant}
        height={height}
        sx={{ marginY: 2 }}
      />
    </Box>
  );
};

export default ChatLoading;
