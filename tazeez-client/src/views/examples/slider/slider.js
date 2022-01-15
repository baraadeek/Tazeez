import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "../../styles/slider-animations.css";
import "../../styles/slider.css";
import image from "./t1.jpg";
import image2 from "./jobsearch.png";
import image1 from "./t11.jpg";

export default function CVSlider() {
  const content = [
    {
      title: "HR Consult",
      description:
        "Through meaningful and objective research into your organization, competitors, and marketplace, we strive to understand your hiring needs and requirements.",
      button: "Read More",
      image: image,
      userProfile: "https://i.imgur.com/JSW6mEk.png",
    },
    {
      title: "Hire Now",
      description:
        "Our team manages expectations, maintains open communications with you and the candidates, and expertly facilitates the negotiation process through to its successful completion.",
      button: "Discover",
      image: image1,
      user: "Erich Behrens",
      userProfile: "https://i.imgur.com/0Clfnu7.png",
    },
    {
      title: "Find New Job",
      description:
        "Documenting a job description is vital to a successful search. Top professionals require more statements and directional points about career opportunities.",
      button: "Buy now",
      image: image2,
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
  ];
  return (
    <div>
      <Slider className="slider-wrapper">
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{
              background: `url('${item.image}') no-repeat center center`,
            }}
          >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

/*

const content = [
    {
        title: "HR Consult",
        description: 'Facilitate the process of sorting and evaluation a massive amount of CVs rather than evaluated it manually',
        button: "Read More",
        image: 'https://w6.foxdsgn.com/hryzantema/wp-content/uploads/2019/09/adult-black-boardroom-1345085.jpg',
        userProfile: "https://i.imgur.com/JSW6mEk.png"
    },
    {
        title: "Hire Now",
        description: 'Extract important information to the recruitment process which describes Cvs better.'
        , button: "Discover",
        image: "https://w6.foxdsgn.com/hryzantema/wp-content/uploads/2019/11/people-3295555_1920-1.jpg",
        user: "Erich Behrens",
        userProfile: "https://i.imgur.com/0Clfnu7.png"
    },
    {
        title: "Find New Job",
        description: 'Documenting a job description is vital to a successful search. Top professionals require more statements and directional points about career opportunities.',
        button: "Buy now",
        image: "https://w6.foxdsgn.com/hryzantema/wp-content/uploads/2019/09/shutterstock_1174611262.jpg",
        user: "Bruno Vizovskyy",
        userProfile: "https://i.imgur.com/4KeKvtH.png"
    }
];



*/
