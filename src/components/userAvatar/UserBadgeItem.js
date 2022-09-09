import { Badge, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

const UserBadgeItem = ({ user, onClick }) => {
  const { userLogged } = useSelector((state) => state.auth);
  const theme = useTheme();
  return (
    <Badge
      onClick={() => onClick(user)}
      variant="standard"
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        cursor: "pointer",
        color: "white",
        marginRight: theme.spacing(1),
        minWidth: "50px",
        marginTop: theme.spacing(0.5),
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>
          {userLogged._id === user._id ? user.name + " (bạn)" : user.name}
        </Typography>
        <CloseIcon fontSize="small" sx={{ marginLeft: "2px" }} />
      </Box>
    </Badge>
  );
};

export default UserBadgeItem;
