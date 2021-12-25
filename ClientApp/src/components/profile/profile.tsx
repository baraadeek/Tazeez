import React, { useCallback, useEffect } from "react";
import TopHeader from "../TopHeader";
import Navbar from "../Navbar";
import PageBanner from "../PageBanner";
import AppointmentFormTwo from "../AppointmentFormTwo";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { getUserAPI } from "./api/user-api";
import image from "./doctor3.jpg";

export default function Profile() {
  const dispatch = useDispatch();
  const id =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;
  const [data, setData] = React.useState({});
  console.log("🚀 ~ file: profile.tsx ~ line 16 ~ Profile ~ data", data);

  const get = useCallback(dispatchGetFunc, []);

  useEffect(
    (_) => {
      get();
    },
    [get]
  );

  async function dispatchGetFunc() {
    dispatch(
      getUserAPI(id.id)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {})
    );
  }
  const name = `Dr. ${data?.firstName} ${data?.lastName}`;
  return (
    <>
      <TopHeader />

      <Navbar />

      <PageBanner
        pageTitle={name || ""}
        homePageUrl="/"
        homePageText="Home"
        activePageText="Doctor Details"
        bgImage="page-title-five"
      />

      <div className="doctor-details-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="doctor-details-item doctor-details-left">
                <img src={image} alt="Doctor" />

                <div className="doctor-details-contact">
                  <h3>Contact info</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-call"></i>
                      Call: +07 554 332 322
                    </li>
                    <li>
                      <i className="icofont-ui-message"></i>
                      hello@disin.com
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      4th Floor, 408 No Chamber
                    </li>
                  </ul>
                </div>

                <div className="doctor-details-work">
                  <h3>Working hours</h3>
                  <div className="appointment-item-two-right">
                    <div className="appointment-item-content">
                      <ul>
                        <li>
                          Monday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Tuesday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Wednesday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Sunday <span>9:00 AM - 8:00 PM</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="doctor-details-item">
                <div className="doctor-details-right">
                  <div className="doctor-details-biography">
                    <h3>{name}</h3>
                    <p>MBBS in Neurology, PHD in Neurosurgeon</p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Biography</h3>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit, sed quia consequuntur magni dolores eos
                      qui ratione voluptatem sequi nesciunt.
                    </p>

                    <p>
                      But I must explain to you how all this mistaken idea of
                      denouncing pleasure and praising pain was born and I will
                      give you a complete account of the system, and expound the
                      actual teachings of the great explorer of the truth, the
                      master-builder of human happiness. No one rejects,
                      dislikes, or avoids pleasure itself, because it is
                      pleasure, but because those who do not know how to pursue
                      pleasure rationally encounter consequences that are
                      extremely painful.
                    </p>

                    <p></p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Education</h3>
                    <ul>
                      <li>
                        PHD Degree in Neurology at University of UCLan School of
                        Medicine Preston (2006)
                      </li>
                      <li>
                        Master of Neurosurgery at University of University of
                        Exeter Medical School Exeter (2002)
                      </li>
                    </ul>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Experience</h3>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas molestias excepturi sint
                      occaecati cupiditate non provident, similique sunt in
                      culpa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-100">
        <AppointmentFormTwo />
      </div>

      <Footer />
    </>
  );
}
