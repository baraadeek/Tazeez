import { useState, useEffect } from "react";

// react-router components
import { useHistory, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDTypography from "components/core-components/MDTypography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";

// Material Dashboard 2 React components
import MDBox from "components/core-components/MDBox";
import MDInput from "components/core-components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { makeStyles } from "@material-ui/core";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

import adminNavbarLinksStyle from "./adminNavbarLinksStyle";
import { useSelector } from "react-redux";
import UserAvatar from "components/core-components/user-avatar/UserAvatar";
import classNames from "classnames";
import { useIsRtl } from "common/hooks/appHooks";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";

const useStyle = makeStyles(adminNavbarLinksStyle);

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const classes = useStyle();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const isRtl = useIsRtl();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);



  const onLogout = () =>{
    
  }

  const renderMenu = () => {
    const horizontal = isRtl ? "left" : "right";
    return (
      <Popover
        classes={{ paper: classes.color }}
        onDismiss={() => {
          setAnchorEl(null);
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: horizontal,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: horizontal,
        }}
      >
        <MenuList role="menu" className={classes.paddingMenuList}>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            className={classes.paddingGrid}
          >
            <Grid item marginRight={12}>
              <UserAvatar
                showName
                users={[user]}
                showFullName
                size="xl"
                typographyType={"h1"}
              />
            </Grid>
            <Grid item>
              <MDTypography className={classes.typographyFont} heading={3}>
                {`${user?.firstName} ${user?.lastName}`}
              </MDTypography>
            </Grid>
          </Grid>
          <Divider className={classes.styleDivider} />

          <Divider className={classes.styleDivider} />
          <MenuItem
            onClick={() => {
              history.push(ROUTES_PATH_ENUM.Profile);
              setAnchorEl(null);
            }}
            className={dropdownItem}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>

          <Divider className={classes.styleDivider} />
          <MenuItem onClick={onLogout} className={dropdownItem}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </MenuList>
      </Popover>
    );
  };

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                onClick={(e) => {
                  setAnchorEl(e);
                }}
              >
                <UserAvatar
                  showName
                  users={[user]}
                  showFullName
                  size="lg"
                  typographyType={"h1"}
                />
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={() => {}}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
