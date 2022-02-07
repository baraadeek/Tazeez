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
import { languages, namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import i18n from "i18n/i18n";
import { setDirection } from "context";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";

// import {
//   PAGE_DIRECTION,
//   disabledOnly,
// } fromp "core-components/page-direction/enum/enum";

const AuthNavbar = (props) => {
  const { routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation([
    namespaces.pages.login,
    namespaces.pages.authNavbar,
  ]);
  const user = useSelector((state) => state.auth.user);

  let isAR = false;

  const history = useHistory();

  // const containerPropsIsAR = isAR ? { style: { ...disabledOnly } } : {};
  const containerPropsIsAR = {};
  // const containerPropsIsEN = !isAR ? { style: { ...disabledOnly } } : {};
  const containerPropsIsEN = {};
  const navLinkProps = isAR ? { style: { textAlign: "right" } } : {};

  function renderRoutes() {
    return (
      <>
        <div style={{ overflow:'visible', display:"contents"}}>
          {routes.map((route) => (
            <NavItem key={route.id}>
              <NavLink
                className="nav-link-icon"
                to={route.path}
                tag={Link}
                {...navLinkProps}
              >
                <span className="nav-link-inner--text">
                  {t(route.translationKey, { ns: route.ns })}
                </span>
              </NavLink>
            </NavItem>
          ))}
        </div>
        <NavItem>
          {user && (
            <AvatarWithText
              user={{
                name: `${user?.firstName} ${user?.lastName}`,
              }}
              onClick={() => {
                history.push(ROUTES_PATH_ENUM.Profile);
                window.location.reload();
              }}
            />
          )}
        </NavItem>
      </>
    );
  }

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to={ROUTES_PATH_ENUM.Home} tag={Link}>
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
                  <Link to={ROUTES_PATH_ENUM.Home} className="navbar-brand">
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
              {renderRoutes()}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
