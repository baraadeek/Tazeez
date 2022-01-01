import React from "react";
import { Link } from "react-router-dom";
import AvatarWithText from "./avatar/Avatar";

import { makeStyles } from "@material-ui/core";
import Style from "./style";
import { useHistory } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles(Style);

const TopHeader = () => {
  const history = useHistory();

  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;
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
                          history.push("/login");
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
                      <FacebookIcon
                        fontSize="small"
                        style={{ marginTop: -4 }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/" target="_blank">
                      <TwitterIcon fontSize="small" style={{ marginTop: -4 }} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <LinkedInIcon
                        fontSize="small"
                        style={{ marginTop: -4 }}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      <InstagramIcon
                        fontSize="small"
                        style={{ marginTop: -4 }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
