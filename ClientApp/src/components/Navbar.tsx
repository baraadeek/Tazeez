import React from "react";
import { Link } from "react-location";

const Navbar = () => {
  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const classOne = menu ? "collapse navbar-collapse" : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <div id="navbar" style={{ position: "relative", zIndex: 2 }}>
      <div className="main-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link to="/">
              <a onClick={toggleNavbar} className="navbar-brand">
                <img src="assets/images/logo.png" alt="logo" />
              </a>
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
                  <Link to="#">
                    <a onClick={(e) => e.preventDefault()} className="nav-link dropdown-toggle">
                      Home
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/">
                        <a onClick={toggleNavbar} className="nav-link">
                          Home Demo - 1
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/index-2">
                        <a onClick={toggleNavbar} className="nav-link">
                          Home Demo - 2
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/index-3">
                        <a onClick={toggleNavbar} className="nav-link">
                          Home Demo - 3
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/index-4">
                        <a onClick={toggleNavbar} className="nav-link">
                          Home Demo - 4
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/index-5">
                        <a onClick={toggleNavbar} className="nav-link">
                          Home Demo - 5
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/about">
                    <a onClick={toggleNavbar} className="nav-link">
                      About
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#">
                    <a onClick={(e) => e.preventDefault()} className="nav-link dropdown-toggle">
                      Pages
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/appointment">
                        <a onClick={toggleNavbar} className="nav-link">
                          Appointment
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/departments">
                        <a onClick={toggleNavbar} className="nav-link">
                          Departments
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/testimonials">
                        <a onClick={toggleNavbar} className="nav-link">
                          Testimonials
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/sign-up">
                        <a onClick={toggleNavbar} className="nav-link">
                          Sign Up
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/sign-in">
                        <a onClick={toggleNavbar} className="nav-link">
                          Sign In
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/faq">
                        <a onClick={toggleNavbar} className="nav-link">
                          FAQ's
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/404">
                        <a onClick={toggleNavbar} className="nav-link">
                          404 Error Page
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/coming-soon">
                        <a onClick={toggleNavbar} className="nav-link">
                          Coming Soon
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/privacy-policy">
                        <a onClick={toggleNavbar} className="nav-link">
                          Privacy Policy
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/terms-condition">
                        <a onClick={toggleNavbar} className="nav-link">
                          Terms & Conditions
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="#">
                    <a onClick={(e) => e.preventDefault()} className="nav-link dropdown-toggle">
                      Services
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/services">
                        <a onClick={toggleNavbar} className="nav-link">
                          Services
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/service-details">
                        <a onClick={toggleNavbar} className="nav-link">
                          Service Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="#">
                    <a onClick={(e) => e.preventDefault()} className="nav-link dropdown-toggle">
                      Doctors
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/doctors">
                        <a onClick={toggleNavbar} className="nav-link">
                          Doctors
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/doctor-details">
                        <a onClick={toggleNavbar} className="nav-link">
                          Doctor Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="#">
                    <a onClick={(e) => e.preventDefault()} className="nav-link dropdown-toggle">
                      Blog
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to="/blog">
                        <a onClick={toggleNavbar} className="nav-link">
                          Blog
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/blog-details">
                        <a onClick={toggleNavbar} className="nav-link">
                          Blog Details
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/contact">
                    <a onClick={toggleNavbar} className="nav-link">
                      Contact
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="nav-srh">
              <form>
                <input type="text" className="form-control" id="search" placeholder="Search..." />

                <button className="search-icon icon-search">
                  <i className="icofont-search-1"></i>
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
