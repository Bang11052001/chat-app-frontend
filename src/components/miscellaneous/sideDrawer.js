import { Button, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useTheme } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import chatApi from "../../api/chatApi";
import userApi from "../../api/userApi";
import { chatActions } from "../../features/chats/chatSlice";
import ChatLoading from "../Common/ChatLoading";
import UserListItem from "../userAvatar/UserListItem";

export default function SideDrawer({ anchor, state, onOpen }) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = React.useState("");
  const [users, setUsers] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchValue) {
      toast.error("Please fill in search");
      return;
    }

    try {
      setLoading(true);
      const users = (await userApi.searchByNameOrEmail({ searchValue })).data;
      setLoading(false);

      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUserItem = async (user) => {
    try {
      const { data } = await chatApi.accessChat({ id: user._id });
      await dispatch(chatActions.fetchAllChatRequest());
      dispatch(chatActions.selectChat(data));
      onOpen()(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer anchor={anchor} open={state} onClose={onOpen(false)}>
      <Box
        role="presentation"
        sx={{ padding: theme.spacing(2), minWidth: "25vw" }}
      >
        <List>
          <Typography variant="h5">Search Users</Typography>
        </List>
        <Divider />

        {/* Search  */}
        <Box sx={{ display: "flex", marginTop: theme.spacing(1) }}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            variant="outlined"
            sx={{ marginRight: theme.spacing(1) }}
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Go
          </Button>
        </Box>

        {/* User list Item*/}
        <Stack spacing={1.5} mt={2}>
          {loading ? (
            <ChatLoading />
          ) : (
            users?.map((user) => (
              <UserListItem
                user={user}
                key={user._id}
                onClick={handleSelectUserItem}
                style={{ paddingY: 1, paddingX: 3 }}
              />
            ))
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}
