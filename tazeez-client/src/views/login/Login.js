import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Form, Spinner } from "react-bootstrap";

import { Controller, useForm } from "react-hook-form";

import Alert from "@material-ui/lab/Alert";

// View
import loginImage from "views/examples/images/login-bg.jpg";
import PageBanner from "views/examples/Common/PageBanner";
import AuthNavbar from "components/common-components/Navbars/AuthNavbar";
import Footer from "views/examples/page/Footer";

//i18n
import { namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import translationKeys from "i18n/locales/translationKeys";

// API
import { ThunkDispatch } from "../../thunk-dispatch";
import { loginThunk } from "./api/login-thunk-api";

export default function Login() {
  const history = useHistory();
  const { t } = useTranslation(namespaces.pages.login);

  const [showError, SetShowError] = React.useState(null);
  const { handleSubmit, control, formState } = useForm();

  const onSubmit = (data) => {
    ThunkDispatch(loginThunk(data))
      .then((result) => {
        if (result?.status === 200) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: result.data.token,
            })
          );
          history.push("/admin/index");
        } else {
          SetShowError(result?.message);
        }
      })
      .catch((error) => {
        SetShowError(error?.message);
        console.error("loginThunk", error);
      })
      .finally(() => {});
  };

  return (
    <>
      <AuthNavbar />

      <PageBanner
        pageTitle={t(translationKeys.pages.login.login)}
        homePageUrl="/"
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.pages.login.login)}
        bgImage="page-title-one"
      />
      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="login-left">
                <img src={loginImage} alt="Login" />
              </div>
            </div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>{t("signIn")}</h2>
                  <p>
                    {t("createAccount")} <Link to="/signUp">{t("signUp")}</Link>
                  </p>
                </div>
                <div className="signup-form">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoFocus
                                autoComplete="off"
                                type="email"
                                placeholder={t("enterEmail")}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
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
                                minLength={2}
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
                              t("signIn")
                            )}
                          </button>
                        </div>
                        {showError ? (
                          <Alert severity="error" style={{ marginTop: 8 }}>
                            {`Error : ${showError}`}
                          </Alert>
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
