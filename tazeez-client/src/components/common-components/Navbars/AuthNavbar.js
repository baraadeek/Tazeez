import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import AvatarWithText from "views/examples/avatar/Avatar";

import Logo from "views/examples/images/logo.png";
import Reorder from "@material-ui/icons/Reorder";
// import { setPageDirection } from "core-components/page-direction/slice/page-direction";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import { languages, namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import translationKeys from "i18n/locales/translationKeys";
import i18n from "i18n/i18n";
import { setDirection } from "context";
import { useDispatch } from "react-redux";

// import {
//   PAGE_DIRECTION,
//   disabledOnly,
// } fromp "core-components/page-direction/enum/enum";

const AuthNavbar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(namespaces.pages.authNavbar);

  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;

  let isAR = false;

  const history = useHistory();

  // const containerPropsIsAR = isAR ? { style: { ...disabledOnly } } : {};
  const containerPropsIsAR = {};
  // const containerPropsIsEN = !isAR ? { style: { ...disabledOnly } } : {};
  const containerPropsIsEN = {};
  const navLinkProps = isAR ? { style: { textAlign: "right" } } : {};

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img src={Logo} alt="logo" />
          </NavbarBrand>
          <button
            className="navbar-toggler"
            id="navbar-collapse-main"
            style={{ color: "#0046c0" }}
          >
            <Reorder />
          </button>

          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/" className="navbar-brand">
                    <img src={Logo} alt="logo" />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <Col>
                <div className="header-top-item">
                  <div className="header-top-right" style={{ marginTop: 16 }}>
                    <ul className="lang-list">
                      <li>
                        <Link
                          {...containerPropsIsAR}
                          to=""
                          onClick={(e) => {
                            i18n.changeLanguage(languages.ar);
                            setDirection(dispatch, "rtl");
                          }}
                        >
                          AR
                        </Link>
                      </li>
                      <li>
                        <Link
                          {...containerPropsIsEN}
                          to=""
                          onClick={(e) => {
                            i18n.changeLanguage(languages.en);
                            setDirection(dispatch, "ltr");

                          }}
                        >
                          EN
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.homePage)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/register"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.about)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to={ROUTES_PATH_ENUM.Login}
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.services)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.doctors)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.blog)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {t(translationKeys.pages.authNavbar.contact)}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                {data?.firstName ? (
                  <AvatarWithText
                    user={{
                      name: `${data?.firstName} ${data?.lastName}`,
                    }}
                    onClick={() => {
                      history.push("/admin/index");
                      window.location.reload();
                    }}
                  />
                ) : (
                  <NavLink
                    {...navLinkProps}
                    className="nav-link-icon"
                    to={ROUTES_PATH_ENUM.Login}
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">
                      {t(translationKeys.pages.authNavbar.login)}
                    </span>
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
