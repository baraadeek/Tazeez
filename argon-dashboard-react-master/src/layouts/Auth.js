/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import TopHeader from "views/examples/TopHeader";
import Navbar from "views/examples/page/Navbar";
import Footer from "views/examples/page/Footer";
import NewsletterForm from "views/examples/Common/NewsletterForm";
import LatestBlogPost from "views/examples/Common/LatestBlogPost";
import OurDoctors from "views/examples/Common/OurDoctors";
import VideoIntro from "views/examples/Common/VideoIntro";
import HeroSlider from "views/examples/HomeOne/HeroSlider";
import Stats from "views/examples/HomeOne/Stats";
import AboutSection from "views/examples/HomeOne/AboutSection";
import Services from "views/examples/HomeOne/Services";
import OurExpertise from "views/examples/HomeOne/OurExpertise";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <AuthNavbar />

      <HeroSlider />

      <Stats />

      <AboutSection />

      <Services />

      <OurExpertise />

      <OurDoctors />

      <LatestBlogPost />

      <NewsletterForm />

      <Footer />
      <div ref={mainContent}>
        <Switch>{getRoutes(routes)}</Switch>
      </div>
    </>
  );
};

export default Auth;
