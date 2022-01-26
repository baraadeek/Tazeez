import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../css/style.css";
import "../css/responsive.css";
import "../css/rtl.css";

import "../css/animate.css";

import Logo from "../images/logo.png";
import AvatarWithText from "../avatar/Avatar";
const Navbar = () => {
  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;

  const history = useHistory();

  return (
    <div id="navbar" className="navbar-area sticky-top">
      <div className="main-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link
              href="/auth/home"
              onClick={toggleNavbar}
              className="navbar-brand"
            >
              <img src={Logo} alt="logo" />
            </Link>

            <button
              onClick={toggleNavbar}
              className={classTwo}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/auth/home" activeClassName="active">
                    <a className="nav-link ">Home</a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/about" activeClassName="active">
                    <a onClick={toggleNavbar} className="nav-link">
                      About
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Pages
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/appointment" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Appointment
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/departments" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Departments
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/testimonials" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Testimonials
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/sign-up" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Sign Up
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/sign-in" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Sign In
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/faq" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          FAQ's
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/404" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          404 Error Page
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/coming-soon" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Coming Soon
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/privacy-policy" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Privacy Policy
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/terms-condition" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Terms & Conditions
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Services
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/services" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Services
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/service-details" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Service Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Doctors
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/doctors" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Doctors
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/doctor-details" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Doctor Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Blog
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/blog" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Blog
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/blog-details" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          Blog Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="/contact" activeClassName="active">
                    <a onClick={toggleNavbar} className="nav-link">
                      Contact
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
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
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
