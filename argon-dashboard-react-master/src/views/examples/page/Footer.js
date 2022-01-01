import React from "react";
import Link from "next/link";
import Contact from "../contact/contact";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="footer-item">
                <div className="footer-contact">
                  <h3>Contact Us</h3>
                  <ul>
                    <li>
                      <a href="mailto:info@disin.com">
                        <EmailIcon /> info@disin.com
                      </a>
                    </li>
                    <li>
                      <i className="icofont-stock-mobile"></i>
                      <a href="tel:+07554332322">
                        <PhoneIcon /> +07 554 332 322
                      </a>
                    </li>
                    <li>
                      <LocationOnIcon />
                      Palestine, Nablus
                    </li>
                  </ul>
                  <div
                    style={{
                      display: "block",
                      color: "#ffffff",
                    }}
                  >
                    <a href="https://www.facebook.com/" target="_blank">
                      <FacebookIcon
                        fontSize="small"
                        style={{
                          color: "#fff",
                          marginLeft: " 60px",
                          marginRight: "8px",
                          marginTop: "30px",
                        }}
                      />
                    </a>

                    <a href="https://twitter.com/" target="_blank">
                      <TwitterIcon
                        fontSize="small"
                        style={{
                          color: "#fff",
                          marginRight: "8px",
                          marginTop: "30px",
                        }}
                      />
                    </a>

                    <a href="https://www.linkedin.com/" target="_blank">
                      <LinkedInIcon
                        fontSize="small"
                        style={{
                          color: "#fff",
                          marginRight: "8px",
                          marginTop: "30px",
                        }}
                      />
                    </a>

                    <a href="https://www.instagram.com/" target="_blank">
                      <InstagramIcon
                        fontSize="small"
                        style={{
                          color: "#fff",
                          marginRight: "8px",
                          marginTop: "30px",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <Link href="/about">
                        <a>About us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <a>Blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        <a>Our Expertise</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <a>Faq</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/doctor">
                        <a>Doctors</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a>Contact us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>Our Services</h3>
                  <ul>
                    <li>
                      <Link href="/service-details">
                        <a>Dental Care</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Cardiology</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Hijama Therapy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Massage Therapy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Ambluance Sevices</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Medicine</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Contact />
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-item">
            <p>
              Copyright &copy; {currentYear} Design & Developed by{" "}
              <a href="https://hibootstrap.com/" target="_blank">
                HiBootstrap
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
