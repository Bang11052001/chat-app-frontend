import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useSelector } from "react-redux";
import CreateUpdateGroupModal from "../../../components/miscellaneous/GroupModal";

export default function MenuOptions({ children, onLeaveGroup, onSubmit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { selectedChat } = useSelector((state) => state.chat);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span onClick={handleClick}>{children}</span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
        onBlur={() => setAnchorEl(false)}
      >
        <CreateUpdateGroupModal chat={selectedChat} onSubmit={onSubmit}>
          <MenuItem>Edit Group</MenuItem>
        </CreateUpdateGroupModal>
        <MenuItem onClick={onLeaveGroup} sx={{ color: "red" }}>
          Leave Group
        </MenuItem>
      </Menu>
    </>
  );
}
