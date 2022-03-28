import React, { useCallback, useEffect } from "react";

import PageBanner from "views/examples/Common/PageBanner";
import { ThunkDispatch } from "thunk-dispatch";
import { Link } from "react-router-dom";

//i18n
import { namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import translationKeys from "i18n/locales/translationKeys";
import { useSelector } from "react-redux";
import { doctorSelectors } from "views/doctor/selectors/doctor-selectors";
import { getDoctorListThunk } from "views/doctor/api/doctor-thunk-api";
import Profile from "./profile.png";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";

export default function DoctorsList() {
  const { t } = useTranslation([
    namespaces.pages.login,
    namespaces.routes.authRoutes,
  ]);

  const doctorList = useSelector(doctorSelectors);
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
    <>
      <PageBanner
        pageTitle={t(translationKeys.authRoutes.doctors, {
          ns: namespaces.routes.authRoutes,
        })}
        homePageUrl={ROUTES_PATH_ENUM.Home}
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.authRoutes.doctors, {
          ns: namespaces.routes.authRoutes,
        })}
        bgImage="page-title-one"
      />
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
                    </div>
                    <div className="doctor-bottom">
                      <h3>
                        <Link
                          to={ROUTES_PATH_ENUM.Doctor.replace(
                            ":id",
                            doctor?.id
                          )}
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
        </div>
      </div>
    </>
  );
}
