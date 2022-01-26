import React from "react";
import Link from "next/link";

import Slider1 from "../images/home-one/home-slider1.png";
import Slider2 from "../images/home-one/home-slider2.png";
import Slider3 from "../images/home-one/home-slider3.png";

const options = {
  items: 1,
  loop: true,
  margin: 0,
  nav: true,
  dots: true,
  smartSpeed: 1000,
  autoplay: false,
  autoplayTimeout: 9000,
  autoplayHoverPause: true,
  navText: [
    "<i class='icofont-simple-left'></i>",
    "<i class='icofont-simple-right'></i>",
  ],
};

const HeroSlider = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <>
      <div className="slider-item slider-item-img">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="slider-text">
                <div className="slider-shape-three">
                  <img src={Slider3} alt="Shape" />
                </div>
                <h1>We Offer Highly Treatments</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida.
                </p>

                <div className="common-btn">
                  <Link href="/appointment">
                    <a>Get Appointment</a>
                  </Link>
                  <Link href="/about">
                    <a className="cmn-btn-right">Learn More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
