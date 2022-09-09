import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Skeleton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { getSender } from "../../config/chatLogic";
import { authActions } from "../../features/auth/authSlice";
import { chatActions } from "../../features/chats/chatSlice";
import { getCookie } from "../../utils/cookie";
import ProfileModal from "../miscellaneous/ProfileModal";
import SwipeableEdgeDrawer from "../miscellaneous/SideDrawer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointeres: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ notifications, setNotifications }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [stateSideDrawer, setStateSideDrawer] = React.useState(false);
  const { userLogged } = useSelector((state) => state.auth);
  const theme = useTheme();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const isMenuOpen = Boolean(anchorEl);

  const isNotificationOnpen = Boolean(notificationAnchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    dispatch(authActions.fetchUserByIdRequest(getCookie("access_token")));
  }, [dispatch]);

  // Open sideDrawer
  const openDrawer = (state) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setStateSideDrawer(state);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    dispatch(authActions.logoutRequest());
  };

  const handleNofificationOpen = (e) => {
    setNotificationAnchorEl(e.currentTarget);
  };

  const handleSelectChat = (chat) => {
    dispatch(chatActions.selectChat(chat));
    const newNotifications = notifications.filter(
      (notifi) => notifi.chat._id !== chat._id
    );
    setNotificationAnchorEl(false);
    setNotifications(newNotifications);
  };

  const menuId = "primary-search-account-menu";

  // Menu profile
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onBlur={() => setAnchorEl(false)}
    >
      <ProfileModal user={userLogged}>
        <MenuItem>Profile</MenuItem>
      </ProfileModal>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderNotfication = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationOnpen}
      onBlur={() => setNotificationAnchorEl(false)}
    >
      {notifications.length > 0 ? (
        notifications.map((notifi) => (
          <MenuItem
            key={notifi._id}
            onClick={() => handleSelectChat(notifi.chat)}
          >
            <Typography variant="span"></Typography>
            {notifi.chat.isGroupChat
              ? `New message from ${notifi.chat.chatName}`
              : `New message from ${getSender(userLogged, notifi.chat.users)}`}
          </MenuItem>
        ))
      ) : (
        <Typography sx={{ padding: theme.spacing(2) }} variant="span">
          No message
        </Typography>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {isLoading ? (
            <Avatar alt={userLogged.name} src={userLogged.pic} />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Chat-App
          </Typography>
          <Search onClick={openDrawer(true)} onChange={openDrawer(true)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value=""
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNofificationOpen}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar alt={userLogged.name} src={userLogged.pic} />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotfication}

      {/* sideDrawer */}
      <SwipeableEdgeDrawer
        anchor="left"
        state={stateSideDrawer}
        onOpen={openDrawer}
      />

      {/* Profile Modal  */}
    </Box>
  );
}
