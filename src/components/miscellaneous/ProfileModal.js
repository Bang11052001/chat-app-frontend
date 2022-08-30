import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import * as React from "react";

export default function ProfileModal({
  onOpen,
  state,
  user,
  fullWidth = true,
  maxWidth = "xs",
}) {
  const theme = useTheme();
  const handleClose = () => {
    onOpen(false);
  };

  return (
    <div>
      <Dialog
        open={state}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth="xs"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Typography variant="h4">{user.name}</Typography>
          </Box>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt={user.name}
            src={user.pic}
            sx={{ width: 124, height: 124 }}
          />
          <Typography variant="h5" sx={{ marginTop: theme.spacing(3) }}>
            {user.email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
