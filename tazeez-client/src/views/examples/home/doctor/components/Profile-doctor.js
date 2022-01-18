import React, { useCallback, useEffect } from "react";
import { getUserThunk } from "views/doctor/api/doctor-thunk-api";
import { ThunkDispatch } from "thunk-dispatch";
import PageBanner from "views/examples/Common/PageBanner";
import { useParams } from "react-router-dom";
import Profile from "./profile.png";

export default function ProfileDoctor() {
  const [data, setData] = React.useState({});
  let { id } = useParams();

  const getQuestionList = useCallback(dispatchGetQuestionListFunc, []);

  useEffect(
    (_) => {
      getQuestionList();
    },
    [getQuestionList]
  );

  async function dispatchGetQuestionListFunc() {
    ThunkDispatch(getUserThunk(id))
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.error("getUserThunk", error))
      .finally(() => {});
  }
  const name = `Dr. ${data.user?.firstName} ${data?.lastName}`;

  return (
    <>
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
                <img
                  src={data.user?.image || Profile}
                  alt="Doctor"
                  width="350px"
                  height="350px"
                />

                <div
                  className="doctor-details-contact"
                  style={{ paddingBottom: 16 }}
                >
                  <h3>Contact info</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-call"></i>
                      Call: +07 554 332 322
                    </li>
                    <li>
                      <i className="icofont-ui-message"></i>
                      Email: hello@disin.com
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      City: 4th Floor, 408 No Chamber
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="doctor-details-item">
                <div className="doctor-details-right">
                  <div className="doctor-details-biography">
                    <h3>{name}</h3>
                    <p>specialist</p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Description</h3>

                    <p>
                      <div
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
