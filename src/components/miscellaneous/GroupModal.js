import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { useDebouce } from "../../hooks/useDebouce";

export default function CreateUpdateGroupModal({ chat, children, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { userLogged } = useSelector((state) => state.user);

  const deBouceValue = useDebouce(searchValue, 500);

  // open
  const handleClickOpen = () => {
    setOpen(true);
    setSearchValue();
    setSearchResult();
    setChatName(chat?.chatName || "");
    setSelectedUsers(chat?.users || []);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handle search user
  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setSearchLoading(true);

    const fetchUser = async () => {
      const { data } = await userApi.searchByNameOrEmail({
        searchValue: deBouceValue,
      });
      setSearchResult(data);
      setSearchLoading(false);
    };

    fetchUser();
  }, [deBouceValue]);

  // handle select user
  const handleSelectedUser = (user) => {
    if (
      selectedUsers &&
      selectedUsers.find((selectedUser) => selectedUser._id === user._id)
    ) {
      toast.error("User already exist");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // handle remove user
  const handleRemoveSelectedUser = (user) => {
    if (chat.groupAdmin._id !== userLogged._id) {
      toast.error("Only admin can remove user");
      return;
    }

    const newSelectedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser._id !== user._id
    );
    setSelectedUsers(newSelectedUsers);
  };

  // handle submit user
  const handleSubmit = () => {
    const data = {
      name: chatName,
      users: JSON.stringify(selectedUsers),
    };

    if (chat) {
      data.chatId = chat._id;
    }

    onSubmit(data);
    setOpen(false);
  };

  return (
    <div>
      <span onClick={handleClickOpen}>{children}</span>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Typography variant="h4">
              {chat ? chat.chatName : "Create Group Chat"}
            </Typography>
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
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Chat Name"
              name="chatName"
              variant="outlined"
              size="small"
              margin="dense"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <TextField
              placeholder="Add Users ed: Bang, Kien, An"
              label="Users"
              name="users"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchValue(e.target.value)}
              margin="dense"
            />
          </Box>

          {/* list selected users  */}
          {selectedUsers?.map((user) => (
            <UserBadgeItem
              user={user}
              key={user._id}
              onClick={handleRemoveSelectedUser}
            />
          ))}

          {/* list users  */}
          <Box
            mt={1}
            sx={{ overflowY: "scroll", maxHeight: "25vh", height: "100%" }}
          >
            {searchLoading ? (
              <Typography>loading...</Typography>
            ) : (
              <Stack spacing={1} mt={1}>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    style={{ paddingY: 1, paddingX: 2 }}
                    onClick={handleSelectedUser}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            {chat ? "SAVE " : "CREATE CHAT"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
