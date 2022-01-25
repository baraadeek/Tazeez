import React from "react";

import TopHeader from "views/examples/TopHeader";
import Navbar from "views/examples/page/Navbar";

import { Form, Spinner } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";

import { loginAPI } from "./api/login-api";
import PageBanner from "../Common/PageBanner";
import Footer from "../page/Footer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import loginImage from "views/examples/images/login-bg.jpg";
import { useSelector } from "react-redux";
import { PAGE_DIRECTION } from "core-components/page-direction/enum/enum";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const pageDirection = useSelector(
    (state) => state.pageDirection.pageDirection
  );

  let isAR = pageDirection === PAGE_DIRECTION.ar.key;

  const [showError, SetShowError] = React.useState(null);
  const { handleSubmit, control, formState } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      loginAPI(data)
        .then((response) => {
          if (response?.status === 200) {
            localStorage.setItem(
              "login",
              JSON.stringify({
                store: response.data.token,
                response: response.data,
              })
            );
            history.push("/admin/index");
          } else {
            SetShowError(response?.message);
          }
        })
        .catch((error) => {
          SetShowError(error?.message);
        })
    ).catch((error) => {
      SetShowError(error?.message);
    });
  };

  return (
    <>
      <PageBanner
        pageTitle={isAR ? "تسجيل الدخول" : "Sign In"}
        homePageUrl="/"
        homePageText={isAR ? "الصفحة الرئيسية" : "Home"}
        activePageText={isAR ? "تسجيل الدخول" : "Sign In"}
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
                  <h2>{isAR ? "تسجيل الدخول هنا" : "Login Here"}</h2>
                  <p>
                    {isAR ? "ألم تقم بحسابك بعد؟" : " Didn't you account yet?"}{" "}
                    <Link to="/auth/register">
                      {isAR ? "سجل هنا" : "Sign Up Here"}
                    </Link>
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
                                placeholder={
                                  isAR
                                    ? "أدخل البريد الإلكتروني"
                                    : "Enter email"
                                }
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
                                placeholder={
                                  isAR ? "أدخل الرقم السري " : "Enter Password"
                                }
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
                            ) : isAR ? (
                              "تسجيل الدخول "
                            ) : (
                              "Login"
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
    </>
  );
}
