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
import { useLocation} from "react-router-dom";
// reactstrap components
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import NewsletterForm from "views/examples/Common/NewsletterForm";
import LatestBlogPost from "views/examples/Common/LatestBlogPost";
import OurDoctors from "views/examples/Common/OurDoctors";
import HeroSlider from "views/examples/HomeOne/HeroSlider";
import Stats from "views/examples/HomeOne/Stats";
import AboutSection from "views/examples/HomeOne/AboutSection";
import Services from "views/examples/HomeOne/Services";
import OurExpertise from "views/examples/HomeOne/OurExpertise";

const Auth = (props) => {
  return (
    <>
      <HeroSlider />

      <Stats />

      <AboutSection />

      <Services />

      <OurExpertise />

      <OurDoctors />

      <LatestBlogPost />

      <NewsletterForm />
    </>
  );
};

export default Auth;
