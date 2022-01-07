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

import Logo from "../../views/examples/images/logo.png";
import Reorder from "@material-ui/icons/Reorder";
import LoginIcon from "@material-ui/icons/RotateRight";
import { useDispatch } from "react-redux";
import { setPageDirection } from "core-components/page-direction/slice/page-direction";
import { useSelector } from "react-redux";
import {
  PAGE_DIRECTION,
  disabledOnly,
} from "core-components/page-direction/enum/enum";

const AuthNavbar = () => {
  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;

  const pageDirection = useSelector(
    (state) => state.pageDirection.pageDirection
  );

  let isAR = pageDirection === PAGE_DIRECTION.ar.key;

  const dispatch = useDispatch();

  function onPageDirection(language) {
    dispatch(setPageDirection(language));
  }

  const history = useHistory();

  const containerPropsIsAR = isAR ? { style: { ...disabledOnly } } : {};
  const containerPropsIsEN = !isAR ? { style: { ...disabledOnly } } : {};
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
                            onPageDirection("ar"); // rtl
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
                            onPageDirection("en"); // rtl
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
                    {isAR ? "الصفحة الرئيسية" : "Home"}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {isAR ? "حول" : "About"}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/login"
                  tag={Link}
                  {...navLinkProps}
                >
                  <span className="nav-link-inner--text">
                    {isAR ? "الخدمات" : "Services"}
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
                    {isAR ? "الدكاترة" : "Doctors"}
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
                    {isAR ? "مدونة" : "Blog"}
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
                    {isAR ? "التواصل" : "Contact"}
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
                    to="/auth/login"
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">
                      {isAR ? "تسجيل الدخول" : "Login"}
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
