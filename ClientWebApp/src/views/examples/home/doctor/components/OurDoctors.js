import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Profile from "./profile.png";
import { ThunkDispatch } from "thunk-dispatch";
import { getDoctorListThunk } from "views/doctor/api/doctor-thunk-api";
import { useSelector } from "react-redux";
import { doctorSelectors } from "views/doctor/selectors/doctor-selectors";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";

const OurDoctors = () => {
  const doctorList = useSelector(doctorSelectors);
  console.log(
    "🚀 ~ file: OurDoctors.js ~ line 13 ~ OurDoctors ~ doctorList",
    doctorList
  );

  const getQuestionList = useCallback(dispatchGetQuestionListFunc, []);

  useEffect(
    (_) => {
      getQuestionList();
    },
    [getQuestionList]
  );

  async function dispatchGetQuestionListFunc() {
    ThunkDispatch(getDoctorListThunk())
      .then((result) => {})
      .catch((error) => console.error("getDoctorListThunk", error))
      .finally(() => {});
  }

  return (
    <div className="doctors-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>Meet Our Doctors</h2>
        </div>

        <div className="row justify-content-center">
          {doctorList?.map((doctor) => {
            return (
              <div className="col-sm-6 col-lg-4">
                <div className="doctor-item">
                  <div className="doctor-top">
                    <img
                      src={doctor?.user?.image || Profile}
                      alt="Doctor"
                      width="350px"
                      height="350px"
                    />
                    <Link to="/appointment">Get Appointment</Link>
                  </div>
                  <div className="doctor-bottom">
                    <h3>
                      <Link
                        to={ROUTES_PATH_ENUM.Doctor.replace(":id", doctor?.id)}
                      >
                        {`Dr. ${doctor?.user?.fullName}`}
                      </Link>
                    </h3>
                    <span>{doctor?.specialist}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="doctor-btn">
          <Link to="/doctors-details">See All</Link>
        </div>
      </div>
    </div>
  );
};

export default OurDoctors;
