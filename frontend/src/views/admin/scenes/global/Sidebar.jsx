import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { user4 } from "../../../../assets/img";
import { useSelector } from "react-redux";
const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} className={`w-100 rounded position-relative`} style={{ background: selected === title ? `${colors.greenAccent[400]}` : "" }}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        {!isCollapsed && <Typography>{title}</Typography>}
      </MenuItem>
    </Link>
  );
};

const Sidebar = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      className="h-vh"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img alt="profile-user" width="100px" height="100px" src={user4} style={{ cursor: "pointer", borderRadius: "50%" }} />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  {user.result.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0"}>
            <Item isCollapsed={isCollapsed} title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography>
            <Item
              isCollapsed={isCollapsed}
              title="Manage User"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Manage Products"
              to="/admin/product"
              icon={<InventoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Contacts Information"
              to="/admin/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Invoices Balances"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Pages
            </Typography>
            <Item
              isCollapsed={isCollapsed}
              title="Add user"
              to="/admin/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Calendar"
              to="/admin/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="FAQ Page"
              to="/admin/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Charts
            </Typography>
            <Item
              isCollapsed={isCollapsed}
              title="Bar Chart"
              to="/admin/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Pie Chart"
              to="/admin/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Line Chart"
              to="/admin/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              isCollapsed={isCollapsed}
              title="Geography Chart"
              to="/admin/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
