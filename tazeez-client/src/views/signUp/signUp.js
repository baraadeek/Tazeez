import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import Alert from "@material-ui/lab/Alert";

import { SignUpAPI } from "./api/sign-up-api";

import SignupImage from "views/examples/images/signup-bg.jpg";
import PageBanner from "views/examples/Common/PageBanner";
import AuthNavbar from "components/common-components/Navbars/AuthNavbar";
import Footer from "views/examples/page/Footer";

//i18n
import { namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import translationKeys from "i18n/locales/translationKeys";

export default function SignUp() {
  const { t } = useTranslation(namespaces.pages.login);

  const { handleSubmit, control, formState, errors, reset } = useForm();

  const dispatch = useDispatch();
  const [showError, SetShowError] = React.useState(null);

  const onSubmit = (data) => {
    dispatch(
      SignUpAPI(data)
        .then((response) => {
          if (response?.status !== 200) {
            SetShowError(response?.message);
          } else {
            SetShowError("");
            reset();
          }
        })
        .catch((error) => {
          SetShowError(error?.message);
        })
    );
  };

  return (
    <>
      <AuthNavbar />

      <PageBanner
        pageTitle={t(translationKeys.pages.login.signUp)}
        homePageUrl="/"
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.pages.login.signUp)}
        bgImage="page-title-one"
      />

      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="signup-left">
                <img src={SignupImage} alt="SignUp" />
              </div>
            </div>
            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>{t(translationKeys.pages.login.signUp)}</h2>
                  <p>
                    {t(translationKeys.pages.login.alreadyAccount)}{" "}
                    <Link to="/login">
                      {t(translationKeys.pages.login.login)}
                    </Link>
                  </p>
                </div>

                <div className="signup-form">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            error={!!errors?.firstName}
                            rules={{
                              validate: (val) => val?.trim().length >= 2,
                            }}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoFocus
                                minLength={2}
                                autoComplete="off"
                                placeholder={t(
                                  translationKeys.pages.login.enterFirstName
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="lastName"
                            control={control}
                            minLength={2}
                            defaultValue=""
                            error={!!errors?.lastName}
                            rules={{
                              validate: (val) => val?.trim().length >= 2,
                            }}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoComplete="off"
                                placeholder={t(
                                  translationKeys.pages.login.enterLastName
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoComplete="off"
                                type="email"
                                placeholder={t("enterEmail")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                maxLength={32}
                                minLength={10}
                                autoComplete="off"
                                type="password"
                                placeholder={t("enterPassword")}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            {formState.isSubmitting ? (
                              <Spinner animation="border" variant="light" />
                            ) : (
                              t(translationKeys.pages.login.signUp)
                            )}
                          </button>
                        </div>
                        {showError !== null ? (
                          !showError ? (
                            <Alert severity="success" style={{ marginTop: 8 }}>
                              The account has been added successfully
                            </Alert>
                          ) : (
                            <Alert severity="error" style={{ marginTop: 8 }}>
                              {`Error : ${showError}`}
                            </Alert>
                          )
                        ) : null}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
