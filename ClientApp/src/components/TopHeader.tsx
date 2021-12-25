import React from "react";
import { Link } from "react-location";
import AvatarWithText from "./avatar/Avatar";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core";
import Style from "./style";
import classNames from "classnames";
import history from "../history";

const useStyles = makeStyles(Style);

const TopHeader = () => {
  const [anchorProfile, setanchorProfile] = React.useState(false);
  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;
  console.log("🚀 ~ file: TopHeader.tsx ~ line 8 ~ TopHeader ~ data", data);
  const classes = useStyles();

  return (
    <div className="header-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-8 col-lg-8">
            <div className="header-top-item">
              <div className="header-top-left">
                <ul>
                  <li>
                    <a href="tel:+07554332322">
                      <i className="icofont-ui-call"></i>
                      Call : +07 554 332 322
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@disin.com">
                      <i className="icofont-ui-message"></i>
                      hello@disin.com
                    </a>
                  </li>
                  <li>
                    <i className="icofont-location-pin"></i>
                    210-27 Quadra, Canada
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-4 col-lg-4">
            <div className="header-top-item">
              <div className="header-top-right">
                <ul className="lang-list">
                  <li>
                    {data?.firstName ? (
                      <AvatarWithText
                        user={{
                          name: `${data?.firstName} ${data?.lastName}`,
                        }}
                        onClick={() => {
                          history.push("/profile");
                          window.location.reload();
                        }}
                      />
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </li>
                  <li>
                    {data?.firstName ? (
                      <a
                        onClick={() => {
                          localStorage.removeItem("login");
                          window.location.replace("/");
                        }}
                      >
                        Log out
                      </a>
                    ) : null}
                  </li>
                  <li>
                    <a href="/">EN</a>
                  </li>
                  <li>
                    <a href="/ar">AR</a>
                  </li>
                </ul>

                <ul>
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="icofont-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/" target="_blank">
                      <i className="icofont-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="icofont-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="icofont-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popper
        open={!!anchorProfile}
        anchorEl={anchorProfile}
        transition
        disablePortal
        placement="bottom"
        className={classNames({
          [classes.popperClose]: !anchorProfile,
          [classes.popperResponsive]: true,
          [classes.popperNav]: true,
        })}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            id="profile-menu-list"
            style={{ transformOrigin: "0 0 0" }}
          >
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={() => {}}>
                <MenuList role="menu">
                  <NavLink to="/admin/profile">
                    <MenuItem className={dropdownItem} onClick={() => {}}>
                      {"Profile"}
                    </MenuItem>
                  </NavLink>

                  <Divider light />
                  <MenuItem onClick={() => {}} className={dropdownItem}>
                    {"Log out"}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default TopHeader;
